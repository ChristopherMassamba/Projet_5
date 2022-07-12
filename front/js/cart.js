const cartItems = document.getElementById("cart__items");
var productSaved = JSON.parse(localStorage.getItem('productCart'));
//On crée la fonction qui affiche les produits , la quantité et le prix total de chaque produit
function productCartDisplay() {

    //Si le localStorage est null ou vide
    if (productSaved === null || productSaved === [] || productSaved.length < 1) {
        //Alors on affiche un productCart vide
        cartItems.innerHTML = '<h3>Votre panier est vide.</h3>';
        calculPrixTotal();
    } else {
        //On vide le contenue de la section cart__items
        cartItems.innerHTML = "";


                    //On remplis la section cart__items et remplis avec la variable précédemment créé
                    let article = document.createElement('article');
                    document.querySelector('#cart__items').appendChild(article);
                    article.classList.add('cart__item');
                    article.dataset.id = product._id;
                    article.dataset.color = product.color;

                    //creation de la div img
                    let divImage = document.createElement('div');
                    article.appendChild(divImage);
                    divImage.classList.add('cart__item__img');

                    //Insertion de l'image dans la div img
                    let imageInDiv = document.createElement('img');
                    divImage.appendChild(imageInDiv);
                    imageInDiv.src = product.imgUrl;
                    imageInDiv.alt = product.imgAlt;

                    //creation de la div cart__item__content
                    let divContent = document.createElement('div');
                    article.appendChild(divContent);
                    divContent.classList.add('cart__item__content');

                    //creation de la div cart__item__content__description dans cart__item__content
                    let divContentDescription = document.createElement('div');
                    divContent.appendChild(divContentDescription);
                    divContentDescription.classList.add('cart__item__content__description');

                    //creation du h2 dans cart__item__content__description
                    let divContentDescriptionH2 = document.createElement('h2');
                    divContentDescription.appendChild(divContentDescriptionH2);
                    divContentDescriptionH2.textContent = product.name;

                    //creation du <p></p> pour la color
                    let divContentDescriptionP = document.createElement('p');
                    divContentDescription.appendChild(divContentDescriptionP);
                    divContentDescriptionP.textContent = product.color;

                    //creation du <p></p> pour le prix
                    const retrieveItemPrice = (product) =>
                    fetch(`http://localhost:3000/api/products/${product.id}`)
                        .then((res) => res.json())
                        .then((data) => data.price)
                        .catch((err) => console.log("Watch out, there is an error :", err));
                    let itemPrice = parseInt(await retrieveItemPrice(product));
                        const itemPriceDisplay = element.closest("div.cart__item__content")
                        .childNodes[0].childNodes[2];
                        itemPriceDisplay.textContent = `${itemPrice * inputQuantity} €`;
                    

                    //creation de la div cart__item__content__settings dans la div cart__item__content
                    let divContentSettings = document.createElement('div');
                    divContent.appendChild(divContentSettings);
                    divContentSettings.classList.add('cart__item__content__settings');

                    //creation de la div class="cart__item__content__settings__quantity
                    let divContentSettingsQuantity = document.createElement('div');
                    divContentSettings.appendChild(divContentSettingsQuantity);
                    divContentSettingsQuantity.classList.add(
                        'cart__item__content__settings__quantity'
                    );

                    //creation du p dans la div cart__item__content__settings__quantity
                    let divContentSettingsQuantityP = document.createElement('p');
                    divContentSettingsQuantity.appendChild(divContentSettingsQuantityP);
                    divContentSettingsQuantityP.textContent = 'Qté :';

                    //création de <input>
                    let inputQuantity = document.createElement('input');
                    divContentSettingsQuantity.appendChild(inputQuantity);
                    inputQuantity.setAttribute('type', 'number');
                    inputQuantity.classList.add('itemQuantity');
                    inputQuantity.setAttribute('name', 'itemQuantity');
                    inputQuantity.setAttribute('min', '1');
                    inputQuantity.setAttribute('max', '100');
                    inputQuantity.value = product.quantity;

                    //création de la div cart__item__content__settings__delete
                    let itemDelete = document.createElement('div');
                    divContentSettings.appendChild(itemDelete);
                    itemDelete.classList.add('cart__item__content__settings__delete');

                    let itemDeleteP = document.createElement('p');
                    itemDelete.appendChild(itemDeleteP);
                    itemDeleteP.classList.add('deleteItem');
                    itemDeleteP.textContent = 'Supprimer';
                
                    }
                }
        




