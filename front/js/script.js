///////////////////////////////////////// JS FUNCTION




/**
 * Getting or create cart from local storage
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
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
    
    // store cart in locale storage
    localStorage.setItem("cart", JSON.stringify(cart));
}




// Total price
function totalPrice (price, quantity) {
    let total =+ price * quantity;
    document
        .querySelector('#totalPrice')
        .innerHTML = total;
}




//Change quantity on Cart's page
function changeQuantity (id, color, qty) {
    let cart = getCart();
    // Parse cart for change quantity when it found
    for (let kanap of cart) {
        if (kanap[0] == id && kanap[1] == color) {
            kanap[2] = qty;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
}