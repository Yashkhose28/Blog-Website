// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Modal Functionality (example placeholder)
function openModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listener for closing the modal (if you implement it)
const closeButton = document.querySelector('.close-modal');
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

// Example of simple form validation (placeholder)
function validateForm(event) {
    const form = event.target;
    const input = form.querySelector('input[name="email"]');
    if (!input.value.includes('@')) {
        alert('Please enter a valid email address.');
        event.preventDefault(); // Prevent form submission
    }
}

const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', validateForm);
}


function openAboutUs() {
    window.open(
        "about.html", 
        "About Us", 
        "width=800,height=600,resizable=yes,scrollbars=yes"
    );
}


const openFormButton = document.getElementById('openFormButton');
const contactForm = document.getElementById('contactForm');
const closeFormButton = document.getElementById('closeFormButton');

// Open form on single click
openFormButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    contactForm.style.display = 'block'; // Show the contact form
});

// Close form on double click
openFormButton.addEventListener('dblclick', function() {
    contactForm.style.display = 'none'; // Hide the contact form
});

// Close form button functionality
closeFormButton.addEventListener('click', function() {
    contactForm.style.display = 'none'; // Hide the contact form
});


document.addEventListener("DOMContentLoaded", () => {
    // Load comments for each post on page load
    loadComments(1);

    // Event listener for comment form submission
    document.querySelector(".comment-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const postId = this.getAttribute("data-post");
        const name = this.querySelector(".comment-name").value;
        const message = this.querySelector(".comment-message").value;
        
        if (name && message) {
            const comment = { name, message };
            saveComment(postId, comment);
            displayComment(postId, comment);
            this.reset();
        } else {
            alert("Please enter both name and comment.");
        }
    });
});

// Save comment to localStorage
function saveComment(postId, comment) {
    const comments = JSON.parse(localStorage.getItem(`comments-post-${postId}`)) || [];
    comments.push(comment);
    localStorage.setItem(`comments-post-${postId}`, JSON.stringify(comments));
}

// Load all comments from localStorage and display them
function loadComments(postId) {
    const comments = JSON.parse(localStorage.getItem(`comments-post-${postId}`)) || [];
    comments.forEach((comment, index) => displayComment(postId, comment, index));
}

// Display a single comment on the page
function displayComment(postId, comment, index) {
    const commentsList = document.getElementById(`comments-post-${postId}`);
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.setAttribute("data-index", index); // Set index for deletion reference

    const nameEl = document.createElement("strong");
    nameEl.textContent = comment.name;
    const messageEl = document.createElement("p");
    messageEl.textContent = comment.message;

    // Create a delete button for each comment
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-comment");
    deleteButton.addEventListener("click", () => deleteComment(postId, index));

    commentDiv.appendChild(nameEl);
    commentDiv.appendChild(messageEl);
    commentDiv.appendChild(deleteButton);
    commentsList.appendChild(commentDiv);
}

// Delete comment from localStorage and update the UI
function deleteComment(postId, index) {
    const comments = JSON.parse(localStorage.getItem(`comments-post-${postId}`)) || [];
    comments.splice(index, 1); // Remove comment from the array
    localStorage.setItem(`comments-post-${postId}`, JSON.stringify(comments));
    
    // Remove the comment from the UI
    const commentDiv = document.querySelector(`[data-index="${index}"]`);
    commentDiv.remove();
}