//Création d'une fonction qui calcul le prix total du panier
function calculPrixTotal() {
    //On attribut une valeur numérique de départ(donc 0) a total et qteTotal
    let prixTotal = 0;
    let qteTotal = 0;
    //On tranforme le JSON en valeur Javascript
    productSaved = JSON.parse(localStorage.getItem('productCart'));
    productSaved.forEach(oneProduct => {
        //On fait un appel a l'api avec une promesse , comme précédemment fait (avec l'ID en fin)
        fetch(`http://localhost:3000/api/products/${oneProduct.id}`)
            .then(item => item.json())
            .then(data => {
                //On multiplie le prix et la quantité et on addtionne avec le total
                prixTotal += data.price * parseInt(oneProduct.quantity);
                console.log(prixTotal);
                try {
                    //Ici , on capture dans le dom "productPrice" on l'additionne avec productId et on le couple avec la couleur égale au prix fois 
                    //la quantite(on le transforme en chiffre) plus l'insigne euro
                    document.getElementsByClassName('divContentDescriptionPrice').textContent = (data.price * parseInt(oneProduct.quantity)) + " €";
                } catch (error) { console.log(error) }
                qteTotal += parseInt(oneProduct.quantity);
                console.log(qteTotal);
                //On insére le prix total dans le dom 
                document.getElementById('totalPrice').textContent = prixTotal;
                //ici la quantité total
                document.getElementById('totalQuantity').textContent = qteTotal;
            })
            if (productSaved < 1) {
                document.getElementById('totalPrice').textContent = 0;
                document.getElementById('totalQuantity').textContent = 0;
            }
    });
}

//Création d'une fonction pour le changement de la quantité
function changeQuantite() {
    //On selectionne la classe itemQuantity
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    //On execute la fonction qu'on vas crée pour chaque element du tableau avec forEach
    quantityInputs.forEach(input => {
        //On lui attribut un event Listener avec l'attribut change en tant qu'event pour actionner le callback si un changement au niveau de l'input est fait
        input.addEventListener('change', () => {
            //On crée une constante avec closest a l'interieur , ca permet de selectionner l'element le plus proche
            const articleToRemove = input.closest('article');
            //On récuperer l'atribut data-id et data-color, avec getAttribute
            const idProductToChange = articleToRemove.getAttribute('data-id');
            const colorProductToChange = articleToRemove.getAttribute('data-color');
            // On crée un tableau vide;
            let finalProductSave = [];
            productSaved.forEach(product => {
                //Si le l'id du produit est strictement égale a l'attribut data-id et si la couleur du produit et strictement egale a l'atribut data-color
                if (product.id === idProductToChange && product.color === colorProductToChange) {
                    //Si l'input Value est inferieur a zero
                    if (input.value < 0) {
                        //Alors on pousse le produit dans le tableau  mais on ne met pas a jour la quantité
                        finalProductSave.push(product);
                        //On alerte l'utilisateur qu'il faut absolument mettre une quantité superieur a zero
                        alert("la quantite doit etre supérieure ou égale à zéro");
                        //Si l'utilisateur indique une quantité de zero alors le produit est tout simplement supprimé 
                    } else if (input.value == 0) {
                        //On selectione l'article le plus proche avec articleToRemove et on le supprime avec le .remove dans le DOM
                        articleToRemove.remove();
                    } else {
                        //Autrement si le produit et baisser ou augmente , alors on met a jour la quantité et on le pousse dans le tableau 
                        product.quantity = input.value;
                        finalProductSave.push(product);
                    }
                } else {
                    //Si l'id ne corresponds pas a l'id de Data-ID ni la couleur de data-color alors on pousse sans rien changé , donc identique
                    finalProductSave.push(product);
                }
                //On met a jour les valeurs  localStorage dans le tableau crée
                localStorage.setItem(('productCart'), JSON.stringify(finalProductSave));
                //On appel la fonction calculprixTotal , pour recalculer si il y a eu un changement dans la quantité ou non
                calculPrixTotal();
            });
        })
    })
}

