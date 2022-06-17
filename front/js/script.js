/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */



/**
 * Save cart in locale storage
 * @param {any} cart - Object : article purchase with color, id and quantity detail
 * @returns {string} - Save cart in locale storage
 */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


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
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save cart in local storage
 */
function addCart(product) {
    let cart = getCart();

    //Add quantity when product exist
    let foundProduct = cart.find(cart => cart.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }   
    saveCart(cart);
}


/**
 * Remove product from cart
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save cart in local storage
 */
function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(cart => cart.id != product.id);
    saveCart(cart);
}



 /**
  * Change quantity of product from cart
  * @param {any} product - object : article purchase with color, id and quantity detail
  * @param {int} quantity - number of quantity where we want add
  * @returns {any}
  */
 function changeQuantity(product, quantity) {
    let cart = getCart();
    //add quantity of product
    let foundProduct = cart.find(cart => cart.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        } else {
            saveCart(cart);
        }
    } 
}



