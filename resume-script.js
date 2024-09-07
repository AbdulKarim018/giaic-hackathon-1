"use strict";
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    if (!content)
        return;
    content.style.display =
        content.style.display === "none" || content.style.display === ""
            ? "block"
            : "none";
}
