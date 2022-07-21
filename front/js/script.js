///////////////////////////////////////////////////////////////////// GLOBAL FUNCTION


/********************************** */
/*              CART                */
/********************************** */


/**
 * Save cart in locale storage
 * 
 * @param {array} cart - articles purchase with color, id and quantity detail
 * @returns {string} - Save cart in locale storage
 */
 function saveCart(cart) {
    // If cart was defined save it
    if(cart != undefined) {
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        alert("L'ajout au panier n'a pas fonctionné :(");
        console.log('Product undefinied, saveCart() abort');
    }
    //Update cart from local storage
    return cart = JSON.parse(localStorage.getItem('cart'));
};




/**
 * Get or create cart from local storage
 * 
 * @returns {array} cart : array of product purchase
 */
function getCart() {
    let kanap = [];
    // If a cart exist in local storage, return it
    if (localStorage.getItem('cart') != null) {
        kanap = JSON.parse(localStorage.getItem('cart'));
    }
    return kanap;
};




/**
 * Add product in cart
 * 
 * @param {string} productID - product id purchase
 * @param {string} color - color of product purchase
 * @param {int} qty - quantity of product purchase
 * @return {string} compilation of entries for save cart in localStorage
 */
function add2Cart (productID, color, qty) {
    let cart = getCart();
    //If cart is empty, add the first product in
    if (cart.length == 0) {
        cart = [[productID, color, qty]];
    } else {
        let found = false;
        //If cart exist in locale storage, for each article of this cart
        for (let kanap of cart) {
            //If this product had a same color and id, add quantity
            if (productID === kanap[0] && color === kanap[1]) {
                kanap[2] += qty;
                found = true;               
            } 
        }
        // If the product wasn't in cart, add it
        if (found == false) {
            let kanap = [productID, color, qty];
            cart.push(kanap);
        }
    }
    // Save cart in local storage
    saveCart(cart);
};




/**
 * Change quantity for cart's page
 * 
 * @param {string} id - product id
 * @param {string} color - product color
 * @param {int} qty - product quantity
 * @returns {string} - save cart in local storage
 */
function changeQuantity (id, color, qty) {
    let cart = getCart();
    // Parse cart for change quantity when it found and reload web page
    for (let kanap of cart) {
        if (kanap[0] == id && kanap[1] == color) {
            kanap[2] = qty;
        }
        saveCart(cart);
        window.location.reload();
    }
};




/**
 * Delete product
 * 
 * @param {string} id - id product
 * @param {string} color - color product
 * @returns {array} - cart updated
 */
function deleteProduct(id, color) {
    let cart = getCart();
    // For each product of cart
    for (let i = 0; i < cart.length; i++) {
        //if id === product.id, delete it
        if (id === cart[i][0] && color === cart[i][1]) {
            cart.splice(i, 1); // Possibility to make a trash, "splice" return a delete array
        }
    }
    saveCart(cart);
    window.location.reload();
    return cart;
}




/********************************************** */
/*              USER'S DATA ORDER               */
/********************************************** */


/**
 * Check contact information
 * @param {string} data - element to check
 * @param {string} tygpe - type of check (email, address or word)
 * @returns {boolean} - true if element was ok, false is wasn't ok
 */
function check (data, type) {
    // RegEx setting
    let mask = '';
    const word = /[A-Za-zÀ-ÖØ-öø-ÿ-]{2,31}/g;
    const address = /[A-Za-zÀ-ÖØ-öø-ÿ-0-9]{3,200}/g;
    const email = /([\w-\.]+@[\w-\.]+\.{1}[\w-]+)/g;

    this.type = type;
    this.data = data;

    if (type === 'word') {mask = word};
    if (type === 'email') {mask = email};
    if (type === 'address') {mask = address};

    return mask.test(data);
};




/**
 * Make a order object
 *
 * @param {any} client - object with all client informations
 * @returns {string} - compilation of client info and id product purchase for send to API
 */
function makeJsonOrder(client) {
    let contact = client;
    let cart = getCart();
    let products = [];

    // For each product of cart
    for (let item of cart) {
        // Check if products array is empty to fill add id article purchase in products array
        if (products.find((id) => id == item[0])) {
            console.log('makeJsonOrder() : existing in order object, abort');
        } else {
            products.push(item[0]);
        }
    };
    return JSON.stringify({contact, products});
};
