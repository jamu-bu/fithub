
const likeOufitHandler = async (event) => {
    event.preventDefault();
    // Outfit id will be stored in data id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // Create post request to /api/outfit/like/id
        const response = await fetch(`/api/outfit/like/${id}`, {
            method: 'POST',
        });
        // Reload when completed
        if(response.ok){
            document.location.reload() // reload page
        } else {
            alert('Failed to like outfit');
        }
    }
};

// Event listener
const likeButton = document.querySelectorAll('.like-button');
// event delegation for likes button
likeButton.forEach((button) => {
    button.addEventListener('click', likeOufitHandler);
});

