// load cart data from localStorage
let cartData = JSON.parse(localStorage.getItem("trendmall")) || [];
if (!Array.isArray(cartData)) cartData = [cartData];
cartData = cartData.map((item) => ({ ...item, quantity: item.quantity || 1 }));
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
  let totalQuantity = 0,
    totalPrice = 0,
    shipping = 30;
  cartData.forEach((i) => {
    totalQuantity += i.quantity;
    totalPrice += i.price * i.quantity;
  });
  summaryBox.innerHTML = `
    <div class="card shadow-sm p-3">
      <h5 class="border-bottom pb-2">Order Summary</h5>
      <p>Products (${totalQuantity})<span class="float-end">$${totalPrice.toFixed(
    2
  )}</span></p>
      <p>Shipping<span class="float-end">$${shipping.toFixed(2)}</span></p>
      <p class="fw-bold">Total Amount<span class="float-end">$${(
        totalPrice + shipping
      ).toFixed(2)}</span></p>
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
  <div class="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-4">
    
    <!-- Image and Title Side-by-Side -->
    <div class="d-flex align-items-center flex-shrink-0" style="min-width: 0;">
      <img src="${item.image}" class="product-img me-3" alt="${
      item.title
    }" style="width: 80px; height: auto;">
      <h5 class="mb-0 text-break">${item.title}</h5>
    </div>

    <!-- Quantity Controls -->
    <div class="w-100 w-md-50 text-center d-grid gap-2" 
         style="grid-template-columns: repeat(3, auto); justify-content: center; align-items: center;">
      
      <button class="btn" onclick="changeQuantity(${idx}, -1)">−</button>
      <span class="fw-bold px-3">${item.quantity}</span>
      <button class="btn" onclick="changeQuantity(${idx}, 1)">+</button>

     
      <div style="grid-column: 1 / -1;">
        <span>${item.quantity} × $${item.price.toFixed(2)}</span>
      </div>
    </div>

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
