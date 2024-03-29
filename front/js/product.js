/////////////////////////////////////////////// PRODUCT PAGE
                       

// URL location
const url = new URL(location);

// Product ID
const id = url.searchParams.get("id");

// API Product link
const api = "http://localhost:3000/api/products/" + id;



/******************************************************* */
/*               DISPLAY DETAIL PRODUCT                  */
/******************************************************* */

// Connection with API
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
            }
        };
    })

    // If error, display it on console and display a alert
    .catch((err) => {
        console.log('fetch reception > ' + err);
        title.innerText = "L'API a rencontré une erreur.";
        description.innerText = "Plus d'info dans la console.";
    })
;


/************************************************** */
/*              STOCKAGE OF PURCHASE                */
/************************************************** */

//Initialise storage purchase
let purchase = {
    "id" : id,
    "quantity" : '',
    "color" : '',
};

//Local storage for cart : Quantity
quantity.addEventListener('input', (e) => purchase.quantity = e.target.value);

//Locale storage for cart : Color
colors.addEventListener('input', (e) => purchase.color = e.target.value);



/************************************************************* */
/*                     ADD CART BUTTON                         */
/************************************************************* */


// When it have a click on AddToCart button, add product into a cart and go to the cart's page
addToCart.addEventListener('click', function() {
    // Check if inputs was declared and take properties
    if (purchase.quantity >=1 && purchase.color != "") {
        let qty = parseInt(purchase.quantity, 10);
        let color = purchase.color;
        add2Cart(id, color, qty);
        window.location.href = "./cart.html";
    } else {
        alert("Veuillez choisir la couleur et la quantité de canapé désiré");
    }
});
