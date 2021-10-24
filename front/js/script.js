//************En fait !!! crée des div et class (voir peut-être le style),PUIS Insert avec ci-dessus !***************//

/*
let allProducts = document.createElement('ul');//Tous les produits en tableau ul
allProducts.id = 'tabProduct';
document.getElementById('items').appendChild('tabProduct');
var article = document.createElement('li')//Div li des articles child de allProduct
article.id = 'theArticle';
document.getElementById('tabProduct').appendChild('article');
*/
function nouvelArticle() {
fetch('http://localhost:3000/api/products')
  .then((response) => response.json()
  .then((kanap) => kanap.forEach((kanap, i) => {
    console.log(kanap);
    console.log(i);
    displayProducts(kanap);//FONCTION A FAIRE ET DEFINIR
  }))
  .catch((err) => {
    console.log ('Une erreur est survenue')
  })
  )};
nouvelArticle();
 
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
}