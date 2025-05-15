
console.log("hello world");


//____________ Seleccionar elementos

const title = document.getElementById("txt");
//console.log(title);

const img = document.getElementsByClassName("search-cart");
//console.log(img[1]);

const tags = document.getElementsByTagName("article");
//console.log(tags);

const elem = document.querySelectorAll(".logo");
//console.log(elem);




//___________crear elemento

const parent = document.querySelector(".products");
const newElem = document.querySelector("section");
newElem.setAttribute("class", "new");
//parent.append(newElem);



//_______________________ Atributes

const logo = document.querySelector(".options");
//logo.setAttribute("src", "Img/productos/sec2.jpg");
//console.log(logo.getAttribute("src"));
//console.log(logo.hasAttribute("src"));
//logo.removeAttribute("src");
if(logo.hasAttribute("rsc")){
    alert("tiene rsc")
}

//________________________ CSS Clases

const parent2 = document.querySelector(".product-card__actions");
const parent3 = parent2.firstElementChild;

console.log(parent3);

//parent3.classList.add("btn");
//parent3.classList.replace("btn","blue");
//parent3.classList.remove("blue");


//_______________________  Modificar texto

const button = document.getElementsByTagName("button");
console.log(button[5].innerText);
button[5].innerText = "BUY";



//______ Modificar Style

console.log(button[5].style);
button[5].style.background = "gray";

//______ Eventos

 const elemButton = button[5];
button[5].addEventListener('click', () => {
    elemButton.classList.toggle("toggle");
});


const iconRemove = document.querySelectorAll(".remove");
console.log(iconRemove);

iconRemove.forEach(elem => {
    elem.addEventListener("click", () => {
        const elemParent = elem.parentElement;
        elemParent.remove();
    })
})


const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
})


const product = document.querySelector(".mouse");
product.style.opacity = ".5";

product.addEventListener("mouseenter", () => {
    product.style.opacity = ".5";
})

product.addEventListener("mouseleave", () => {
    product.style.opacity = "1";
})

