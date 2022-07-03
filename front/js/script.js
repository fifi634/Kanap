///////////////////////////////////////// JS FUNCTION


/**
 * Save cart in locale storage
 * 
 * @param {any} cart - Object : article purchase with color, id and quantity detail
 * @returns {string} - Save cart in locale storage
 */
 function saveCart(cart) {
    // If cart was defined save it
    if(cart != undefined) {
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        console.log('Product undefinied, save abort');
    }
    //Update cart from local storage
    console.log('cart updated');
    return cart = JSON.parse(localStorage.getItem('cart'));
}




/**
 * Get or create cart from local storage
 * 
 * @returns {array} cart : array of product purchase
 */
function getCart() {
    let kanap = [];
    // If a cart exist in local storage, return it
    if (localStorage.getItem("cart") != null) {
        kanap = JSON.parse(localStorage.getItem("cart"));
    }
    return kanap;
}




/**
 * Add product in caddy
 * 
 * @param {string} productID - product id purchase
 * @param {string} color - color of product purchase
 * @param {int} qty - quantity of product purchase
 * @return {string} save caddy in localStorage
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
                found = true;
                kanap[2] += qty;
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
}




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
    
}




//
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
    for (let product of cart) {
        //if id == product.id, delete it
        if (id == product[0] && color == product[1]) {
            cart.splice(product, 1);
        }            
    }        
    saveCart(cart);
    window.location.reload();
    return cart;
}
