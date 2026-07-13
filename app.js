const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const products = [
  {
    id: "classic",
    category: "Hamburgueres",
    title: "The Classic",
    description: "90g na chapa, queijo, salada fresca e molho da casa.",
    price: 32,
    image: "assets/classic-burger.jpg",
    editable: true,
    breads: ["Brioche", "Australiano", "Apimentado"],
    meats: [
      { label: "90g", price: 0 },
      { label: "180g duplo", price: 12 },
    ],
  },
  {
    id: "smash",
    category: "Hamburgueres",
    title: "Smash",
    description: "60g prensado, crosta intensa, queijo derretido e brioche.",
    price: 26,
    image: "assets/smash-burger.jpg",
    editable: true,
    breads: ["Brioche"],
    meats: [
      { label: "60g", price: 0 },
      { label: "120g duplo", price: 10 },
    ],
  },
  {
    id: "veggie",
    category: "Hamburgueres",
    title: "The Veggie",
    description: "Burger vegano, pao vegano, folhas e molho vegetal.",
    price: 34,
    image: "assets/combo-burgers.jpg",
    editable: true,
    breads: ["Vegano"],
    meats: [{ label: "Vegano", price: 0 }],
  },
  {
    id: "batata-p",
    category: "Aperitivos",
    title: "Batata Rustica P",
    description: "Batata rustica crocante com tempero da casa.",
    price: 20,
    image: "assets/classic-burger.jpg",
  },
  {
    id: "batata-g",
    category: "Aperitivos",
    title: "Batata Rustica G",
    description: "Porcao grande para dividir durante o show.",
    price: 24,
    image: "assets/combo-burgers.jpg",
  },
  {
    id: "wings",
    category: "Aperitivos",
    title: "Chicken Wings",
    description: "Asinhas douradas com molho levemente picante.",
    price: 29,
    image: "assets/smash-burger.jpg",
  },
  {
    id: "espetinho-carne",
    category: "Aperitivos",
    title: "Espetinho de Carne",
    description: "Espetinho grelhado para beliscar sem pressa.",
    price: 16,
    image: "assets/food-truck-night.jpg",
  },
  {
    id: "ipa",
    category: "Cervejas Artesanais",
    title: "IPA 300ml",
    description: "Amargor presente, aroma intenso e final seco.",
    price: 18,
    image: "assets/hero-burger-beer.jpg",
  },
  {
    id: "pilsen",
    category: "Cervejas Artesanais",
    title: "Pilsen 300ml",
    description: "Clara, leve e gelada para acompanhar o burger.",
    price: 16,
    image: "assets/hero-burger-beer.jpg",
  },
  {
    id: "corona",
    category: "Bebidas",
    title: "Corona Long Neck",
    description: "Long neck gelada.",
    price: 14,
    image: "assets/hero-burger-beer.jpg",
  },
  {
    id: "heineken",
    category: "Bebidas",
    title: "Heineken Long Neck",
    description: "Long neck gelada.",
    price: 14,
    image: "assets/hero-burger-beer.jpg",
  },
  {
    id: "delvalle-uva",
    category: "Bebidas",
    title: "Del Valle Uva",
    description: "Suco gelado.",
    price: 8,
    image: "assets/food-truck-night.jpg",
  },
  {
    id: "mate-limao",
    category: "Bebidas",
    title: "Mate Limao",
    description: "Mate gelado com limao.",
    price: 8,
    image: "assets/food-truck-night.jpg",
  },
  {
    id: "agua",
    category: "Bebidas",
    title: "Agua",
    description: "Com gas ou sem gas, confirme na retirada.",
    price: 6,
    image: "assets/food-truck-night.jpg",
  },
];

let cart = [];
let activeProduct = null;

