/******************/ 
/* Page d'Accueil */
/*****************/



//Lien API
const api = 'http://localhost:3000/api/products';

//Stockage des valeurs
let kanapData = '';


/** Connexion avec l'API en GET pour reception */

fetch(api)
    // vérification de la connexion
    .then ((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    //on récupère les données et on les enregistre dans la variable kanapData
    .then((value) => {
        kanapData = value;

        /** On affiche les produits récupéré de l'API sur la page d'accueil */

        for (let kanap of kanapData) {
            //Génération du code HTML
            document
                .getElementById('items')
                .innerHTML = `<a href="">
                                <article>
                                    <img src="" alt="">
                                    <h3 class="productName"></h3>
                                    <p class="productDescription"></p>
                                </article>
                            </a>`+ document.getElementById('items').innerHTML;                   

            //Lien
            document
                .querySelector('section a')
                .setAttribute('href', `./product.html?id=${kanap._id}`);

            //Image
            document
                .querySelector('article img')
                .setAttribute('src', kanap.imageUrl);
            document
                .querySelector('article img')
                .setAttribute('alt', kanap.altTxt);

            //Nom
            document
                .querySelector('article h3')
                .innerText = kanap.name;

            //Description
            document
                .querySelector('article p')
                .innerText = kanap.description;
        };
    })

    // Si erreur on l'affiche dans la console et on affiche un message sur la page d'accueil 
    .catch((err) => {
        console.log(err);
        document
            .getElementById('items')        
            .innerText = "La connection avec l'API à échoué :( ";
    });
    
