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

    const navButtons = document.querySelector(".navigation");
    
    // Hide navigation buttons if on homepage
    if (chapter === "content/homepage.md") {
        navButtons.style.display = "none";
    } else {
        navButtons.style.display = "flex";
    }

    // Add event listeners to navigation buttons
    document.getElementById("prevChapter").addEventListener("click", (e) => {
        e.preventDefault();
        navigateChapter("prev");
    });

    document.getElementById("nextChapter").addEventListener("click", (e) => {
        e.preventDefault();
        navigateChapter("next");
    });

    document.getElementById("chapterIndex").addEventListener("click", (e) => {
        e.preventDefault();
        navigateChapter("index");
    });

    // Disable buttons when necessary
    const currentIndex = chapters.indexOf(chapter);

    if (currentIndex === 0) {
        document.getElementById("prevChapter").style.pointerEvents = "none";
        document.getElementById("prevChapter").style.opacity = "0.5";
    }
    if (currentIndex === chapters.length - 1) {
        document.getElementById("nextChapter").style.pointerEvents = "none";
        document.getElementById("nextChapter").style.opacity = "0.5";
    }
});

const chapters = [
    "chapters/chapter-1.md",
    "chapters/chapter-2.md",
    "chapters/chapter-3.md",
    "chapters/chapter-4.md",
    "chapters/chapter-5.md"
];

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
        window.location.href = "index.html?chapter=content/homepage.md";
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