const categories = [...new Set(products.map((item) => item.category))];
const menuSections = document.querySelector("#menu-sections");
const categoryTabs = document.querySelector("#category-tabs");
const cartFab = document.querySelector("#cart-fab");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartDrawer = document.querySelector("#cart-drawer");
const closeCart = document.querySelector("#close-cart");
const cartList = document.querySelector("#cart-list");
const drawerTotal = document.querySelector("#drawer-total");
const editModal = document.querySelector("#edit-modal");
const closeModal = document.querySelector("#close-modal");
const customForm = document.querySelector("#custom-form");
const breadOptions = document.querySelector("#bread-options");
const meatOptions = document.querySelector("#meat-options");
const meatField = document.querySelector("#meat-field");
const comboOption = document.querySelector("#combo-option");
const itemNote = document.querySelector("#item-note");
const customPrice = document.querySelector("#custom-price");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const phoneForm = document.querySelector("#phone-form");
const phoneInput = document.querySelector("#phone");
const sendOrder = document.querySelector("#send-order");
const successModal = document.querySelector("#success-modal");
const successTitle = document.querySelector("#success-title");
const successCopy = document.querySelector("#success-copy");
const newOrder = document.querySelector("#new-order");

function money(value) {
  return BRL.format(value);
}

function slug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function renderTabs() {
  categoryTabs.innerHTML = categories
    .map((category, index) => {
      const id = slug(category);
      return `<button class="${index === 0 ? "active" : ""}" data-target="${id}" type="button">${category}</button>`;
    })
    .join("");
}

