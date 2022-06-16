/******************/ 
/*  Product Page  */
/******************/



//Initialization of URL object with brother's url
let url = new URL(document.location.href);


//Recovery of id from url
let id = url.searchParams.get("id");


//API link with product's id
const api = 'http://localhost:3000/api/products/' + id;


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

    //Check if it's a good product id
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


//Local storage for cart : Quantity
document
    .querySelector('#quantity')
    .addEventListener('input', (e) => {
        localStorage.quantity = e.target.value;
    })
;


//Locale storage for basket : Id product
localStorage.id = id;


//Locale storage for cart : Color
document
    .querySelector('#colors')
    .addEventListener('input', (e) => {
        localStorage.color = e.target.value;
    })
;