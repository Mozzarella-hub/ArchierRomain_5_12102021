/*function nouvelArticle() {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json()
      .then((kanap) => kanap.forEach((kanap, i) => {
        console.log(kanap);
        console.log(i);
        displayKanap(kanap);
      }))
      .catch((err) => {
        console.log ('Une erreur est survenue')
      })
      )};
    nouvelArticle();


//la selection du product va passer par l'URL passe par ?ID
let queryString_url_ID = window.location.search;
console.log(queryString_url_ID);

//methode 2 avec urlSearchParams extraction ID
let URLSearchParams.get = new URLSearchParams(queryString_url_ID);
console.log (URLSearchParams);

let idProduct = URLSearchParams.get('_id')
console.log(_id);


/*
function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}
function displayKanap (kanap){

//function affichage id_title
function displayTitle(titleProduct) {
let nameProduct = document.getElementById('#title');
console.log(title);
nameProduct.innerHTML = kanap.name;
console.log(nameProduct);
}
*/

/*
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

*/
//Préparation url produit choisi, quantité et couleur
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);//voir
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    //Post article choisi et tous ses éléments - !Faire en premier! 
function getPost(article){
    // Insertion de l'image
    let imgProduct = document.createElement('img');
    document.querySelector(".item__img").appendChild(imgProduct);
    imgProduct.src = article.imageUrl;
    imgProduct.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    //addToCart(article);
}

