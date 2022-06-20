/**************************** */
/*     GLOBAL FUNCTION        */
/**************************** */

//Recovery of id from url
// let id = new URL(document.location.href).searchParams.get("id");


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
    let cart = localStorage.getItem('cart');
    //Create cart if doesn't exist, else parse local storage element
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}


/**
 * Add product in cart (local strorage)
 * @param {any} product - Object : article purchase with color, id and quantity detail
 * @returns {string} - Function "saveCart" : save product in cart in local storage
 */
function addCart(product) {
    //Recovery of cart
    let cart = getCart();
    //Search the good product by id
    let foundProduct = cart.find(c => c.id == product.id);
    console.log("found : " + foundProduct);
    //If product was found
    if (foundProduct != undefined) {
        console.log('produit trouvé');
        //add quantity if it have a same color
        if (foundProduct.color != product.color) {
            cart.color = [];
            cart.color.push(product.color)
            cart.quantity += product.quantity;
            console.log('j ajoute la quantité et la couleur');
        //Else add a new product in cart
        } else {
            cart.quantity += product.quantity;
            console.log('j ajoute la quantité :' + cart.quantity);
        }
    } else {
        cart = Object.assign({}, product);
        console.log('produit non trouvé je l ajoute au panier')
    }
    //Save product in locale storage
    saveCart(cart);
    console.log('produit sauvegarder dans le panier')
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





