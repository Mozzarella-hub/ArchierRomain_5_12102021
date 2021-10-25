function nouvelArticle() {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json()
      .then((kanap) => kanap.forEach((kanap, i) => {
        console.log(kanap);
        console.log(i);
        displayProducts(kanap);
      }))
      .catch((err) => {
        console.log ('Une erreur est survenue')
      })
      )};
    nouvelArticle();

/*
//la selection du product va passer par l'URL passe par ?ID
let queryString_url_ID = window.location.search;
console.log(queryString_url_ID);

//methode 2 avec urlSearchParams extraction ID
let URLSearchParams.get = new URLSearchParams(queryString_url_ID);
console.log (URLSearchParams);

let idProduct = URLSearchParams.get('_id')
console.log(_id);
*/


function displayProducts (kanap){

//function affichage id_title
function displayTitle(titleProduct) {
let nameProduct = document.getElementById('#title');
console.log(title);
nameProduct.innerHTML = kanap.name;
console.log(nameProduct);
}

//function affichage id_description
function displayDescription(description) {
    let contentDescription = document.getElementById('#description');
    console.log(contentDescription);
    contentDescription.innerHTML = kanap.description;
    console.log(contentDescription);
}

//function affichage id_title
function displayPrice(priceProduct) {
    let price = document.getElementById('#price');
    console.log(price);
    priceProduct.innerHTML = kanap.price;
    console.log(priceProduct);
    }

//function affichage id_colors
//Attention l'élément sélectionné, vider un tableau d'objet


};
