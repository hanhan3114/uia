// Logo animation
let logo = document.getElementById("logo");

let angle = 0;

setInterval(function () {
    angle += 1;
    logo.style.transform = "rotate(" + angle + "deg)";
}, 20);

// switch mode
let button = document.querySelector('#modebtn')
let isDark=false

button.addEventListener('click',function(){
    if (isDark==false){
        document.body.classList.add('dark')
        isDark=true
    }
    else{
        document.body.classList.remove('dark')
        isDark=false
    }
})

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
        "$120",
        "A cute pair of sheep, perfect for couples or gifts."
    ),
    new Product(
        2,
        "Fat Sheep",
        "$60",
        "A soft and chubby sheep that kids love to hug."
    ),
    new Product(
        3,
        "Yellow Sheep",
        "$65",
        "A bright yellow sheep with a cheerful design."
    ),
    new Product(
        4,
        "Ratatouille",
        "$120",
        "A cute rat, a tiny rat, a giant hug.."
    ),
    new Product(
        5,
        "Tiny rat",
        "$60",
        "A little friend for a big bond."
    ),
    new Product(
        6,
        "Super big rat",
        "$65",
        "Round, fluffy, and totally lovely."
    ),
    new Product(
        7,
        "Small deer",
        "$120",
        "Little deer, big warmth."
    ),
    new Product(
        8,
        "Brown deer",
        "$60",
        "Sweet as chocolate, soft as this brown deer."
    ),
    new Product(
        9,
        "Big deer",
        "$65",
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

// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-GoWPNK94Hn2ENzjF8M9yUd4QH57HM0E",
  authDomain: "dori-sheep-shop.firebaseapp.com",
  projectId: "dori-sheep-shop",
  storageBucket: "dori-sheep-shop.firebasestorage.app",
  messagingSenderId: "137068014610",
  appId: "1:137068014610:web:023983397cb15bbaa4fccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// contact form
const contact_form = document.getElementById("contact-form")

contact_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const contact_name = document.getElementById("contact-name").value
    const contact_phone= document.getElementById("contact-phone").value
    const contact_email = document.getElementById("contact-email").value
    const contact_message = document.getElementById("contact-message").value

    try{
        await addDoc(collection(db, "contact"),{
            name: contact_name,
            phone: contact_phone,
            email: contact_email,
            message: contact_message,
            createdAt: serverTimestamp()
        })
        alert("Message sent successfully!")
        contact_form.reset()
    }
    catch (error){
        console.error(" Error saving message: ",error);
        alert("Something went wrong");
    }
})




