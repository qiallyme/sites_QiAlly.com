async function loadComponent(id, file) {
    const response = await fetch(file);
    const text = await response.text();
    document.getElementById(id).innerHTML = text;
}
// Call this on every page
loadComponent('nav-placeholder', '/header.html');
loadComponent('footer-placeholder', '/footer.html');
