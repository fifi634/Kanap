/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */


/**
 * Save cart in locale storage
 * @param {any} cart - Object : article purchase with color, id and quantity detail
 * @returns {string} - Save cart in locale storage
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('produit sauvegarder dans le panier');
    console.log(cart);
}



/**
 * Recovery cart from local storage
 * @returns {string | []} - return cart from local storage or empty array if it have no cart
 */
function getCart() {
    //Recovery of cart
    let cart = localStorage.getItem('cart');

    //If cart doesn't exist, return empty array
    if (cart == null) {
        return [];    
    //Else, return locale storage cart
    } else {
        return JSON.parse(cart);
    }
}



/**
 * Search if product is in a cart
 * @param {any} product - Object, article purchase with color, id and quantity detail
 * @returns {any | undefined} - Return an article object if it's found, "undefined" if doesn't found
 */
 function searchProduct(product) {
    //Recovery cart and convert it in a array
    let cartArray = Object.entries([getCart()]);

    //Search a good product by id
    let foundResult = cartArray.find(c => c[1].id == product.id);

    //If foundResult isn't undefinied, return cart in object format
    if (foundResult != undefined) {
        return {...foundResult[1]};
    //Else return foundResult (who is undifined)
    } else {
        return foundResult;
    };  
};



/**
 * Add product in cart (local strorage)
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save product in cart in local storage
 */
function addCart(product) {
    let foundProduct = searchProduct(product);
    console.log('foundProduct');
    console.log(foundProduct);

    //If product wasn't found, add article purchase in cart
    if (foundProduct != undefined && foundProduct.color == product.color) {        
        console.log('produit trouvé avec même couleur');

        //add quantity
        foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity);

        console.log('même couleur');
        console.log(foundProduct);
    //Else add a new product in cart 
    } else {        
        //convert cart in array
        console.log('produit non trouvé ou couleur différente');

        //recover product
        foundProduct = Object.assign({}, product);
        //convert cart in array
        let cartArray = Object.entries([getCart()]);
        //add product in cart array
        cartArray.push([foundProduct]);

        console.log('cartArray');
        console.log(cartArray);
        
        //convert cart in object
        foundProduct = {...cartArray};
        
        console.log('pas la même couleurs');
        console.log(foundProduct);
    };
    
    //Save product in locale storage
    console.log('foundProduct finale');
    console.log(foundProduct);
    
    saveCart(foundProduct);
};



/**
 * Remove product from cart
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save cart in local storage
 */
function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(cart => cart.id != product.id);
    saveCart(cart);
};



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
        };
    };
};