function renderMenu() {
  menuSections.innerHTML = categories
    .map((category) => {
      const items = products.filter((item) => item.category === category);
      return `
        <section class="menu-section" id="${slug(category)}">
          <div class="section-title">
            <h3>${category}</h3>
            <span>${items.length} itens</span>
          </div>
          <div class="product-grid">
            ${items.map(renderProduct).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderProduct(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.title}" loading="lazy" />
      <div class="product-body">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <div class="product-meta">
          <strong class="price">${money(product.price)}</strong>
          <div class="product-actions">
            <button type="button" data-add="${product.id}">+1</button>
            ${product.editable ? `<button class="secondary" type="button" data-edit="${product.id}">Editar</button>` : ""}
          </div>
        </div>
      </div>
    </article>
  `;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function updateCartUI() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `${quantity} ${quantity === 1 ? "item" : "itens"}`;
  cartTotal.textContent = money(getCartTotal());
  drawerTotal.textContent = money(getCartTotal());

  if (!cart.length) {
    cartList.innerHTML = `<div class="empty-cart">Seu carrinho ainda esta vazio. Escolha um burger ou uma bebida para comecar.</div>`;
    sendOrder.disabled = true;
    return;
  }

  sendOrder.disabled = false;
  cartList.innerHTML = cart
    .map((item) => {
      const details = [item.bread && `Pao ${item.bread}`, item.meat, item.combo && "Batata combo", item.note && `Obs.: ${item.note}`]
        .filter(Boolean)
        .join(" | ");
      return `
        <article class="cart-item">
          <div class="cart-item-top">
            <div>
              <h3>${item.title}</h3>
              <p>${details || "Receita padrao"}</p>
            </div>
            <strong>${money(item.unitPrice * item.quantity)}</strong>
          </div>
          <div class="qty-row">
            <div class="qty-controls" aria-label="Quantidade">
              <button type="button" data-dec="${item.key}">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-inc="${item.key}">+</button>
            </div>
            <button class="remove-button" type="button" data-remove="${item.key}">Excluir</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(product, options = {}) {
  const unitPrice = product.price + (options.meatPrice || 0) + (options.combo ? 14 : 0);
  const item = {
    key: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    productId: product.id,
    title: product.title,
    unitPrice,
    quantity: 1,
    bread: options.bread || product.breads?.[0],
    meat: options.meat || product.meats?.[0]?.label,
    combo: Boolean(options.combo),
    note: options.note || "",
  };

  cart.push(item);
  updateCartUI();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

function openModal(product) {
  activeProduct = product;
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  comboOption.checked = false;
  itemNote.value = "";

  breadOptions.innerHTML = product.breads
    .map((bread, index) => `<label><input type="radio" name="bread" value="${bread}" ${index === 0 ? "checked" : ""} />${bread}</label>`)
    .join("");

  meatOptions.innerHTML = product.meats
    .map((meat, index) => {
      const extra = meat.price ? ` + ${money(meat.price)}` : "";
      return `<label><input type="radio" name="meat" value="${meat.label}" data-price="${meat.price}" ${index === 0 ? "checked" : ""} />${meat.label}${extra}</label>`;
    })
    .join("");

  meatField.hidden = product.meats.length <= 1;
  updateCustomPrice();
  editModal.classList.add("open");
  editModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeEditModal() {
  editModal.classList.remove("open");
  editModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function updateCustomPrice() {
  if (!activeProduct) return;
  const meatInput = customForm.querySelector('input[name="meat"]:checked');
  const meatPrice = Number(meatInput?.dataset.price || 0);
  const total = activeProduct.price + meatPrice + (comboOption.checked ? 14 : 0);
  customPrice.textContent = money(total);
}

function showSuccess() {
  const nextNumber = Number(localStorage.getItem("tpt-order-number") || "0") + 1;
  localStorage.setItem("tpt-order-number", String(nextNumber));
  const phone = localStorage.getItem("tpt-phone") || phoneInput.value || "telefone nao informado";
  successTitle.textContent = `Pedido #${String(nextNumber).padStart(2, "0")}`;
  successCopy.textContent = `Pedido vinculado ao celular ${phone}. Nesta versao, o envio para a cozinha ainda esta simulado.`;
  successModal.classList.add("open");
  successModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function resetOrder() {
  cart = [];
  updateCartUI();
  closeCartDrawer();
  successModal.classList.remove("open");
  successModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

phoneForm.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem("tpt-phone", phoneInput.value.trim());
  document.querySelector("#hamburgueres").scrollIntoView({ behavior: "smooth" });
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  categoryTabs.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  document.querySelector(`#${button.dataset.target}`).scrollIntoView({ behavior: "smooth" });
});

menuSections.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const editButton = event.target.closest("[data-edit]");

  if (addButton) {
    const product = products.find((item) => item.id === addButton.dataset.add);
    addToCart(product);
  }

  if (editButton) {
    const product = products.find((item) => item.id === editButton.dataset.edit);
    openModal(product);
  }
});

cartList.addEventListener("click", (event) => {
  const inc = event.target.closest("[data-inc]");
  const dec = event.target.closest("[data-dec]");
  const remove = event.target.closest("[data-remove]");
  const key = inc?.dataset.inc || dec?.dataset.dec || remove?.dataset.remove;
  const item = cart.find((entry) => entry.key === key);

  if (!item) return;

  if (inc) item.quantity += 1;
  if (dec) item.quantity = Math.max(1, item.quantity - 1);
  if (remove) cart = cart.filter((entry) => entry.key !== key);

  updateCartUI();
});

customForm.addEventListener("change", updateCustomPrice);

customForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bread = customForm.querySelector('input[name="bread"]:checked')?.value;
  const meat = customForm.querySelector('input[name="meat"]:checked');
  addToCart(activeProduct, {
    bread,
    meat: meat?.value,
    meatPrice: Number(meat?.dataset.price || 0),
    combo: comboOption.checked,
    note: itemNote.value.trim(),
  });
  closeEditModal();
  openCart();
});

cartFab.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
closeModal.addEventListener("click", closeEditModal);
newOrder.addEventListener("click", resetOrder);
sendOrder.addEventListener("click", () => {
  if (cart.length) showSuccess();
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCartDrawer();
});

editModal.addEventListener("click", (event) => {
  if (event.target === editModal) closeEditModal();
});

successModal.addEventListener("click", (event) => {
  if (event.target === successModal) resetOrder();
});

phoneInput.value = localStorage.getItem("tpt-phone") || "";
renderTabs();
renderMenu();
updateCartUI();
