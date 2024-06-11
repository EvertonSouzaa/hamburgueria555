// function sendToWhatsApp(product, price) {
//   const phoneNumber = "5521979026552"; // Substitua pelo número de telefone desejado no formato internacional
//   const message = `Olá, gostaria de mais informações sobre o produto ${product} que custa ${price}.`;
//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
//     message
//   )}`;

//   window.open(whatsappURL, "_blank");
// }

let total = 0;
let cart = [];

function increaseQuantity(id) {
  const quantityInput = document.getElementById(id);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity(id) {
  const quantityInput = document.getElementById(id);
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

function addToCart(productName, productPrice, quantityId) {
  const quantity = parseInt(document.getElementById(quantityId).value);
  const itemTotal = productPrice * quantity;
  total += itemTotal;
  // document.getElementById("total").innerText = total
  //   .toFixed(2)
  //   .replace(".", ",");
  // alert(
  //   `${productName} adicionado ao carrinho. Quantidade: ${quantity}, Total: R$ ${itemTotal
  //     .toFixed(2)
  //     .replace(".", ",")}`
  // );

  cart.push({ productName, productPrice, quantity });
  localStorage.setItem("cart", JSON.stringify(cart));
  // alert(
  //   `${productName} adicionado ao carrinho. Quantidade: ${quantity}, Total: R$ ${itemTotal
  //     .toFixed(2)
  //     .replace(".", ",")}`
  // );
  const phoneNumber = "5521979026552";
  const message = `Eu quero ${quantity} ${productName}, a unidade saí R$${productPrice
    .toFixed(2)
    .replace(".", ",")}, e o total do pedido é R$${itemTotal
    .toFixed(2)
    .replace(".", ",")}.`;
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
}
function viewCart() {
  window.open("./pages/cart.html", "_blank");
}
