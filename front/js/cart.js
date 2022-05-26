const itemCart = document.getElementById("cart__items");
var addProduct = JSON.parse(localStorage.getItem("panier"));

console.log(addProduct);


if (!addProduct || addProduct==[] || addProduct.length < 1) {
  itemCart.innerHTML = "<h3>Le Panier est vide<h3>"
}
else {
  itemCart.innerHTML = "";
  var globalPrice = 0;
  addProduct.forEach(produit => {
      

    fetch(`http://localhost:3000/api/products/${produit[0]}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let product = {
          'color': produit[1],
          'quantity': parseInt(produit[2]),
          'name': data.name,
          'price': data.price,
          'image': data.imageUrl,
          'id': produit[0],
        };

        itemCart.innerHTML += ` <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.image}" alt="Photographie d'un canapé ${product.id}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p id='productTotal'>${product.price * parseInt(product.quantity)} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" id="${product.id}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

        //Récupération des valeurs totales (prix et quantités)
        function productTotal() {

          // Quantité totale d'articles dans le Panier
          let produitQuantité = document.getElementsByClassName("itemQuantity");
          let produitlength = produitQuantité.length

          quantitéTotal = 0;
          quantitéItem = 0;

          for ( let i = 0; i < produitlength; i++) {
            quantitéTotal += produitQuantité[i].valueAsNumber;
            quantitéItem = produitQuantité[i].valueAsNumber;
          }

          let produitQuantitéTotal = document.getElementById("totalQuantity")
          produitQuantitéTotal.innerHTML = quantitéTotal;
          console.log(quantitéItem);
          console.log(quantitéTotal);

          //Prix total du panier


          for (let i = 0; i < produitQuantité.length; i++) {
            totalPrice = 0;
          totalPrice = product.price * product.quantity;
          console.log(totalPrice);
          }
          globalPrice += totalPrice;
          console.log(globalPrice);
          let produitPrixTotal = document.getElementById("totalPrice");
          produitPrixTotal.innerText = globalPrice;
        }
        productTotal();


        // Modifier la quantité d'un produit

        function modifQuantity() {
          const modifQuantity = document.querySelectorAll('.itemQuantity');
        
          for (let k = 0; k < modifQuantity.length; k++) {
            modifQuantity[k].addEventListener('change', function (event) {
              event.preventDefault();
        
              addProduct[k].quantity = event.target.value;
        
              if ( addProduct[k].quantity == 0 || addProduct[k].quantity > 100 ) {
                alert('Veuillez sélectionner une quantité valide');
                location.reload();
              } else {
                localStorage.setItem('panier', JSON.stringify(addProduct));
                globalPrice += 0;
                console.log(globalPrice);
                productTotal();
              }
            });
          }
        }
        modifQuantity();

        //Suppression d'un article du panier

        function deleteProduct() {
          const deleteBtn = document.getElementsByClassName("deleteItem");
          
          for (let l = 0; l < deleteBtn.length; l++) {
            const del = deleteBtn[l];
            del.addEventListener('click', () =>{
              addProduct.splice(l, 1);
              localStorage.setItem("panier", JSON.stringify(addProduct));
              location.reload();
            })
        }}
        
        deleteProduct();
        
        
              })
          });


//////////////////////////////// Formulaire ////////////////////////////////

let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegex = new RegExp( '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let adressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');


function getFormulaire() {

  let prenom = document.getElementById('firstName');
  prenom.addEventListener('input', function () {
    if (nameRegex.test(prenom.value) === false) {
      document.getElementById('firstNameErrorMsg').innerText = "format du prénom incorrect";
    }
    else {
      document.getElementById('firstNameErrorMsg').innerText = '';
    }
  });

  let nom = document.getElementById('lastName');
  nom.addEventListener('input', function () {
    if (nameRegex.test(nom.value) === false) {
      document.getElementById('lastNameErrorMsg').innerText = "format du nom incorrect";
    }
    else {
      document.getElementById('lastNameErrorMsg').innerText = '';
    }
  });

  let adresse = document.getElementById('city');
  adresse.addEventListener('input', function () {
    if (adressRegex.test(adresse.value) === false) {
      document.getElementById('cityErrorMsg').innerText = "format de l'adresse incorrect";
    }
    else {
      document.getElementById('adressErrorMsg').innerText = '';
    }
  });

  let ville = document.getElementById('city');
  ville.addEventListener('input', function () {
    if (nameRegex.test(ville.value) === false) {
      document.getElementById('cityErrorMsg').innerText = "format de la ville incorrect";
    }
    else {
      document.getElementById('cityErrorMsg').innerText = '';
    }
  });

  let email = document.getElementById('email');
  email.addEventListener('input', function () {
    if (emailRegex.test(email.value) === false) {
      document.getElementById('emailErrorMsg').innerText = "format de l'email incorrect";
    }
    else {
      document.getElementById('emailErrorMsg').innerText = '';
    }
  });
}
getFormulaire();

function confirmation() {
  const confirmBtn = document.getElementById('order');
  confirmBtn.addEventListener('click', (el) => {
    el.preventDefault();

    if (addProduct.length < 1) {
      alert ('Le panier est vide, veuillez ajouter un article pour valider la commande');
    }

    //Si le formulaire est non remplis correctement apres les tests ReGex, afficher une alerte
    else if (
      !nameRegex.test(firstName.value) ||
      !nameRegex.test(lastName.value) ||
      !emailRegex.test(email.value) ||
      !nameRegex.test(city.value) ||
      !adressRegex.test(address.value)  
      ) 
      {
      alert('Veuillez remplir tous les charmps du formulaire correctement')
    } else {
      //Création d'un tableau pour recuperer les ID des produits
      let productId = [];
      for (let m = 0; m < addProduct.length; m++) {
        productId.push(addProduct[m].idProduit);
      }

      //Création de l'objet contact avec les infos du formulaire + tableau productId inséré
      let order = {
        contact: {
          prenom: firstName.value,
          nom: lastName.value,
          adresse: address.value,
          ville: city.value,
          email: email.value,
        },
        produits: productId,
      };
      console.log(order);

      //On créé une constante qui contient la methode Post pour l'utiliser dans l'API
const options = {
  method: "POST",
  body: JSON.stringify(order),
  headers: {
      'Accept': 'application/json', 
      "Content-Type": "application/json" },
};
//On fait l'appel a L'api pour effectuer une requete de type POST avec la constante options
fetch(" http://localhost:3000/api/products/order", options)
.then((res) => res.json())
.then((data) => {
  const orderId = data.orderId;
  localStorage.clear();
  //Utilisation de l'URL pour affiché l'ID du produit
  window.location.href = 'confirmation.html'+'?orderId=' + orderId;
})

//Si une erreur est détectée
.catch((err) => {
  alert("Erreur survenue : " + err);
});

}
  }
  )}
confirmation();

}


