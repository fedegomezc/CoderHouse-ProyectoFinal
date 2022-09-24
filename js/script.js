// Products cart
const cart = [];

// Select section #container node
let container = document.querySelector('#container');
// Get the cart section node
let cartContainer = document.querySelector('#cart');

// dynamic loading of products
// Products data is in 'products.js'
// If another product is added in 'cafes' array, the page is automatically updated
const loadProducts = (cafes) =>
{
    // Looping Products array
    for (const cafe of cafes) 
    {
        // Create 'div' card
        let div = document.createElement('div');
        // set attribute for css style
        div.setAttribute('class', 'card');
        // Create dynamic HTML content  
        div.innerHTML = 
        `
            <img src="${cafe.image}" alt="${cafe.description}">
            <h3>$${cafe.price}</h3>
            <h4>${cafe.name}</h4>
            <button class="button" id="${cafe.id}">Agregar al carrito</button>
        `;
        // Add 'div' to container section
        container.appendChild(div);
    }
}

// buttons function
const buttonEvent = () => 
{
    // Select all buttons
    let buttons = document.querySelectorAll('.button');
    // Loop buttons and add to cart list when the 'click' event occurs
    for (const button of buttons) {
        button.addEventListener('click', ()=> addToCart(button.id))
    }
}

// Add products to cart array and add 'quantity' value
const addToCart = (id) => 
{
    // If the product is already exist in the cart, add 1 to the quantity
    let found = cart.find(element => element.id == id);
            if(found)
            {
                // it's already in the cart
                found.quantity++;
            }
            else
            {
                // if it isn't in the cart, add it 
                let cafe = cafes.find(element => element.id == id);
                if(cafe)
                {
                    let newCafe = {
                        id:cafe.id,
                        name: cafe.name,
                        price: cafe.price,
                        description: cafe.description,
                        image: cafe.image,
                        quantity: 1
                    }
                    cart.push(newCafe);
                }
            }
    updateCart(cart);
}

// every time a product is added the cart is updated
const updateCart = (cart) =>
{
    // Get the child element node
    let container = document.getElementById("cartContainer");
    // if the container exist it is removed
    if(container)
    {
        container.parentNode.removeChild(container);
    }
    // create element for new products added in cartContainer 
    let div = document.createElement('div');
    div.setAttribute('id','cartContainer');
    // Add the title section
    div.innerHTML += ` <h2>Carrito de compras</h2>`;
    // variable to save total price of products
    let total = 0;
    // add products
    for (const product of cart)
    {
        div.innerHTML += `
            <div class="cart-item">
                <h4>${product.name}</h4>
                <h4>$ ${product.price}</h4>
                <h4>Cantidad: ${product.quantity}</h4>
                <button class="buttonX" id="${product.id}">X</button>
            </div>
        `;
        // sum total price
        total += product.price * product.quantity
    }
    // add total section
    div.innerHTML += `
        <h2>Total = $
        ${total}</h2>
    `;
    // add node to cartContainer
    cartContainer.appendChild(div);
    // xButton function
    xButtonEvent()
}

// Function to remove an element from array by ID
const removeItem = (array, id) => 
{
    // Find the index of the object with the id in the array 
    // use '==' because 'obj.id' it's number and 'id' it's string
    const objIndex = array.findIndex((obj) => obj.id == id);
    // remove the object from the array
    array.splice(objIndex, 1);

    return array; 
}

const removeItemFromCart = (id) => 
{
    let newCart = removeItem(cart, id)
    updateCart(newCart)
}
// x buttons function - removeItem from cart
const xButtonEvent = () => 
{
    // Select all buttons
    let buttonx = document.querySelectorAll('.buttonX');
    // Loop buttons and remove from cart list when the 'click' event occurs
    for (const button of buttonx) {
        button.addEventListener('click', ()=> removeItemFromCart(button.id))
    }
}

let inputFilter = document.querySelector("#productFilter");

// Search Filter
const searchProd = () => 
{
    // save the input value
    parameter = inputFilter.value.trim().toUpperCase();
    
    if (parameter !== "") {
        // save the array with the match objects
        const result = cafes.filter(cafe => cafe.name.includes(parameter))
        if(result.length === 0) {
            container.innerHTML = ""
        } else {
            container.innerHTML = ""
            loadProducts(result)
        }
    } else {
        container.innerHTML = ""
        loadProducts(cafes)
    }
}
inputFilter.addEventListener("input", searchProd)

loadProducts(cafes);
buttonEvent()