//Fonction pour supprimer un produit du productCart
function deleteProduct() {
    //On selectionne deleteItem dans le DOM
    const deleteBtns = document.querySelectorAll('.deleteItem');
    deleteBtns.forEach(btn => {
        //On ajout l'evenement click suivi du callBack
        btn.addEventListener('click', () => {
            //Ici même procéder que sur le changement de la quantité , on selectionne l'élement le plus proche
            const articleToRemove = btn.closest('article');
            //On récuperer l'atribut data-id et data-color, avec getAttribute
            const idProductToDelete = articleToRemove.getAttribute('data-id');
            const colorProductToDelete = articleToRemove.getAttribute('data-color');
            //On tranforme le JSON en valeur Javascript
            productSaved = JSON.parse(localStorage.getItem('productCart'));
            let finalProductSave = [];
            productSaved.forEach(product => {
                //Si le produit égale a l'id du produit dans data-id ou la couleur et égale à la couleur du produit dans data-color
                if (product.id === idProductToDelete && product.color === colorProductToDelete) {
                    //Alors on supprime l'article désigné
                    articleToRemove.remove();
                    localStorage.removeItem(idProductToDelete, colorProductToDelete);
                    alert("Le produit a bien été supprimé du panier")
                } else {
                    //Autrement rien ne change 
                    finalProductSave.push(product);
                }
            });
            //Si on supprime le dernier article du panier
            if (finalProductSave === null || finalProductSave === [] || finalProductSave.length < 1) {
                //Alors on affiche un productCart vide
                cartItems.innerHTML = '<h3>Votre panier est vide.</h3>';
            }
            console.log(finalProductSave);
            //On met a jour les valeurs  localStorage dans le tableau crée
            localStorage.setItem(('productCart'), JSON.stringify(finalProductSave));
            productSaved = JSON.parse(localStorage.getItem('productCart'));
            //On recalcule le prix total
            calculPrixTotal();
        });
    })
}


//////////FORMULAIRE//////////

    //On créé des Regex spécifique 
    let regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    let regexAdress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let regexCity = new RegExp("^[a-zA-Z ,.'-]+$")
    let regexName = new RegExp("^[a-zA-Z ,.'-]+$");
    let regexLastname = new RegExp("^[a-zA-Z ,.'-]+$");

    //On récupère les ID correspondant aux éléments nécéssaires à l'envoie du formulaire
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let adress = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

