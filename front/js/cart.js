// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //

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
function changeQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');

  for (let m = 0; m < itemQtt.length; m++){
    itemQtt[m].addEventListener('change' , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let itemOldQtt = productInLocalStorage[m].quantity;
          let itemNewQtt = itemQtt[m].value;
          
          const resultFind = productInLocalStorage.find((el) => el.itemNewQtt !== itemOldQtt);

          resultFind.quantity = itemNewQtt;
          productInLocalStorage[m].quantity = resultFind.quantity;

          localStorage.setItem('product', JSON.stringify(productInLocalStorage));

          // avertir de la suppression et recharger la page
          alert('Votre panier est à jour.');
          window.location.href = "cart.html";
    
      })
  }
  console.log('je suis la quantité qui change', itemQtt);
}
changeQtt();

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

  console.log('je suis le total du prix', calculPrice);
}
priceAmount();

} // fin else : s'il y a des produits dans le panier
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
// DEMANDER LES INFOS DE L'UTILISATEUR



// j'envoie le formulaire dans le serveur
class Form {
	constructor() {
		this.firstName = document.getElementById("firstName").value;
		this.lastName = document.getElementById("lastName").value;
		this.adress = document.getElementById("address").value;
		this.city = document.getElementById("city").value;
		this.email = document.getElementById("email").value;
	}
}

// Analysing user input with regex
function userInputVerification() {
	const userForm = new Form();
	// Firstname
	function firstNameValid() {
		const userFirstName = userForm.firstName;
		const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
		if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(userFirstName)) {
			firstNameErrorMsg.innerText = "";
			return true;
		} else {
			firstNameErrorMsg.innerText = "Votre prénom ne peut contenir que des lettres, de 3 à 20 caractères.";
		}
	}
	// Lastname
	function lastNameValid() {
		const userLastName = userForm.lastName;
		const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
		if (/^[A-Za-z]{2,20}$/.test(userLastName)) {
			lastNameErrorMsg.innerText = "";
			return true;
		} else {
			lastNameErrorMsg.innerText = "Votre nom ne peut contenir que des lettres, de 2 à 20 caractères.";
		}
	}
	// Adresse
	function adressValid() {
		const userAdress = userForm.adress;
		const addressErrorMsg = document.getElementById("addressErrorMsg");
		if (/[^§]{5,50}$/.test(userAdress)) {
			addressErrorMsg.innerText = "";
			return true;
		} else {
			addressErrorMsg.innerText = "L'adresse semble incorrect.";
		}
	}
	// City
	function cityValid() {
		const userCity = userForm.city;
		const cityErrorMsg = document.getElementById("cityErrorMsg");
		if (/^[A-Za-z]{2,20}$/.test(userCity)) {
			cityErrorMsg.innerText = "";
			return true;
		} else {
			cityErrorMsg.innerText = "La ville ne peut contenir que des lettres, de 2 à 20 caractères.";
		}
	}
	// Email
	function emailValid() {
		const userEmail = userForm.email;
		const emailErrorMsg = document.getElementById("emailErrorMsg");
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
			emailErrorMsg.innerText = "";
			return true;
		} else {
			emailErrorMsg.innerText = "Il faut renseigner une adresse email valide.";
		}
	}

	if (firstNameValid() && lastNameValid() && adressValid() && cityValid() && emailValid()) {
		return true;
	} else {
		console.log("Unvalid form input.");
	}
}

// Id in Array to POST
let userBasket = [];
function productsToSend() {
	
	for (let i = 0; i < localStorage.length; i++) {
		let id = localStorage.key(i);
		userBasket.push(id);
	}
	return userBasket;
}

// Send info to the back if valid, request orderId
let userFormSubmit = document.getElementById(".order");
userFormSubmit.addEventListener("click", (e) => {
	e.preventDefault();

	if (userInputVerification()) {
		const products = productsToSend();
		const toSend = {
			contact: {
				firstName: firstName.value,
				lastName: lastName.value,
				address: address.value,
				city: city.value,
				email: email.value,
			},
			products: userBasket,
		};
		// POSTing on the API
/*fetch("http://localhost:3000/api/products/order/" ,{
   
			method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
		body: JSON.stringify(toSend),
		})
			
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				localStorage.setItem("orderId", JSON.stringify(data))
			})
			.catch((error) => {
				console.log("Error: " + error);
			});
			function idTestComm () { invoice = strval(rand(1,1000))
		} //valeur unique empechant les paiements accidentels (doit être differente pour chaque paiement)
				idTestComm();
	document.location.href = `./confirmation.html?id=${toSend.orderId}`;
	*/

	const options = {
		method: 'POST',
		body: JSON.stringify(toSend),
		headers: { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json' ,
		'mode': 'cors',
  		'credentials': 'include'
		}
	  }
	
	   	fetch('http://localhost:3000/api/products/order/', options)
		.then(response => response.json())
		.then(data => {
		  // localStorage.clear();
		  localStorage.setItem('orderId', JSON.stringify(data.orderId));
		  document.location.href = `confirmation.html?id=${data.orderId}`;
		});
	
}}
)

