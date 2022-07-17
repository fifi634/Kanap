/////////////////////////////////////////////////////////////////// HOME PAGE 


// API Product link
const get = "http://localhost:3000/api/products/";


/**
 * Connection with API for reception
 * @param {string} get - url connection
 * @returns {Promise.resolve<array>} - array of product and detail product
 * @returns {Promise.reject<Error>} - connection error or bad request error
 */
fetch(get)
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
            items.innerHTML = 
                `<a href="">
                    <article>
                        <img src="" alt="">
                        <h3 class="productName"></h3>
                        <p class="productDescription"></p>
                    </article>
                </a>`
                + items.innerHTML
            ;                   

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
        console.log('fetch reception > ' + err);
        document
            .querySelector('h1')
            .innerText = "L'API a rencontré une erreur"
        ;
        document
            .querySelector('h2')
            .innerText = "";
    })
;