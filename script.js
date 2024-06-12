let cart = [];

/**
 * Função para efetuar login do usuário
 */
function login() {
  const name = document.getElementById("login-name").value;
  const address = document.getElementById("login-address").value;
  const phone = document.getElementById("login-phone").value;
  const observations = document.getElementById("login-observations").value;

  if (!name || !address || !phone) {
    alert("Por favor, preencha Nome, Telefone e Endereço corretamente.");
    return;
  }

  // Armazenar informações do usuário no localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("address", address);
  localStorage.setItem("phone", phone);
  localStorage.setItem("observations", observations);

  showUserInfo();
  alert(`Bem-vindo, ${name}! Você está conectado.`);
  closeLoginPopup();
  window.location.href = "#cardapio"; // Redirecionar para o cardápio
}

/**
 * Função para exibir as informações do usuário
 */
function showUserInfo() {
  const name = localStorage.getItem("name");
  const loginSection = document.getElementById("login-section");
  const userInfoSection = document.getElementById("user-info-section");
  const userNameSpan = document.getElementById("user-name");

  if (name) {
    userNameSpan.textContent = name;
    loginSection.style.display = "none";
    userInfoSection.style.display = "block";
  } else {
    loginSection.style.display = "block";
    userInfoSection.style.display = "none";
  }
}

/**
 * Função para preencher os campos de login com as informações armazenadas
 */
function populateLoginFields() {
  document.getElementById("login-name").value =
    localStorage.getItem("name") || "";
  document.getElementById("login-address").value =
    localStorage.getItem("address") || "";
  document.getElementById("login-phone").value =
    localStorage.getItem("phone") || "";
  document.getElementById("login-observations").value =
    localStorage.getItem("observations") || "";
}

/**
 * Função para efetuar logout do usuário
 */
function logout() {
  localStorage.clear();
  showUserInfo();
  closeLoginPopup();
  closeUserInfoPopup();
}

/**
 * Função para adicionar item ao carrinho
 */
function addToCart(productName, price, quantityId) {
  const quantity = parseInt(document.getElementById(quantityId).value);

  const existingProduct = cart.find((item) => item.productName === productName);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ productName, price, quantity });
  }

  openCartPopup();
  displayCart();
}

/**
 * Função para exibir o carrinho
 */
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    cartItems.innerHTML += `<p>${item.productName} - R$ ${item.price} x ${item.quantity}</p>`;
    total += item.price * item.quantity;
  });

  document.getElementById(
    "cart-total"
  ).textContent = `Total: R$ ${total.toFixed(2)}`;
}

/**
 * Função para limpar o carrinho
 */
function clearCart() {
  cart = [];
  displayCart();
}

/**
 * Função para abrir/fechar o pop-up do carrinho
 */
function toggleCart() {
  const cartPopup = document.getElementById("cart-popup");
  const cartToggleBtn = document.querySelector(".cart-toggle");

  if (cartPopup.style.display === "none" || cartPopup.style.display === "") {
    cartPopup.style.display = "block";
    cartToggleBtn.textContent = "Minimizar Carrinho";
  } else {
    cartPopup.style.display = "none";
    cartToggleBtn.textContent = "Maximizar Carrinho";
  }
}

/**
 * Função para abrir o pop-up do carrinho
 */
function openCartPopup() {
  document.getElementById("cart-popup").style.display = "block";
}

/**
 * Função para enviar o pedido via WhatsApp
 */
function sendOrder() {
  const name = localStorage.getItem("name");
  const address = localStorage.getItem("address");
  const phone = localStorage.getItem("phone");

  if (!name || !address || !phone) {
    alert("Por favor, preencha Nome, Telefone e Endereço corretamente.");
    return;
  }

  if (cart.length === 0) {
    alert("Por favor, adicione ao menos um produto ao carrinho.");
    return;
  }

  const observations = localStorage.getItem("observations");
  let message = `Pedido de ${name} - ${address} - Tel: ${phone}:\n`;
  let total = 0;

  cart.forEach((item) => {
    message += `${item.productName} - R$ ${item.price} x ${item.quantity}\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: R$ ${total.toFixed(2)}`;

  if (observations) {
    message += `\nObservações: ${observations}`;
  }

  const phoneNumber = "21979026552";
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");
}

/**
 * Função para abrir o pop-up de login
 */
function openLoginPopup() {
  document.getElementById("overlay").style.display = "block";
}

/**
 * Função para fechar o pop-up de login
 */
function closeLoginPopup() {
  document.getElementById("overlay").style.display = "none";
}

/**
 * Função para abrir o pop-up de informações do usuário
 */
function openUserInfoPopup() {
  const userInfoPopup = document.getElementById("user-info-popup");
  userInfoPopup.style.display = "block";

  // Preencher o formulário com as informações do usuário
  const user = getUserInfo();
  if (user) {
    document.getElementById("username").value = user.name;
    document.getElementById("email").value = user.email;
  }
}

/**
 * Função para fechar o pop-up de informações do usuário
 */
function closeUserInfoPopup() {
  document.getElementById("user-info-popup").style.display = "none";
}

/**
 * Função para definir o estado de usuário conectado
 */
function setLoggedInState(user) {
  document.getElementById("login-menu-item").style.display = "none";
  document.getElementById("user-menu-item").style.display = "block";
  document.getElementById("user-name").textContent = user.name;

  // Salvar informações do usuário no localStorage
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Função para definir o estado de usuário desconectado
 */
function setLoggedOutState() {
  document.getElementById("login-menu-item").style.display = "block";
  document.getElementById("user-menu-item").style.display = "none";

  // Remover informações do usuário do localStorage
  localStorage.removeItem("user");
}

/**
 * Função para obter informações do usuário
 */
function getUserInfo() {
  return JSON.parse(localStorage.getItem("user"));
}

// Verificar se o usuário está conectado ao carregar a página
window.onload = function () {
  const user = getUserInfo();
  if (user) {
    setLoggedInState(user);
  }
  showUserInfo();
  populateLoginFields();
};

// Evento de submissão do formulário de informações do usuário
document
  .getElementById("user-info-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    // Lógica para salvar as informações do usuário
    closeUserInfoPopup();
  });
