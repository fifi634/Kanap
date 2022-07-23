///////////////////////////////////////////////////////// CART


//Initialization of order
let cart = getCart();

// For calulate a totals
let qty = 0;
let price = 0;

//API link
const get = 'http://localhost:3000/api/products/';
const post = 'http://localhost:3000/api/products/order/';




/****************************************** */
/*              DISPLAY CART                */
/****************************************** */


// If cart exist in local storage
if (cart != null && cart.length != [] ) {
    //for each product of cart
    for (let kanap of cart) {
        let kanapId = kanap[0];
        let kanapColor = kanap[1];
        let kanapQty = kanap[2];

        // Connection with API for reception
        fetch(get)

            //Check API's connection
            .then ((response) => response.json())

            //Work on reception's value
            .then((value) => {

                // For each product of cart
                for (let product of value) {

                    // If quantity product was 0, delete it
                    if (kanapId == product._id && kanapQty < 1) {
                        deleteProduct(kanapId, kanapColor)
                    }

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
                console.log('fetch reception > ' + err);
                document.querySelector('h1').innerText = "L'API rencontre une erreur.";
                document
                    .querySelector('#order')
                    .setAttribute('value', "L'API rencontre une erreur.")
                ;
            })
        ;    

        //Calculate quantity total of purchase article
        qty += parseInt(kanapQty, 10);
        totalQuantity.innerText = qty;  
    }

    // Else if empty cart, write it
} else {
    document.querySelector('h1').innerText = "Votre panier est vide";
    document.querySelector('.cart__price').innerText = "";
    
    // Button for return in store
    document.querySelector('.cart__order').innerHTML = 
        `<div class="cart__order__form__submit"> 
            <a href=http://${window.location.host}/front/html/>
                <input type="button" value="Retourner au magasin ?"/>
            </a>
        </div>`
    ;
}




/******************************************** */
/*              GET USER'S DATA               */
/******************************************** */

// Initialization of object for store contact information
let client = {
    "firstName" : '',
    "lastName": '',
    "address": '',
    "city":'',
    "email": '',
}

// Listening first name
firstName.addEventListener('change', (e) => client.firstName = e.target.value.toString());

// Listening last name
lastName.addEventListener('change', (e) => client.lastName = e.target.value.toString());

// Listening adress
address.addEventListener('change', (e) => client.address = e.target.value.toString());

// Listening city
city.addEventListener('change', (e) => client.city = e.target.value.toString());

// Listening email
email.addEventListener('change', (e) => client.email = e.target.value.toString());





/********************************************* */
/*              BUTTON : COMMANDER             */
/********************************************* */


order.addEventListener('click', (e) => {
    e.preventDefault(); // Unset default reaction button

    //Reset error message
    firstNameErrorMsg.innerText = "";
    lastNameErrorMsg.innerText = "";
    addressErrorMsg.innerText = "";
    cityErrorMsg.innerText = "";
    emailErrorMsg.innerText = "";

    //Check if all data user was good
    let firstNameVerif = check(client.firstName, 'word');
    let lastNameVerif = check(client.lastName, 'word');
    let addressVerif = check(client.address, 'address');
    let cityVerif = check(client.city, 'address');
    let emailVerif = check(client.email, 'email');

    //If one check fail, show it and wait user modif
    if( firstNameVerif === false ||
        lastNameVerif === false ||
        addressVerif === false ||
        cityVerif === false ||
        emailVerif === false) 
    {
        if (firstNameVerif == false) {
            firstNameErrorMsg.innerText = `Veuillez entrer un prenom, les chiffres et caractères spéciaux ne sont pas acceptés`;
        }
        
        if (lastNameVerif == false) {
            lastNameErrorMsg.innerText = `Veuillez entrer un nom, les chiffres et caractères spéciaux ne sont pas acceptés`;
        }

        if (addressVerif == false) {
            addressErrorMsg.innerText = `Veuillez entrer une adresse, les caractères spéciaux ne sont pas acceptés.`;
        }

        if (cityVerif == false) {
            cityErrorMsg.innerText = `Veuillez entrer une ville, les caractères spéciaux ne sont pas acceptés.`;
        }

        if (emailVerif == false) {
            emailErrorMsg.innerText = `Veuillez entrer une adresse email au format xxxxxxxx@xxxxxx.xx sans accents`;
        }
        return

        // Else all data is ok, compil data order
    } else {        
        let jsonOrder = makeJsonOrder(client);
        
        // Conection for send data order
        fetch(post, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonOrder
        })
            .then ((response) => response.json())
            .then ((data) => {                
                // Go to confirmation page with ID purchase recover from API
                window.location.href = window.location.origin + "/front/html/confirmation.html?id=" + data.orderId;
            })
            .catch ((e) => {
                console.log('fetch send > ' + e);
                alert("L'envoie de la commande à échoué :(");
            })
        ;
    };
});