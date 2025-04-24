// load cart data from localStorage
let cartData = JSON.parse(localStorage.getItem("trendmall")) || [];
if (!Array.isArray(cartData)) cartData = [cartData];
cartData = cartData.map(item => ({ ...item, quantity: item.quantity || 1 }));
const productContainer = document.getElementById("product");
let maincart = document.getElementById("maincart");
// check if cart is empty

if (cartData.length === 0) {
maincart.innerHTML = `
<div class="text-center mb-5 p-4 bg-light">
  <h2>Your Cart is Empty</h2>
  <a href="./product.html" class="btn btn-outline-dark mt-3">
    <i class="fas fa-arrow-left"></i> Continue Shopping
  </a>
</div>
`;
}


// update cart count
const cartCount = document.getElementById("Cart");
 cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i>Cart(${cartData.length})`;
// update summary
function updateSummary() {
  const summaryBox = document.getElementById("summary");
  let totalQuantity = 0, totalPrice = 0, shipping = 30;
  cartData.forEach(i => {
    totalQuantity += i.quantity;
    totalPrice += i.price * i.quantity;
  });
  summaryBox.innerHTML = `
    <div class="card shadow-sm">
      <h5>rder Summary</h5>
      <hr class=" border-bottom">
     <div class="d-flex justify-content-between">
      <p>Products (${totalQuantity})<span class="float-end">$${totalPrice.toFixed(2)}</span></p>
      <p>Shipping<span class="float-end">$${shipping.toFixed(2)}</span></p>
      <p class="fw-bold">Total Amount<span class="float-end">$${(totalPrice + shipping).toFixed(2)}</span></p>
      <button class="btn btn-dark w-100 mt-2">Go to checkout</button>
      </div>
    </div>
  `;
}

function updateSummary() {
  const summaryBox = document.getElementById("summary");
  let totalQuantity = 0, totalPrice = 0, shipping = 30;
  cartData.forEach(i => {
    totalQuantity += i.quantity;
    totalPrice += i.price * i.quantity;
  });
  summaryBox.innerHTML = `
    <div class="card shadow-sm p-3">
      <h5 class="border-bottom pb-2">Order Summary</h5>
      <p>Products (${totalQuantity})<span class="float-end">$${totalPrice.toFixed(2)}</span></p>
      <p>Shipping<span class="float-end">$${shipping.toFixed(2)}</span></p>
      <p class="fw-bold">Total Amount<span class="float-end">$${(totalPrice + shipping).toFixed(2)}</span></p>
      <button class="btn btn-dark w-100 mt-2">Go to checkout</button>
    </div>
  `;
}

function renderCartItems() {
  productContainer.innerHTML = "";
  
if (cartData.length === 0) {
    maincart.innerHTML = `
    <div class="text-center mb-5 p-4 bg-light">
      <h2>Your Cart is Empty</h2>
      <a href="./product.html" class="btn btn-outline-dark mt-3">
        <i class="fas fa-arrow-left"></i> Continue Shopping
      </a>
    </div>
    `;
    }

  cartData.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item shadow-sm";
    div.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" class="product-img me-3" alt="${item.title}">
        <div class="flex-grow-1">
          <h6>${item.title}</h6>
        </div>
        <div class="d-flex align-items-center">
          <button class="quantity-btn p-5" onclick="changeQuantity(${idx}, -1)">−</button>
          <span class="m5-2">${item.quantity}</span>
          <button class="quantity-btn p-5" onclick="changeQuantity(${idx}, 1)">+</button>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <span>${item.quantity} x $${item.price.toFixed(2)}</span>
      </div>
    `;
    productContainer.appendChild(div);
  });
  updateSummary();
  localStorage.setItem("trendmall", JSON.stringify(cartData));
}

function changeQuantity(index, delta) {
  cartData[index].quantity += delta;
  if (cartData[index].quantity <= 0) {
    cartData.splice(index, 1);
  }
  renderCartItems();
}

// initial render
renderCartItems();