/* Récupération de l''ID  */

const urlParams = window.location.href;
var params = new URL(urlParams);
let search_params = params.searchParams;
let id = search_params.get('id');

const myParam = async () => {

    await fetch(`http://localhost:3000/api/products/${id}`)
    /* création d'un .then avec comme paramètre une réponse traitée en JSON */
        .then((res) => res.json())
        .then((promise) => {

            search_params = promise;
            console.log(search_params);
        });
};

/* Fonction asynchrone pour attendre myParam et travailler avec ses réponses */
const loadProduct = async () => {
    await myParam();

    let item = document.getElementById('title');
            item.innerHTML = search_params.name;

        let price = document.getElementById('price');
            price.innerHTML = search_params.price;

        let description = document.getElementById('description');
            description.innerHTML = search_params.description;

        let item__img = document.getElementById('image');
            item__img.src = search_params.imageUrl;
        
        let colorSelector = document.getElementById('colors');

        search_params.colors.forEach(color => {
            const colorChoice = document.createElement('option')
            colorChoice.value = color
            colorChoice.innerHTML = color
            colorSelector.appendChild(colorChoice)
          })
};
loadProduct();

document.getElementById("addToCart").addEventListener('click', ajoutPanier);

/* Fonction pour ajouter les produits au panier */
function ajoutPanier() {

    /* Création des variables nécéssaires pour stocker les valeurs de la couleur et de la quantité */
    var valeurColor = document.getElementById("colors").value;
    var quantityItem = document.getElementById("quantity").value;
    var CartProduct = [ search_params._id,  valeurColor,  quantityItem, ];

     //Si la quantité est inférieur ou égal à zero affiché le message suivant 
     if (quantityItem <= 0) {
         alert('La quantité dois être strictement supérieur a zéro');
     }
    
     //Sinon vérifier la couleur
     else {

        if (valeurColor == "") {
            alert('La couleur doit être choisis');
         }

         //Sinon créer 2 variable 

         
        else {

            // On initialise le local storage
    let panier = JSON.parse(localStorage.getItem("panier"));
         
            //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (panier) {
        const resultFind = panier.find(
            (el) => el._id == search_params._id && el.colorChoice == search_params.valeurColor);
            //Si le produit commandé est déjà dans le panier
            if (resultFind) {
                let newQuantite = parseInt(CartProduct.quantityItem) + parseInt(resultFind.quantityItem);
                resultFind.quantityItem = newQuantite;
                localStorage.setItem("panier", JSON.stringify(panier));
                console.log(panier);
            //Si le produit commandé n'est pas dans le panier
            } else {
                panier.push(CartProduct);
                localStorage.setItem("panier", JSON.stringify(panier));
                console.log(panier);
            }
        //Si le panier est vide
        } else {
            panier =[];
            panier.push(CartProduct);
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log(panier);
        }
        if (confirm("Votre produit a été ajouté au panier, voulez vous continuer dans votre panier ?") == true) {
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        }};
        };
}
    