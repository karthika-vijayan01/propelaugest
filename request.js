let travelRequests = [];

function createTravelRequest() {
    const destination = document.getElementById('destination').value;
    const purpose = document.getElementById('purpose').value;
    const priority = document.getElementById('priority').value;

    const request = {
        id: travelRequests.length + 1,
        destination,
        purpose,
        priority,
        status: 'pending' // Initial status is pending
    };

    travelRequests.push(request);
    document.getElementById('travelRequestForm').reset();
    displayTravelRequests();
}

function displayTravelRequests() {
    const pendingList = document.getElementById('pendingRequests');
    const approvedList = document.getElementById('approvedRequests');
    const rejectedList = document.getElementById('rejectedRequests');

    // Clear all lists
    pendingList.innerHTML = '';
    approvedList.innerHTML = '';
    rejectedList.innerHTML = '';

    travelRequests.forEach(request => {
        const listItem = document.createElement('li');
        listItem.textContent = `Destination: ${request.destination}, Purpose: ${request.purpose}, Priority: ${request.priority}`;
        
        if (request.status === 'pending') {
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editRequest(request.id);
            listItem.appendChild(editButton);
            pendingList.appendChild(listItem);
        } else if (request.status === 'approved') {
            approvedList.appendChild(listItem);
        } else if (request.status === 'rejected') {
            rejectedList.appendChild(listItem);
        }
    });
}

function editRequest(id) {
    const request = travelRequests.find(req => req.id === id);
    if (request && request.status === 'pending') {
        request.destination = prompt('Edit Destination:', request.destination);
        request.purpose = prompt('Edit Purpose:', request.purpose);
        request.priority = prompt('Edit Priority (normal/critical):', request.priority);
        displayTravelRequests();
    }
}