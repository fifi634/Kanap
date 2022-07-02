/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */

//Recovery of id from url
// let id = new URL(document.location.href).searchParams.get("id");

/**
 * Save cart in locale storage
 * @type {object} - "cart" object : article purchase with color, id and quantity detail
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


//
/**
 * Recovery cart from local storage
 * @returns {string | array} - If cart exist return empty array else return existing cart from local storage in array format
 */
function getCart() {
    let cart = localStorage.getItem("cart");

    //Create cart if doesn't exist
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}


/**
 * Add cart in local strorage
 * @type {object} - "product" object : article purchase with color, id and quantity detail
 */
function addCart(purchase) {
    let cart = getCart();

    //Add quantity when product exist
    let foundProduct = cart.find(cart => cart.id == purchase.id);

    if (foundProduct != undefined) {
        foundProduct.quantity += parseInt(purchase.quantity);
    } else {
        purchase.quantity = 1;
        cart.push(purchase);
    }   
    saveCart(cart);
}


function removeFromCart(purchase) {
    let cart = getCart();
    cart = cart.filter(cart => cart.id != purchase.id);
    saveCart(cart);
}