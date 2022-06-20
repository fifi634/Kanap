//Recovery of id from url
let id = new URL(document.location.href).searchParams.get("id");


//API link with product's id
const api = 'http://localhost:3000/api/products/' + id;


/******************************************************* */
/*               DISPLAY DETAIL PRODUCT                  */
/******************************************************* */

/**
 * Connection with API with GET for reception
 * @param {string} api - url of api declared in "const api"
 * @returns {Promise.resolve<string>} - array of product and detail product
 * @returns {Promise.reject<Error>} - knex Err or BadRequestError
 */
 fetch(api)

 //Check API's connection and return result if it's ok
 .then ((res) => {
    if (res.ok) {
        return res.json();
    }
 })

 //Work on reception's value
 .then((value) => {

    //Check if it's a good id product
    if (id === value._id) {
        
        //HTML picture generation
        document
            .querySelector(".item__img")
            .innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`
        ;

        //HTML product's title generation
        document
            .querySelector("#title")
            .innerText = value.name
        ;
        
        //HTML price generation
        document
            .querySelector("#price")
            .innerText = value.price
        ;
            
        //HTML description generation
        document
            .querySelector("#description")
            .innerHTML = value.description
        ;
        
        //HTML color's choice generation
        for (let color of value.colors) {
            document
                .querySelector("#colors")
                .innerHTML = `<option value="${color}">${color}</option>`
                + document.querySelector("#colors").innerHTML
            ;
        }
    };
 })

// If error, display it on console and display a alert
.catch((err) => {
    console.log(err);
    alert("la connexion avec l\'API a échoué")
})
;


/************************************************************ */
/*               STOCKAGE OF PRODUCT DETAIL                   */
/************************************************************ */

//Initialisation of object for store product's detail
let product = {
    "id": id,
    "quantity": '',
    "color" : '',
};


//Set Object product : Quantity
document
    .querySelector('#quantity')
    .addEventListener('input', (e) => product.quantity = e.target.value)
;


//Set Object product : Color
document
    .querySelector('#colors')
    .addEventListener('input', (e) => product.color = e.target.value)
;

/**************************************************************/
/*                     ADD CART BUTTON                        */
/**************************************************************/


// When it have a click on a button, save in local storage and go to cart's page
document
    .querySelector('#addToCart')
    .addEventListener('click', function (){
        if (product.quantity >= 1 && product.color != '') {
            addCart(product);
            document.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        } else {
            alert('Veuillez choisir une couleur et une quantité')
        }
    })
;

let cart = getCart();