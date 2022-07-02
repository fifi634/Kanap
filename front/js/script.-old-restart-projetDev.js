/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */

//memo :
// produitTableau = cart
// produitData = product
// select = allColors
// fusionProduitTeinte = addColorInCart

/**
 * Add product purchase in cart (locale storage)
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save product in cart in local storage
 */
function addCart(product) {
    //Recovery of cart
    let cart = JSON.parse(localStorage.getItem("cart"))

    //If cart doesn't exist
    if(cart == null) {
        //create empty array
        cart = [];
        //Add product purchase in cart
        cart.push(product);
        //store cart in locale storage
        localStorage.setItem("cart", JSON.stringify(product));
    }
}