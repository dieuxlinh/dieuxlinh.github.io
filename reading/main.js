// References to DOM Elements for all books
const books = [
    {
        book: document.querySelector("#book1"),
        papers: [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ],
        currentLocation: 1,
        maxLocation: 3
    },
    {
        book: document.querySelector("#book2"),
        papers: [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ],
        currentLocation: 1,
        maxLocation: 3
    },
    {
        book: document.querySelector("#book3"),
        papers: [
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div'),
        ],
        currentLocation: 1,
        maxLocation: 3
    }
];

// Initialize each book's flipping functionality
books.forEach(bookObj => {
    $(bookObj.book.querySelector('.flipbook')).turn();

    // Add click event to the book for flipping
    bookObj.book.addEventListener("click", () => {
        if (bookObj.currentLocation < bookObj.maxLocation) {
            goNextPage(bookObj);
        } else {
            closeBook(bookObj, false);
        }
    });
});

// Business Logic
function openBook(bookObj) {
    bookObj.book.style.transform = "translateX(50%)";
}

function closeBook(bookObj, isAtBeginning) {
    bookObj.book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
}

function goNextPage(bookObj) {
    if (bookObj.currentLocation < bookObj.maxLocation) {
        switch (bookObj.currentLocation) {
            case 1:
                openBook(bookObj);
                bookObj.papers[0].classList.add("flipped");
                break;
            case 2:
                bookObj.papers[1].classList.add("flipped");
                break;
            case 3:
                bookObj.papers[2].classList.add("flipped");
                closeBook(bookObj, false);
                break;
        }
        bookObj.currentLocation++;
    }
}

// Optionally, add swipe detection for touch devices (if needed)
