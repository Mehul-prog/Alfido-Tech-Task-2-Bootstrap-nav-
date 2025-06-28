const dishes = [
  {
    name: "Masala Dosa",
    price: 180,
    img: "Masala.jpg",
    description: "Crispy South Indian crepe with spiced potato filling, served with chutney and sambar."
  },
  {
    name: "Paneer Butter Masala",
    price: 220,
    img: "Paneer-Butter-Masala.jpg",
    description: "Soft paneer cubes in a buttery tomato-cream gravy with spices."
  },
  {
    name: "Veg Biryani",
    price: 200,
    img: "Veg-Biiryani.jpg",
    description: "Fragrant rice cooked with veggies and biryani spices."
  },
  {
    name: "Rajma Chawal",
    price: 150,
    img: "rajma-chawal.jpg",
    description: "Kidney beans cooked in spicy gravy served with rice."
  },
  {
    name: "Chole Bhature",
    price: 170,
    img: "Chole Bhature.jpg",
    description: "Spicy chickpeas served with fluffy fried bread."
  },
  {
    name: "Dhokla",
    price: 100,
    img: "Dhokla.jpg",
    description: "Steamed fermented cakes with mustard tempering."
  },
  {
    name: "Aloo Paratha",
    price: 120,
    img: "Aloo-Paratha-Recipe-1024x700.jpg",
    description: "Stuffed flatbread with spiced potatoes and butter."
  },
  {
    name: "Idli Sambar",
    price: 130,
    img: "idly-sambar-or-idli-with-sambhar-and-green-red-chutney-popular-south-indian-breakfast-free-photo.jpg",
    description: "Steamed rice cakes with lentil sambar and chutney."
  },
  {
    name: "Pav Bhaji",
    price: 140,
    img: "pav-bhaji.jpg",
    description: "Mashed mixed veggies with toasted buns and butter."
  },
  {
    name: "Kadhai Paneer",
    price: 210,
    img: "Kadhai Paneer.jpg",
    description: "Paneer with capsicum and masala in kadhai style."
  },
  {
    name: "Malai Kofta",
    price: 230,
    img: "malai-kofta-1.jpg",
    description: "Paneer-potato balls in creamy saffron-rich gravy."
  },
  {
    name: "Baingan Bharta",
    price: 160,
    img: "Baingan-Bharta.jpg",
    description: "Smoky mashed eggplant sautéed with spices."
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedDish = null;

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} - ₹${item.price}</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(item) {
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function showDishModal(index) {
  selectedDish = dishes[index];
  document.getElementById('dishModalTitle').textContent = selectedDish.name;
  document.getElementById('dishModalImage').src = selectedDish.img;
  document.getElementById('dishModalDescription').textContent = selectedDish.description;
  document.getElementById('dishModalPrice').textContent = selectedDish.price;
  new bootstrap.Modal(document.getElementById('dishModal')).show();
}

document.getElementById('addToCartFromModal').addEventListener('click', () => {
  if (selectedDish) {
    addToCart(selectedDish);
    bootstrap.Modal.getInstance(document.getElementById('dishModal')).hide();
  }
});

function initMenu() {
  const menu = document.getElementById('menuItems');
  dishes.forEach((dish, index) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <img src="${dish.img}" alt="${dish.name}">
      <div class="menu-card-body">
        <h5>${dish.name}</h5>
        <p>₹${dish.price}</p>
        <button class="btn btn-sm btn-outline-primary" onclick="showDishModal(${index})">View Details</button>
      </div>`;
    menu.appendChild(card);
  });
  updateCartUI();
}

const menuScroll = () => {
  const menu = document.getElementById("menuItems");
  if (!menu) return;
  setInterval(() => {
    if (menu.scrollLeft + menu.clientWidth >= menu.scrollWidth) {
      menu.scrollLeft = 0;
    } else {
      menu.scrollLeft += 1;
    }
  }, 20);
};

const sectionColors = {
  home: "#ff9933",
  about: "#e67e22",
  menu: "#d35400",
  specials: "#c0392b",
  contact: "#a93226"
};

function handleScrollNavbarColor() {
  const sections = document.querySelectorAll("section");
  const navbar = document.getElementById("mainNavbar");
  let current = "home";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });
  navbar.style.backgroundColor = sectionColors[current] || "#ff9933";
}

window.addEventListener("scroll", handleScrollNavbarColor);

window.onload = () => {
  menuScroll();
  if (typeof initMenu === 'function') initMenu();
  handleScrollNavbarColor();
};
