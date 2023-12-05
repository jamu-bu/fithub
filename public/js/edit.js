// Update an outfit
const updateOutfitHandler = async (event) => {
    event.preventDefault();
    // Grab values of name and products
    const outfit_name = document.querySelector('#fitName').value.trim();

    const productIds = [];

    const id = event.target.getAttribute('data-id');

    // Iterate through all elements with the class 'piece-card' to collect their data-id attributes
    document.querySelectorAll('.piece-card').forEach((card) => {
        if (card.classList.contains('active')) {
            const id = card.getAttribute('data-id');
            productIds.push(id);
        }
    });
    // verify there is a name and products
    if (outfit_name && productIds.length > 0) {
        // Create post request to /api/outfit
        const response = await fetch(`/api/outfit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ outfit_name, productIds }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Redirect if complete
        if (response.ok) {
            document.location.replace('/yours'); // redirect to homepage
        } else {
            alert(response.statusText)
        }
    }
};

// Delete an outfit
const deleteOufitHandler = async (event) => {
    event.preventDefault();
    // Outfit id will be stored in data id
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // Create delete request to /api/outfit/id
        const response = await fetch(`/api/outfit/${id}`, {
            method: 'DELETE',
        });
        // Reload once outfit is deleted
        if(response.ok){
            document.location.replace('/yours') // reload page or relocate
        } else {
            alert('Failed to delete outfit');
        }
    }
};

// Edit an outfit
const toggleEditFit = async () => {
    const editFitSection = document.getElementById('editFitSection');
    console.log(editFitSection.style);
    if (editFitSection.style.display === 'none') {
        editFitSection.style.display = 'block'
    };
};

// Event listeners
document.querySelector('#generate').addEventListener('click', updateOutfitHandler);
document.getElementById('deleteBtn').addEventListener('click', deleteOufitHandler);
document.getElementById('showEditBtn').addEventListener('click', toggleEditFit);