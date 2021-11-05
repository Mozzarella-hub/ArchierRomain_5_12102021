/*
On appel l'API par fetch, créé la fonction-forEach
Appliqué sur "chaque" éléments tableaux,
Evite boucle (CHAQUE ELEMENTS)
*/

function nouvelArticle() {
fetch('http://localhost:3000/api/products')
  .then((response) => response.json()
  .then((kanap) => kanap.forEach((kanap, i) => {
    console.table(kanap);
    console.log(i);
    displayProducts(kanap);
  }))
  .catch((err) => {
    console.log ('Une erreur est survenue')
  })
  )};
nouvelArticle();


 /*
Function intégration front par js avec nom class fournit dans html commentaire,
 et exemple adresse du produit par id (Search param),
 on lit les enfants aux parents --> balise générique pour tpous les produits
 */


function displayProducts(kanap) {
const section = document.getElementById('items');
console.log(section);

const divParent = document.createElement('a');
divParent.href = './product.html?id=' + kanap._id;
console.log(divParent);

let article = document.createElement ('article');
console.log(article);

const name = document.createElement('h3');
name.classList.add('productName');
console.log(name);
name.innerHTML = kanap.name;

const img = document.createElement('img');
img.src = kanap.imageUrl;
img.alt = kanap.altTxt;
console.log(img);

let description = document.createElement('p');
description.classList.add('productDescription');
description.innerHTML = kanap.description;
console.log(description);

section.appendChild(divParent);
divParent.appendChild(article);
article.appendChild(img);
article.appendChild(name);
article.appendChild(description);
};


