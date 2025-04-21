
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
      <div class="p-4">
      <img src="${product.image}" alt="${product.title}" /></div>
      <section class="text-center"><h3>${product.title.slice(0,12)}...</h3>
      <p class="p-2">${product.description.slice(0, 90)}...</p></section>
      <p class="price p-2 border-bottom border-top">$${product.price}</p>
      <button class="mb-4">Details</button>
      <button>Add to Cart</button>
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
