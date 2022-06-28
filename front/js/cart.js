/********************************* */
/*     ARRAY OF CART PRODUCTS      */
/********************************* */
//panierDisplay = cartDisplay


//recover cart from local storage
let cart = JSON.parse(localStorage.getItem('cart'));


//API link with product's id
const api = 'http://localhost:3000/api/products/';


//display of cart
const cartDisplay = async() => {
    if(cart) {
        await cart;

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
            
            cart.map((kanap) => {
                
                let foundProduct = value.find(p => p._id == kanap.id);
            }) 
            //For each product of cart, generate html for display cart
            cart__items.innerHTML = cart.map((kanap) => `
                <article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
                    <div class="cart__item__img">
                    <img src="     " alt="      ">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>Nom du produit</h2>
                        <p>Vert</p>
                        <p>42,00 €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`,
            )      
        })       

        // If error, display it on console and display a alert
        .catch((err) => {
            console.log(err);
            alert("la connexion avec l\'API a échoué")
        });


        // cart__items.innerHTML = cart.map((kanap) => `
        // `)

    } else {
    alert('Le panier est vide.')
    }
}


cartDisplay();