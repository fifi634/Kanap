//////////////////////////////////////////////// CONFIRMATION

// Get id confirm purchase
const url = new URL(window.location);
const id = url.searchParams.get('id');


// Display number of purchase
orderId.innerText = `${id}`;
