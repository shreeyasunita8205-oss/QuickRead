document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search.box input");
    const bookCards = document.querySelectorAll(".books");
    const clearButton = document.createElement("button");
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const closeModal = document.createElement("button");

    // Add classes for modal and styling
    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    closeModal.textContent = "Close";
    closeModal.classList.add("close-modal");

    modal.appendChild(modalContent);
    modalContent.appendChild(closeModal);
    document.body.appendChild(modal);

    // Search functionality
    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        let hasResults = false; // Track if there are visible book cards

        bookCards.forEach(book => {
            const title = book.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                book.style.display = "block"; // Show matched book
                hasResults = true; // Found at least one matching book
            } else {
                book.style.display = "none"; // Hide non-matching book
            }
        });

        // Show/Hide Clear Search button based on input
        clearButton.style.display = query ? "inline-block" : "none";
    });

    // Clear Search Button functionality
    clearButton.addEventListener("click", () => {
        searchInput.value = ""; // Clear the input field
        bookCards.forEach(book => book.style.display = "block"); // Show all books
        clearButton.style.display = "none"; // Hide the clear button
        modal.style.display = "none"; // Hide the modal
        categoriesDropdown.style.display = "none"; // Hide the categories dropdown
    });

    // Click event to show modal with book title and summary
    bookCards.forEach(book => {
        book.addEventListener("click", () => {
            const title = book.querySelector("h3").textContent;
            const bookId = book.getAttribute("data-book-id"); // Assuming book ID is stored in a data attribute
            const summaryUrl = `${bookId}.docx`; // Assuming summaries are stored in a folder named "summaries"

            fetch(summaryUrl)
                .then(response => response.arrayBuffer()) // Use arrayBuffer() to fetch binary data
                .then(arrayBuffer => {
                    return mammoth.convertToHtml({ arrayBuffer: arrayBuffer }); // Convert the .docx to HTML
                })
                .then(result => {
                    modalContent.innerHTML = `
                    <h2>${title}</h2>
                    <div style="height: 300px; overflow-y: auto; text-align: left;">
                        ${result.value} <!-- The converted HTML content -->
                    </div>
                    `;
                    modalContent.appendChild(closeModal); // Append close button
                    modal.style.display = "flex"; // Show modal
                })
                .catch(error => {
                    console.error(`Error fetching summary: ${error}`);
                });
        });
    });
    // Close modal functionality
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide modal
    });

});
//js for login
var Loginform = document.getElementById("loginform");
var Regform = document.getElementById("registrationform");
var indicator = document.getElementById("indicator");

function Register(){
registrationform.style.transform = "translatex(0px)";
loginform.style.transform = "translatex(0px)";
indicator.style.transform = "translatex(100px)";
}

function Login(){
registrationform.style.transform = "translatex(300px)";
loginform.style.transform = "translatex(300px)";
indicator.style.transform = "translatex(0px)";
}


