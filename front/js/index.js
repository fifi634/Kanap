//API link
const api = 'http://localhost:3000/api/products';


/**
 * Connection with API with GET for reception
 * @param {string} api - url of api declared in "const api"
 * @returns {Promise.resolve<string>} - array of product and detail product
 * @returns {Promise.reject<Error>} - knex Err or BadRequestError
 */
fetch(api)

    // check API connection and return result if it's ok
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })

    //work with API result
    .then((value) => {

        // Display product on home page
        for (let kanap of value) {

            //HTML generation
            document
                .getElementById('items')
                .innerHTML = `<a href="">
                                <article>
                                    <img src="" alt="">
                                    <h3 class="productName"></h3>
                                    <p class="productDescription"></p>
                                </article>
                            </a>`+ document.getElementById('items').innerHTML;                   

            //Link generation
            document
                .querySelector('section a')
                .setAttribute('href', `./product.html?id=${kanap._id}`);

            //Image generation
            document
                .querySelector('article img')
                .setAttribute('src', kanap.imageUrl);
            document
                .querySelector('article img')
                .setAttribute('alt', kanap.altTxt);

            //Name generation
            document
                .querySelector('article h3')
                .innerText = kanap.name;

            //Description generation
            document
                .querySelector('article p')
                .innerText = kanap.description;
        };
    })

    // If error, display it on console and display a message on home page
    .catch((err) => {
        console.log(err);
        document
            .getElementById('items')        
            .innerText = "La connection avec l'API à échoué :( "
    })
;



