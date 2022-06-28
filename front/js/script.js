/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */


/**
 * Recovery purchase and convert it in a array for cart
 * @param {any} purchase - Object who content article purchase with user detail's choice (color and quantity)
 * @returns {array | undefined} - Cart with purchase article in array format or undifined if purchase wasn't done
 */
 function convertInCartArray(purchase) {

    //start function only if purchase done
    if (purchase.color != null && purchase.quantity != null) {
        //generate cart array
        return [
            productOption = {
                "id" : purchase.id,
                "color" : purchase.color,
                "quantity" : purchase.quantity
            }
        ];
    } else {
        console.log('convert failed, purchase was not define');
    }
}



/**
 * Save cart in locale storage
 * @param {any} cart - Object : article purchase with color, id and quantity detail
 * @returns {string} - Save cart in locale storage
 */
 function saveCart(cart) {
    //Verify is cart was defined
    if(cart != undefined && cart.length != 0 ) {
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        console.log('Product undefined or empty cart, save abort');
    }
    //Update cart from local storage
    cart = JSON.parse(localStorage.getItem('cart'));
    console.log('save');
    console.log(cart);
}



/**
 * Recovery cart from local storage
 * @returns {array} - return a cart array from local storage
 */
function getCart() {
    //Recovery of cart
    let cart = localStorage.getItem('cart');

    //If cart doesn't exist, convert purchase in cart array
    if (cart == null && purchase.color != '' && purchase.quantity != '') {
        cart = [];
        console.log('getCart() null');
        return cart;
    //Else if cart exist return it
    } else if (cart != null) {
        console.log('existing cart')
        cartReturn = JSON.parse(cart);
        //If cart in an array, return it
        if(Array.isArray(cartReturn) === true) {
            console.log('getCart() array=true');
            return cartReturn;
        //Else convert it
        } else {
            console.log('getCart() array=false');
            return convertInCartArray(cartReturn);
        }
    //Else do nothing
    } else {
        console.log('incomplete purchase, recovery cart aborted')
    }
}



// /**
//  * Search if product is in a cart
//  * @param {array} purchase - Article purchase from product page
//  * @returns {array | undefined} - Return article's array if it's found, "undefined" if doesn't found
//  */
//  function searchProduct(purchase) {
//     let cart = getCart();
//     let foundResult = cart.find(p => p[0] == purchase.id);   
//     return foundResult;
// };



/**
 * Add product in cart (local strorage)
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save product in cart in local storage
 */
function addCart(purchase) {
    //recovery cart
    let cart = getCart();
    console.log(cart);
    //If cart is empty
    if (cart.length == 0) {
        console.log('empty array');
        cart.push(purchase);
    } else {       
        //For each product of cart
        for (let kanap in cart) {
            //If a same id and color with purchase
            if  (kanap.id === purchase.id && kanap.color === purchase.color) {
                // kanap.quantity = kanap.quantity + purchase.quantité  
                let sum = parseInt(kanap.quantity) + parseInt(purchase.quantity);
                console.log('kanap.quantity :');
                console.log(kanap.quantity);
                console.log('purchase.quantity');
                console.log(purchase.quantity);           
                
                //Add quantity of this product in cart               
                kanap.quantity = parseInt(sum);
                console.log('SUM = ');
                console.log(sum);                
            //Else add purchase at cart array
            } else if (kanap.id != purchase.id || kanap.color != purchase.color) {
                cart.push(purchase);
            }    
        console.log('addCart');
        console.log(cart);
        }
    }

    // //If product was found and it have a same color
    // if (foundProduct != undefined && foundProduct[1] == purchase.color) {        
    //     //add quantity
    //     foundProduct[2] = parseInt(foundProduct[2]) + parseInt(purchase.quantity);
    
    // //Else add a new product in cart 
    // } else {        
    //     //convert cart in array
    //     console.log('produit non trouvé ou couleur différente');

    //     //recover product
    //     foundProduct = Object.assign({}, product);
    //     //convert cart in array
    //     let cartArray = Object.entries([getCart()]);
    //     //add product in cart array
    //     cartArray.push([foundProduct]);

    //     console.log('cartArray');
    //     console.log(cartArray);
        
    //     //convert cart in object
    //     foundProduct = {...cartArray};
        
    //     console.log('pas la même couleurs');
    //     console.log(foundProduct);
    // };
    
    //Save product in locale storage    
    saveCart(cart);
};



// /**
//  * Remove product from cart
//  * @param {any} product - Object : article purchase with color, id and quantity detail
//  * @returns {string} - Function "saveCart" : save cart in local storage
//  */
// function removeFromCart(product) {
//     let cart = getCart();
//     cart = cart.filter(cart => cart.id != product.id);
//     saveCart(cart);
// };



//  /**
//   * Change quantity of product from cart
//   * @param {any} product - object : article purchase with color, id and quantity detail
//   * @param {int} quantity - number of quantity where we want add
//   * @returns {any}
//   */
//  function changeQuantity(product, quantity) {
//     let cart = getCart();
//     //add quantity of product
//     let foundProduct = cart.find(cart => cart.id == product.id);
//     if (foundProduct != undefined) {
//         foundProduct.quantity += quantity;
//         if (foundProduct.quantity <= 0) {
//             removeFromCart(foundProduct);
//         } else {
//             saveCart(cart);
//         };
//     };
// };