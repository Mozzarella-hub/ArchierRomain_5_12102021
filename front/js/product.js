
/*
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
        console.table(article);
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
    addToCart(article);
}

const choixQuantite = document.getElementById('quantity');
const choixCouleur = document.getElementById('colors');
//Function ajout au panier (add to cart)
function addToCart(article) {
        const btn_envoyerPanier = document.querySelector("#addToCart");
        const addToCart = document.getElementById('addToCart');
        //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
        
    btn_envoyerPanier.addEventListener("click", (event)=>{
                event.preventDefault();
    
  
    //Récupération des options de l'article à ajouter au panier
        const optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            nomProduit: article.name,
            prixProduit: article.price,
            descriptionProduit: article.description,
            imgProduit: article.imageUrl,
            altImgProduit: article.altTxt
        };
    
        //Initialisation du local storage
        let produitLocalStorage = JSON.parse(localStorage.getItem('Produit'));
    
        //fenêtre pop-up
        const popupConfirmation =() =>{
            if(window.confirm(`Votre sélection est ajoutée au panier
    Pour la consulter, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }
   
        //Importation dans le local storage
        //Si le panier comporte déjà au moins 1 article
        if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
            (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
            //Si le produit commandé est déjà dans le panier
            if (resultFind) {
                let newQuantite =
                parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                resultFind.quantiteProduit = newQuantite;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirmation();
            //Si le produit commandé n'est pas dans le panier
            } else {
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirmation();
            }
        //Si le panier est vide
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
}
)}
*/

//---------JE REDIRIGE L'URL DE L'API---------

// je crée une nouvelle url à partir de l'url actuelle 
// et en ajoutant searchParams pour manipuler les paramètres de requête d'URL :
let params = new URL(window.location.href).searchParams;
// j'indique que la nouvelle url sera ajoutée d'un id :
let newID = params.get('id');

//---------J'APPELLE DE NOUVEAU L'API AVEC L'ID DU CANAPE CHOISI---------

// je crée les variables dont j'ai besoin pour manipuler cette page :
const image = document.getElementsByClassName('item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

let imageURL = "";
let imageAlt = "";

// je crée la bonne URL pour chaque produit choisi en ajoutant newID
fetch("http://localhost:3000/api/products/" + newID)
  .then(res => res.json())
  .then(data => {
    // je modifie le contenu de chaque variable avec les bonnes données :
    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // je configure le choix des couleurs 
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
    // j'ajoute un message au cas où le serveur ne répond pas
  .catch(_error => {
    alert('Oops ! Le serveur ne répond pas, suivez les instructions dans le READ.me.');
  });


//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------



// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', (event) => {
  event.preventDefault();
  const selectQuantity = document.getElementById('quantity');
  const selectColors = document.getElementById('colors');
  
  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };
  console.log(selection);

  // je déclare une variable productInLocalStorage 
  // dans laquelle je mets les clés+valeurs dans le local storage
  // JSON.parse permet de convertir les données au format JSON en objet JavaScript
  let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
  console.log(productInLocalStorage);

  // j'ajoute les produits sélectionnés dans le localStorage
  const addProductLocalStorage = () => {
  // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
  // on peut voir dans la console qu'il y a les données,
  // mais pas encore stockées dans le storage à ce stade

  //
  productInLocalStorage.push(selection);
  // je stocke les données récupérées dans le localStorage :
  // JSON.stringify permet de convertir les données au format JavaScript en JSON 
  // vérifier que key et value dans l'inspecteur contiennent bien des données
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  console.log(addProductLocalStorage);
  }

  // je crée une boîte de dialogue pour confirmer l'ajout au panier
  let addConfirm = () => {
    alert('Le produit a bien été ajouté au panier');
  }

  let update = false;
  
  // s'il y a des produits enregistrés dans le localStorage
  if (productInLocalStorage) {
  // verifier que le produit ne soit pas deja dans le localstorage/panier
  // avec la couleur
   productInLocalStorage.forEach (function (productOk, key) {
    if (productOk.id == newID && productOk.color == selectColors.value) {
      productInLocalStorage[key].quantity = parseInt(productOk.quantity) + parseInt(selectQuantity.value);
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));
      update = true;
      addConfirm();
    }
  });

  //
    if (!update) {
    addProductLocalStorage();
    addConfirm();
    console.log(productInLocalStorage);
    }
  }

  // s'il n'y a aucun produit enregistré dans le localStorage 
  else {
    // je crée alors un tableau avec les éléments choisi par l'utilisateur
    productInLocalStorage = [];
    addProductLocalStorage();
    addConfirm();
    console.log(productInLocalStorage);
  }
});



