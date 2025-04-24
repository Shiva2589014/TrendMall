


let cartData = JSON.parse(localStorage.getItem("trendmall")) || [];
const cartCount = document.getElementById("Cart");
 cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i>Cart(${cartData.length})`;