//On créé une variable qui permet de vérifier les champs et d'indiquer une erreur si les champs sont mal remplis
function formCheck() {

    ////On lui attribut un event Listener avec l'attribut "change" qui appelle les fonctions suivante et qui active le check de chaque champs
    firstName.addEventListener('change', function () {
        firstNameCheck(this)
    });

    lastName.addEventListener('change', function () {
        lastNameCheck(this)
    });

    adress.addEventListener('change', function () {
        adressCheck(this)
    });

    city.addEventListener('change', function () {
        cityCheck(this)
    });

    email.addEventListener('change', function () {
        emailCheck(this)
    });
    //Fonction qui contient une boucle qui permet de verifier via le regex si le champs est bien remplis avec les bon caractéres 
    function firstNameCheck(firstName) {
        let errorFirstName = document.getElementById("firstNameErrorMsg")
        if (regexName.test(firstName.value)) {
            errorFirstName.innerHTML = '';
        }
        //Sinon il affiche un message d'erreur dans le champs html error
        else {
            errorFirstName.innerHTML = 'Veuillez entrer votre prénom (uniquement en lettre)'       
        }
    };

    function lastNameCheck(lastName) {
        let errorLastName = document.getElementById("lastNameErrorMsg")
        if (regexLastname.test(lastName.value)) {
            errorLastName.innerHTML = '';
        }
        else { errorLastName.innerHTML = 'Veuillez entrer votre nom (uniquement en lettre)' }
    }

    function adressCheck(adress) {
        let errorAdress = document.getElementById("addressErrorMsg");
        if (regexAdress.test(adress.value)) {
            errorAdress.innerHTML = ''
        }
        else { errorAdress.innerHTML = 'Veuillez entrer votre adresse (ex:12 Rue Dupont)' }
    }

    function cityCheck(city) {
        let errorCity = document.getElementById("cityErrorMsg");
        if (regexCity.test(city.value)) {
            errorCity.innerHTML = ''
        }
        else { errorCity.innerHTML = 'Veuillez entrer votre ville (ex:  Marseille)' }
    }


    function emailCheck(email) {
        let errorEmail = document.getElementById("emailErrorMsg");
        if (regexEmail.test(email.value)) {
            errorEmail.innerHTML = ''
        }
        else { errorEmail.innerHTML = 'Veuillez entrer votre email (ex:Jean.Dupont@live.fr)' }
    }

}
formCheck()

//On créer une fonction permettant la validation du formulaire pour envoyer l'utilisateur vers la page confirmation
function formValidator(){

//On crée un addEventListener au click la fonction suivante se déclenche
document.getElementById("order").addEventListener("click", (e) =>{
    e.preventDefault();
    if (productSaved === null || productSaved === [] || productSaved.length < 1) {
        alert("Le panier est vide, veuillez ajouter des articles pour confirmer la commande");
    }
    else if (
        !regexName.test(firstName.value) ||
        !regexLastname.test(lastName.value) ||
        !regexEmail.test(email.value) ||
        !regexCity.test(city.value) ||
        !regexAdress.test(adress.value)
      ) {
        alert('Veuillez remplir correctement tous les champs du formulaire');
      }
    
    else {
//Création d'un tableau vide
let productFinal = [];
//On crée l'array depuis productSaved(localStorage)
for (let i in productSaved){
productFinal.push(productSaved[i].id);}

//on Créé une constante ou contenant l'objet contact et products (qui correspond au tableau productFinal)
const order = {
    contact : {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adress.value,
        city: city.value,
        email: email.value,
    },
    products: productFinal,
} ;
//On créé une constante qui contient la methode Post pour l'utiliser dans l'API
const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
        'Accept': 'application/json', 
        "Content-Type": "application/json" },
  };
//On fait l'appel a L'api pour effectuer une requete de type POST avec la constante options
  fetch("http://127.0.1:3000/api/products/order", options)
  .then((response) => response.json())
  .then((data) => {
    //On vide le local storage
    localStorage.clear();
    //Utilisation de l'URL pour afficher l'ID du produit
    document.location.href = "confirmation.html?orderId="+data.orderId;
  })
  .catch((err) => {
    alert("Erreur survenue : " + err);
  });
}})
}

formValidator();

// ======================= Affichage de la page ======================= //
const pageBuilder = async () => {
    /**  Recuperer les items dans le local storage **/
    currentProduct = JSON.parse(localStorage.productCart);
    /**  Créer 1 item à la fois dans le DOM **/
    for (let i = 0; i < currentProduct.length; i++) {
      const element = currentProduct[i];
      await imageInDiv(element);
      await createItem(element);
    }
  };