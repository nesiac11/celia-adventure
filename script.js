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

const chapters = [
    "chapters/chapter-1.md",
    "chapters/chapter-2.md",
    "chapters/chapter-3.md",
    "chapters/chapter-4.md",
    "chapters/chapter-5.md"

]; // Add all your chapters here

function getCurrentChapter() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("chapter");
}

function navigateChapter(direction) {
    const currentChapter = getCurrentChapter();
    const currentIndex = chapters.indexOf(currentChapter);

    if (direction === "next" && currentIndex < chapters.length - 1) {
        window.location.href = `index.html?chapter=${chapters[currentIndex + 1]}`;
    } else if (direction === "prev" && currentIndex > 0) {
        window.location.href = `index.html?chapter=${chapters[currentIndex - 1]}`;
    } else if (direction === "index") {
        window.location.href = "index.html?chapter=homepage.md";
    }
    
}

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    if (touchStartX - touchEndX > swipeThreshold) {
        navigateChapter("next"); // Swipe left → Next Chapter
    } else if (touchEndX - touchStartX > swipeThreshold) {
        navigateChapter("prev"); // Swipe right → Previous Chapter
    }
}


// Run when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const currentChapter = getCurrentChapter();
    const navigationMenu = document.getElementById("chapterNavigation");

    if (currentChapter && navigationMenu) {
        navigationMenu.style.display = "flex"; // Show navigation
        const currentIndex = chapters.indexOf(currentChapter);

        if (currentIndex === 0) {
            document.getElementById("prevChapter").disabled = true;
        }
        if (currentIndex === chapters.length - 1) {
            document.getElementById("nextChapter").disabled = true;
        }
    }
});
