export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type");

  // Only process HTML files
  if (contentType && contentType.includes("text/html")) {
    
    // Fetch your master header and footer
    const header = await context.env.ASSETS.fetch(new URL("/header.html", context.request.url));
    const footer = await context.env.ASSETS.fetch(new URL("/footer.html", context.request.url));
    
    const headerHtml = await header.text();
    const footerHtml = await footer.text();

    return new HTMLRewriter()
      .on("nav", {
        element(el) {
          el.replace(headerHtml, { html: true });
        },
      })
      .on("footer", {
        element(el) {
          el.replace(footerHtml, { html: true });
        },
      })
      .transform(response);
  }

  return response;
}
