//////////////////////////////////////////////// CONFIRMATION

// Initialize location for get ID Confirm Purchase in url
const url = new URL(window.location);


// Display ID of purchase
orderId.innerText = `${url.searchParams.get('id')}`;


// Clean of local storage
localStorage.clear();