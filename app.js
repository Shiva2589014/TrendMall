
// Fetching data from the API
// and displaying it on the page
let All = document.getElementById("All");
let Men_clothing = document.getElementById("Men_clothing");
let Women_clothing = document.getElementById("Women_clothing");
let Jewelery = document.getElementById("Jewelery");
let Electronics = document.getElementById("Electronics");
let productsContainer = document.getElementById("products");

All.addEventListener("click", function () {
  productsContainer.innerHTML = "";
  productdetails(jsondata);
});
let jsondata;
async function products() {
  let productdata = fetch("https://fakestoreapi.com/products");
  let data = await productdata;
  jsondata = await data.json();
  console.log(jsondata);
  productdetails(jsondata);
}
function productdetails(data) {
  data.map((product) => {
    let div = document.createElement("div");
    // productsContainer.innerHTML = " ";
    div.className = "product";
    div.innerHTML = `
    <div class="card text-center shadow-sm d-flex flex-column">
      <img src="${product.image}" class="card-img-top p-3 product-image" alt="${product.title}">
      <div class="card-body flex-grow-1 d-flex flex-column justify-content-between">
        <h5 class="card-title">${product.title.slice(0, 12)}...</h5>
        <p class="card-text">${product.description.slice(0, 90)}...</p>
      </div>
      <div class="product-price w-100 text-center border-top border-bottom p-2 fw-bold text-secondary">
        $${product.price}
      </div>
      <div class="card-footer bg-transparent d-flex justify-content-center">
        <button class="btn btn-dark  m-3">Details</button>
        <button class="btn btn-dark m-3">Add to Cart</button>
      </div>
    </div>
  `;
  
    productsContainer.appendChild(div);
  });
}

products();

Men_clothing.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let mendata = [];
  jsondata.map((product) => {
    if (product.category === Men_clothing.innerText.toLocaleLowerCase()) {
      mendata.push(product);
    }
  });
  productdetails(mendata);
});

Women_clothing.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) =>
  {
    return product.category === Women_clothing.innerText.toLocaleLowerCase()
  });

  productdetails(data);
});
Electronics.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) =>
  {
    return product.category === Electronics.innerText.toLocaleLowerCase()
  });

  productdetails(data);
});
Jewelery.addEventListener("click", function () {
  productsContainer.innerHTML = " ";
  let data = jsondata.filter((product) =>
  {
    return product.category === Jewelery.innerText.toLocaleLowerCase()
  });

  productdetails(data);
});
