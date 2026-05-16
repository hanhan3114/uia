// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKUsRdorj8eXDfI8mloVy5zZVZl4-K8oo",
  authDomain: "dori-sheep.firebaseapp.com",
  databaseURL: "https://dori-sheep-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dori-sheep",
  storageBucket: "dori-sheep.firebasestorage.app",
  messagingSenderId: "293735754391",
  appId: "1:293735754391:web:9169bda0d24bea935997d2",
  measurementId: "G-6W9Q89X4CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Logo animation
let logo = document.getElementById("logo");

let angle = 0;

setInterval(function () {
    angle += 1;
    logo.style.transform = "rotate(" + angle + "deg)";
}, 20);

// switch mode
let button = document.querySelector('#modebtn');

// load saved mode
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
}

button.addEventListener('click', function () {
    document.body.classList.toggle('dark');

    // save state
    if (document.body.classList.contains('dark')) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

let correct = "sheep";

function login(){
    let input = "";
    while(input != correct){
        input = prompt("Enter password:");
        if (input != correct && input != ""){
            alert("Wrong password. Try again!");
        }
    }

    localStorage.setItem("sitePassword", "verified");

    // show welcome only first time
    if (!localStorage.getItem("welcomeShown")){
        alert("Welcome to Dori Shop!");
        localStorage.setItem("welcomeShown", "yes");
    }
}

// check login
if (localStorage.getItem("sitePassword") !== "verified"){
    login();
}

// class product
class Product {
    constructor(id, name, price, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    renderInfo(container) {
        container.innerHTML = `
            <p><strong>Price:</strong> ${this.price}</p>
            <p>${this.description}</p>
        `;
    }
}

// array
const products = [
    new Product(
        1,
        "Couple Sheep",
        120,
        "A cute pair of sheep, perfect for couples or gifts."
    ),
    new Product(
        2,
        "Fat Sheep",
        60,
        "A soft and chubby sheep that kids love to hug."
    ),
    new Product(
        3,
        "Yellow Sheep",
        65,
        "A bright yellow sheep with a cheerful design."
    ),
    new Product(
        4,
        "Ratatouille",
        120,
        "A cute rat, a tiny rat, a giant hug.."
    ),
    new Product(
        5,
        "Tiny rat",
        60,
        "A little friend for a big bond."
    ),
    new Product(
        6,
        "Super big rat",
        65,
        "Round, fluffy, and totally lovely."
    ),
    new Product(
        7,
        "Small deer",
        120,
        "Little deer, big warmth."
    ),
    new Product(
        8,
        "Brown deer",
        60,
        "Sweet as chocolate, soft as this brown deer."
    ),
    new Product(
        9,
        "Big deer",
        65,
        "A big round hug in a little deer."
    )
]

let productCards = document.querySelectorAll(".product > div");

productCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        let img = card.querySelector(".product-img");
        let id = img.dataset.id;

        let product = products.find(function (item) {
            return item.id == id;
        });

        let infoBox = card.querySelector(".product-info");
        product.renderInfo(infoBox);
    });

    card.addEventListener("mouseleave", function () {
        let infoBox = card.querySelector(".product-info");
        infoBox.innerHTML = "";
    });
});


// contact form
const contact_form = document.getElementById("contact-form");
if(contact_form){
    contact_form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const contact_name = document.getElementById("contact-name").value;
        const contact_phone = document.getElementById("contact-phone").value;
        const contact_email = document.getElementById("contact-email").value;
        const contact_message = document.getElementById("contact-message").value;
        try{
            await addDoc(collection(db, "contacts"), {
                name: contact_name,
                phone: contact_phone,
                email: contact_email,
                message: contact_message,
                createdAt: serverTimestamp()
            });
            alert("Message sent successfully!");
            contact_form.reset();
        }
        catch(error){
            console.error(error);
            alert(error.message);
        }
    });
}



let cart = [];

const modal = document.getElementById("cart-modal");
const box = document.getElementById("cart-items");
const totalBox = document.getElementById("total-price");
const count = document.getElementById("cart-count");

// open cart
document.getElementById("cartbtn").onclick = () => {
    modal.classList.add("show");
    renderCart();
};

// close cart
document.getElementById("close").onclick = () => {
    modal.classList.remove("show");
};

// add product to cart
document.querySelectorAll(".add-cart").forEach(btn=>{
    btn.onclick=()=>{
        const id=Number(btn.dataset.id);
        const p=products.find(x=>x.id===id);

        const item=cart.find(i=>i.id===id);

        if(item) item.quantity++;
        else cart.push({...p,quantity:1});

        updateCount();
    };
});

// descrease cart
function decrease(id){
    const item=cart.find(i=>i.id===id);
    if(!item) return;

    item.quantity--;
    if(item.quantity<=0){
        cart=cart.filter(i=>i.id!==id);
    }

    renderCart();
    updateCount();
}

// increase cart
function increase(id){
    const item=cart.find(i=>i.id===id);
    if(item){
        item.quantity++;
        renderCart();
        updateCount();
    }
}

window.decrease=decrease;
window.increase=increase;

// render cart
function renderCart() {
    const box = document.getElementById("cart-items");
    const totalBox = document.getElementById("total-price");

    box.innerHTML = "";

    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = Number(item.price) * item.quantity;
        grandTotal += itemTotal;

        box.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="decrease(${item.id})">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="increase(${item.id})">➕</button>
                </div>
                <div>
                    $${itemTotal}
                </div>
            </div>
        `;
    });

    totalBox.innerText = "Total: $" + Number(grandTotal);
}

// count product quantity
function updateCount(){
    let c=0;
    cart.forEach(i=>c+=i.quantity);
    count.innerText=c;
}

// buy products
const orderForm = document.getElementById("order-form");
if(orderForm){
    orderForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if(cart.length === 0){
            alert("Cart empty!");
            return;
        }
        const cus_name = document.getElementById("customer-name").value;
        const phone = document.getElementById("customer-phone").value;
        const address = document.getElementById("customer-address").value;
        const note = document.getElementById("customer-note").value;
        let total = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        try{
            await addDoc(collection(db, "orders"), {
                customerName: cus_name,
                customerPhone: phone,
                customerAddress: address,
                customerNote: note,
                items: cart,
                totalPrice: total,
                createdAt: serverTimestamp()
            });
            alert("Order success!");
            cart = [];
            updateCount();
            renderCart();
            modal.classList.remove("show");
            orderForm.reset();
        }
        catch(error){
            console.error(error);
            alert(error.message);
        }
    });
}





