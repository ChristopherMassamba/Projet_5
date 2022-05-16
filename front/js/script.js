/* création d'une variable avec un tableau vide */
let produitKanap = [];

/* création d'une requete fetch pour récuperer les données vers une API */
const fetchProduit = async () => {
    /* ajouter await pour attendre d'aller chercher la requete dans le serveur */
    await fetch("http://localhost:3000/api/products")
    /* création d'un .then avec comme paramètre une réponse traitée en JSON */
        .then((res) => res.json())
        .then((promise) => {
            /* on stock notre tableau dans notre tableau vide */
            produitKanap = promise;
            console.log(produitKanap);
        });
};

/* fonction asynchrone pour attendre fetchProduit pour pouvoir travailler avec ses réponses */
const produitDisplay = async () => {
    await fetchProduit();

    /* getElementById pour aller chercher les éléments dans le Dom */
    document.getElementById("items").innerHTML = produitKanap.map((product) => `
        <div id="items${product._id}" class="cart"> 
            <a href="./product.html?id=${product._id}">
                <article>
                <img src="${product.imageUrl}" alt="Image du canapé ${product.name}"/>
                <h3 class="productName">${product.name.toUpperCase()}</h3>
                <p class="productDescription">${product.description}</p>
                <p>${product.price} €</p>
                </article>
            </a>
        </div>
    `)
    /* .join pour enlever les guillemets autour des images */
    .join("");
};

produitDisplay();