///////////////////////////////////////// JS FUNCTION


// Getting caddy from local storage
function getCaddy() {
    let items = [];

    // If a caddy exist in local storage, return it
    if (localStorage.getItem("caddy") != null) {
        items = JSON.parse(localStorage.getItem("caddy"));
    }
    
    return items;
}


// Add product in caddy
function add2Caddy (productID, color, qty) {
    let caddy = getCaddy();
    
    //If caddy is empty, add the first product in
    if (caddy.length == 0) {
        caddy = [[productID, color, qty]];
    } else {
        let found = false;

        //If a caddy exist in local, for each article of this caddy
        for (let item of caddy) {
            //If this product had a same color and id, add quantity
            if (productID === item[0] && color === item[1]) {
                found = true;
                item[2] += qty;
            }
            // If the product hasn't in caddy, add it
            if (found == false) {
                let item = [productID, color, qty];
                caddy.push(item);
            }
        }

    }
    // store caddy in locale storage
    localStorage.setItem("caddy", JSON.stringify(caddy));
    console.log('product add in caddy');
}

