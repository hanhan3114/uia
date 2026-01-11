// Welcome
alert('Welcome to Dori shop!')

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


let correct = "sheep"
function login(){
    let input = ""
    while(input != correct){
        input = prompt('Enter password:')
        if (input != correct){
            alert('Wrong password. Try again!')
        }
    }
}
login()

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
    )
]

let productCards = document.querySelectorAll(".product > div");

productCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
        let img = card.querySelector(".sheep-img");
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