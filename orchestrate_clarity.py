import os
import re

# --- CONFIGURATION ---
DRY_RUN = False  # Set to False when you are ready to apply changes
EXCLUDE_FILES = ["header.html", "footer.html"]  # Fail-safe: Skip these source files
EMPTY_NAV = "<nav></nav>"
EMPTY_FOOTER = "<footer></footer>"


def orchestrate_clarity():
    # Regex patterns to find <nav> and <footer> tags and everything inside them
    nav_pattern = re.compile(r"<nav.*?>.*?</nav>", re.DOTALL)
    footer_pattern = re.compile(r"<footer.*?>.*?</footer>", re.DOTALL)

    print(
        f"--- {'DRY RUN ACTIVE: No files will be changed' if DRY_RUN else 'LIVE MODE: Modifying files'} ---"
    )

    for root, dirs, files in os.walk("."):
        for file in files:
            # Only target HTML files and respect the exclusion list
            if file.endswith(".html") and file not in EXCLUDE_FILES:
                file_path = os.path.join(root, file)

                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # Check if tags exist before trying to replace
                if "<nav" in content or "<footer" in content:
                    new_content = re.sub(nav_pattern, EMPTY_NAV, content)
                    new_content = re.sub(footer_pattern, EMPTY_FOOTER, new_content)

                    if not DRY_RUN:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"✅ Success: {file_path} simplified.")
                    else:
                        print(f"👀 Potential change: {file_path} found with tags.")


if __name__ == "__main__":
    orchestrate_clarity()
