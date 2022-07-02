///////////////////////////////////////////////////////// CART


// Get cart from local storage and initialize detail's product
let cart = getCart();
let qty = 0;
let price = 0;

//API link
const api = 'http://localhost:3000/api/products/';

//Initialization of client's detail order
let clientOrder = {
    "firstName" : '',
    "lastName": '',
    "address": '',
    "city":'',
    "email": '',
    "order": ''
};

// If cart exist in local storage
if (localStorage.getItem('cart') != null) {
    //for each product of cart
    for (let kanap of cart) {
        let kanapId = kanap[0];
        let kanapColor = kanap[1];
        let kanapQty = kanap[2];

        /**
        * Connection with API with GET for reception
        * @param {string} api - url of api declared in "const api"
        * @returns {Promise.resolve<string>} - array of product and detail product
        * @returns {Promise.reject<Error>} - connection error or bad request error
        */
        fetch(api)

        //Check API's connection and return result if it's ok
        .then ((response) => response.json())

        //Work on reception's value
        .then((value) => {
            // For each product of cart
            for (let product of value) {
                // If article purchase was found in API data
                if (kanapId == product._id) {
                    cart__items.innerHTML += 
                        `<article class="cart__item" data-id="${kanapId}" data-color="${kanapColor}">
                            <div class="cart__item__img">
                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                            </div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${product.name}</h2>
                                    <p>${kanapColor}</p>
                                    <p>${product.price}€</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${kanapId}', '${kanapColor}', ${kanapQty})" min="1" max="100" value="${kanapQty}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                            </div>
                        </article> `
                    ;

                    // Calcule quantity * price 
                    totalPrice(product.price, kanapQty);
                    
                // Else, empty cart
                } else {
                    document.querySelector('h1').innerHTML = 'Votre panier est vide';
                    // document.querySelector('.cart__order') = '';
                    // document.querySelector('cart__price') = '';
                }
            } 
        })

        // If error, display it on console and display a alert
        .catch((err) => {
            console.log(err);
            alert("la connexion avec l\'API a échoué")
        });      
    }
}
