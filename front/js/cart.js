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


/****************************************** */
/*              DISPLAY CART                */
/****************************************** */


// If cart exist in local storage
if (cart != null && cart.length > 0) {
    //for each product of cart
    for (let kanap of cart) {
        let kanapId = kanap[0];
        let kanapColor = kanap[1];
        let kanapQty = kanap[2];

        // Connection with API
        fetch(api)
            //Check API's connection
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
                                            <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${kanapId}', '${kanapColor}', this.value)" min="1" max="100" value="${kanapQty}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem" onclick="deleteProduct('${kanapId}', '${kanapColor}')">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article> `
                        ;

                        // Calculate total price and display it 
                        price += parseInt(product.price, 10) * parseInt(kanapQty, 10);
                        document
                            .querySelector('#totalPrice')
                            .innerText = price
                        ;
                    }
                }
            })

            // If error, display it on console and display a alert
            .catch((err) => {
                console.log(err);
                document
                    .querySelector('#order')
                    .setAttribute('value', "L'API a rencontré une erreur, plus d'info dans la console.")
            })
        ;      
    }
} else // Else if empty cart, write it
{
    console.log('empty cart');
    document.querySelector('h1').innerText = "Votre panier est vide";
    document.querySelector('.cart__price').innerText = "";
    // Button for return in store
    document.querySelector('.cart__order')
        .innerHTML = '<a href=http://' + window.location.host + '/front/html/><input type="button" value="Retourner au magasin ?"/></a>'
    ;
}
