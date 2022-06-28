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
 * @returns {Promise.reject<Error>} - Connection error or bad request error
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
        title.innerText = value.name;
        
        //HTML price generation
        price.innerText = value.price;
            
        //HTML description generation
        description.innerHTML = value.description;
        
        //HTML color's choice generation
        for (let color of value.colors) {
            colors.innerHTML = `<option value="${color}">${color}</option>`
                + document.querySelector("#colors").innerHTML
            ;
        };
    };
 })

// If error, display it on console and display a alert
.catch((err) => {
    console.log(err);
    alert("la connexion avec l\'API à échoué")
});



/************************************************************ */
/*               STOCKAGE OF PRODUCT DETAIL                   */
/************************************************************ */

//Initialisation of object for store product's detail
let purchase = {
    "id": id,
    "color" : '',
    "quantity" : ''
};


//Set Object product : Quantity
quantity.addEventListener('input', (e) => purchase.quantity = e.target.value);


//Set Object product : Color
colors.addEventListener('input', (e) => purchase.color = e.target.value);



/**************************************************************/
/*                     ADD CART BUTTON                        */
/**************************************************************/


// When click on button, save in local storage and go to cart's page
addToCart.addEventListener('click', function (){
    if (purchase.quantity >= 1 && purchase.color != '') {
        addCart(purchase);
        document.location.href = "./cart.html";
    } else {
        alert('Veuillez choisir une couleur et une quantité')
    }
});
