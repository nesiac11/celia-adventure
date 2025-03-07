function loadContent(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(text => {
            document.getElementById('content').innerHTML = marked.parse(text);
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Could not load content.</p>';
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chapter = urlParams.get('chapter') || "content/homepage.md"; // Default to homepage
    loadContent(chapter);
});
