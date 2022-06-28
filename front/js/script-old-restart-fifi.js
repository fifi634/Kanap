/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */


/**
 * Recovery cart from local storage
 * @returns {array | undefined} - return a cart array from local storage or undefined if it have no cart or purchase
 */
 function getCart() {
    //Recovery of cart
    let cart = localStorage.getItem('cart');

    //If cart doesn't exist, convert purchase in cart array
    if (cart == null) {
        cart = [];
        cart.push(purchase);
        return cart;

    //Else, return locale storage cart
    } else {
        console.log('cart found')
        // cartReturn = JSON.parse(cart)

//         //If cart in an array, return it
//         if(Array.isArray(cartReturn) === true) {
//             console.log('cart already an array, return it :');
//             console.log(cartReturn);
//             return cartReturn;
//         //Else convert it
//         } else {
//             console.log('cart is not an array, convert it');
//             return convertInCartArray(cartReturn);
        // }
    }
}



/**
 * Add product in cart (local strorage)
 * @param {any} prurchase - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save product in cart in local storage
 */
 function addCart(purchase) {
    //Recover cart
    let cart = getCart();

    //Save cart in locale storage
    saveCart(cart);
 }
