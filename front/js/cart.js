//Pour le firefox
window.load;

let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));
console.log('voici les produits dans le localStorage', productInLocalStorage);

// AFFICHER LES PRODUITS DU PANIER

 // je sélectionne la partie html concernée par la modification
 let cartAndFormContainer = document.getElementById('cartAndFormContainer');
 console.log(cartAndFormContainer);

 // si le panier est vide : afficher 'le panier est vide'
if(productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
}
// si le panier n'est pas vide : afficher les produits dans le localStorage
else{ 
  let itemCards = [];
      //expression initiale; condition; incrémentation
  for (i = 0; i < productInLocalStorage.length; i++) {
    console.log(productInLocalStorage.length);
    // le code suivant sera injecté à chaque tour de boucle
    // selon la longueur des produits dans le local storage
    itemCards = itemCards + `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `; 
    console.log(itemCards);
  }
  if (i == productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
}

// je modifie la quantité dans le panier
function changeQuantity() {
  let itemQuant = document.querySelectorAll('.itemQuantity');

  for (let v = 0; v < itemQuant.length; v++){
    itemQuant[v].addEventListener('change' , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let itemOldQuant = productInLocalStorage[v].quantity;
          let itemNewQuant = itemQuant[v].value;
          
          const resultFind = productInLocalStorage.find((el) => el.itemNewQuant !== itemOldQuant);

          resultFind.quantity = itemNewQuant;
          productInLocalStorage[v].quantity = resultFind.quantity;

          localStorage.setItem('product', JSON.stringify(productInLocalStorage));

          // avertir de la suppression et recharger la page
          alert('Votre panier est à jour.');
          window.location.href = "cart.html";
    
      })
  }
  console.log('je suis la quantité qui change', itemQuant);
}
changeQuantity();

// je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.querySelectorAll('.deleteItem');
  console.log('je suis le bouton suppr', deleteItem);

  for (let j = 0; j < deleteItem.length; j++) { 
    deleteItem[j].addEventListener('click', (event) => {
      event.preventDefault();

      // enregistrer l'id séléctionné par le bouton supprimer
      let deleteId = productInLocalStorage[j].id;

      // supprimer l'élément cliqué par le bouton supprimer
      productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId);
      console.log('je suis le nouveau localstorage', productInLocalStorage);
      
      // envoyer la variable dans le localStorage
      localStorage.setItem('product', JSON.stringify(productInLocalStorage));

      // avertir de la suppression et recharger la page
      alert('Votre article a bien été supprimé.');
      window.location.href = "cart.html";

    });
  }
}
deleteArticle();

// j'affiche le total des articles dans le panier
function totalArticles() {
  let totalItems = 0;
  for (k in productInLocalStorage) {
    const newQuantity = parseInt(productInLocalStorage[k].quantity, 10);
    totalItems += newQuantity;
  }
  return totalItems;
}
const totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalArticles();

// je calcule le montant total du panier
function priceAmount() {
  const calculPrice = [];
  for (l = 0; l < productInLocalStorage.length; l++) {
    const cartAmount = productInLocalStorage[l].price * productInLocalStorage[l].quantity;
    calculPrice.push(cartAmount);
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;

  console.log('LEADER PRICE', calculPrice);
}
priceAmount();

} //ELSE

//Instauration FORM + règle RegExp
function getForm() {
    // Ajout des RegExp
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();



//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            
            })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        document.location.href = "/front/html/confirmation.html";
        })
       
}
postForm();

