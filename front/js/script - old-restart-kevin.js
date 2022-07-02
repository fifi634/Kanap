/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */
 
/**
 * Rec of cart in local storage
 * @param {any} cart - Object, articles purchase with id, quantity and color detail
 * @returns {string} - stringify's object for locale storage
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
};


/**
 * Recovery cart from local storage
 * @returns {any | [] } - return cart from local storage or empty array if it have no cart
 */
function getCart() {
    //Recovery of cart
    let cart = localStorage.getItem('cart');

    //If it have not cart, return empty array
    if (cart == null) {
        return[];
    //Else, return locale storage cart
    } else {
        return JSON.parse(cart);
    };
};


//Add product in cart (local strorage)
function addCart(product, quantity) {
        //Recovery cart
        let cart = getCart();

        //Search a good product by id
        let foundProduct = cart.find(c => c.id == product.id && c.color == product.color);
        console.log(foundProduct);
    
        //If product exist in cart, add product quantity
    
        //Else, add product quantity and this new product in cart
    
        //Rec cart in storage
}
