/*
(async function(){
  const articles = await getArticles()
  for (article of articles){
    const article =articles[i];
  }
});


function getArticles (){
return fetch("http://localhost:3000/api/products")
  .then(function(res) {
      return res.json();
  })
  .then(function(articles) {
    console.log(articles);
  })
  .catch(function(error) {
   alert('Une erreur est survenue')
  });
}

function displayArticle(article){
  const sectionElt = document.getElementById('items');
  //const cloneElt = var clone = document.importNode(templateElt.content, true);

cloneElt.getElementById('items').textContent = article.title;
cloneElt.getElementByClass('productName').textContent = article.title;


document.getElementById('main').appendChild(cloneElt);
};

Cette page présente l’ensemble des produits retournés par l’API.
Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de
sa description.
En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail
 */
/*let insertProduct = 0;
  

  let elt = document.getElementById("items");
  elt.classList.innerHTML();

console.log(insertProduct);

BOUT TEST*/

//Placer autant de produit que nécessaire dedans "automatiquement"
//QUI va OU




//************En fait !!! crée des div et class (voir peut-être le style),PUIS Insert avec ci-dessus !***************//

/*
let allProducts = document.createElement('ul');//Tous les produits en tableau ul
allProducts.id = 'tabProduct';
document.getElementById('items').appendChild('tabProduct');
var article = document.createElement('li')//Div li des articles child de allProduct
article.id = 'theArticle';
document.getElementById('tabProduct').appendChild('article');
*/
let url = http://localhost:3000/api/products;
fetch(url).then(response => 
  response.json().then(data) => {
    console.log(data);
    let allProducts = '<ul>';
    for (let product of data){
      allProducts += `<li></li>`
    }
    allProducts += `</ul>`;
  });

document.body.onloadstart;
let section = document.getElementById('items');
let newArticle = document.createElement ('article');//rattache section pour une div parent article

section.appendChild(newArticle);//rattache section pour une div parent article
let imgArticle = document.createElement ('pictureArticle');
imgArticle.setAttribute('img', 'picture_imgArticle');

let h3Article = document.createElement ('titleArticle');
h3Article.setAttribute('h3', 'H3_article');

let descriptionArticle = document.createElement ('paragrapheArticle');
descriptionArticle.setAttribute('p', 'p_descriptionArticle');

      //Mettre le atlttext, creation et placement appenChild
newArticle.appendChild(imgArticle);
newArticle.appendChild(h3Article);
newArticle.appendChild(descriptionArticle);


//boucle while pr importer le tableaux 
/*
while (section < 7) {
  section++;
  imgArticle++;
  h3Article++;
  descriptionArticle++;
}
*/