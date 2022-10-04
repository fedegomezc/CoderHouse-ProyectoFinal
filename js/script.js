// Products cart
let cart = [];

// Select section node
let container = document.querySelector('#container');
let cartContainer = document.querySelector('#cart');
let inputFilter = document.querySelector("#productFilter");


//////////////// Dynamic loading of products ///////////////////////
// Products data is in 'products.js'
// If another product is added in 'cafes' array, the page is automatically updated
const loadProducts = (cafes) =>
{
    // Looping Products array
    for (const cafe of cafes) 
    {
        // Destructuring assignment from object
        let {id, name, price, description, image} = cafe
        // Create 'div' card
        let div = document.createElement('div');
        // set attribute for css style
        div.setAttribute('class', 'card');
        // Create dynamic HTML content  
        div.innerHTML = 
        `
            <img src="${image}" alt="${description}">
            <h3>$${price}</h3>
            <h4>${name}</h4>
            <button class="button" id="${id}">Agregar al carrito</button>
        `;
        // Add 'div' to container section
        container.appendChild(div);
    }
    buttonEvent()
}

////////////////////// Cart functions ////////////////////////
// buttons function - addToCart
const buttonEvent = () => 
{
    // Select all buttons
    let buttons = document.querySelectorAll('.button');
    // Loop buttons and add to cart list when the 'click' event occurs
    for (const button of buttons) {
        button.addEventListener('click', ()=> addToCart(button.id))
    }
    for (const button of buttons) {
        button.addEventListener('click', () => {
 
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
                color: '#f7f7f7e8',
                iconColor: '#3f2f21',
                background: '#d49f74'
            })
        })        
    }
}

// Add products to cart array and add 'quantity' value
const addToCart = (id) => 
{
    ///////////// local functions ///////////
    const addQuantity = (found) => {
        // Product is already in the cart
        found.quantity++;
        // localStorage value is replaced
        localStorage.removeItem(`${id}`)
        localStorage.setItem(`${found.id}`, JSON.stringify(found))
    }

    const saveNewItem = (cafe) => {
        let newCafe = {
            id:cafe.id,
            name: cafe.name,
            price: cafe.price,
            description: cafe.description,
            image: cafe.image,
            quantity: 1
        }
        cart.push(newCafe);
        // add it to localStorage with key = id
        localStorage.setItem(`${cafe.id}`, JSON.stringify(newCafe))
    }

    const addNewItem = () => { 
         let cafe = cafes.find(element => element.id == id);
         cafe && saveNewItem(cafe)  
    }

    //////////// id application /////////////
    // If the product is already exist in the cart, add 1 to the quantity 
    // else add the product to cart
    let found = cart.find(element => element.id == id);
            found ? addQuantity(found) : addNewItem()

    updateCart(cart);
}

// every time a product is added the cart is updated
const updateCart = (cart) =>
{
    // Get the child element node
    let container = document.getElementById("cartContainer");
    // if the container exist it is removed
    container && container.parentNode.removeChild(container);
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
        // Destructuring assignment from object
        let {id, name, price, quantity} = product

        div.innerHTML += `
            <div class="cart-item">
                <h4>${name}</h4>
                <h4>Precio: $ ${price}</h4>
                <h4>Cantidad: ${quantity}</h4>
                <h4>Subtotal: $ ${price * quantity}</h4>
                <button class="buttonAdd" id="${id}">+</button>
                <button class="buttonRemove" id="${id}">-</button>
                <button class="buttonX" id="${id}">Eliminar</button>
            </div>
        `;
        // sum total price
        total += price * quantity
    }
    // add total section
    div.innerHTML += `
        <h2>Total = $
        ${total}</h2>
    `;
    // add node to cartContainer
    cartContainer.appendChild(div);
    // Buttons function
    xButtonEvent()
    addQuantityButton()
    subtractQuantityButton()
}

////////////////// Functions to remove an item cart /////////////////////
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
    localStorage.removeItem(`${id}`)
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

// add 1 from quantity
const addQuantity = (id) =>
{
    const addOneItem = (obj) => {
        objID.quantity++;
        localStorage.removeItem(`${id}`);
        localStorage.setItem(`${obj.id}`, JSON.stringify(obj));
        updateCart(cart); 
    }
    const objID = cart.find((obj) => obj.id == id);
        objID.quantity < 10 && addOneItem(objID);  
}
const addQuantityButton = () =>
{
    let buttonAdd = document.querySelectorAll('.buttonAdd');
    // Loop buttons and add 1 to quantity when the 'click' event occurs
    for (const button of buttonAdd) {
        button.addEventListener('click', ()=> addQuantity(button.id))
    }
}

// remove 1 from quantity
const subtractQuantity = (id) =>
{
    const removeOneItem = (obj) => {
        objID.quantity--;
        localStorage.removeItem(`${id}`);
        localStorage.setItem(`${obj.id}`, JSON.stringify(obj));
        updateCart(cart);
    }
    const objID = cart.find((obj) => obj.id == id);
        objID.quantity > 1 && removeOneItem(objID);       
}
const subtractQuantityButton = () =>
{
    let buttonRemove = document.querySelectorAll('.buttonRemove');
    // Loop buttons and remove 1 to quantity when the 'click' event occurs
    for (const button of buttonRemove) {
        button.addEventListener('click', ()=> subtractQuantity(button.id))
    }
}

///////////////////// Search Filter /////////////////////
const searchProd = () => 
{
    // save the input value
    parameter = inputFilter.value.trim().toUpperCase();
    
    if (parameter !== "") {
        // save the array with the match objects
        const result = cafes.filter(cafe => cafe.name.includes(parameter))
        result.length === 0 ? (container.innerHTML = "") : (container.innerHTML = "", loadProducts(result));
    } else {
        container.innerHTML = ""
        loadProducts(cafes)
    }
}
inputFilter.addEventListener("input", searchProd)


////////////// Return cart values from LocalStorage ////////////////////

const valuesFromLS = () => {
    cart = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        value = JSON.parse(localStorage.getItem(key))
        cart.push(value)
    }
    updateCart(cart)
}
// If localStorage has items return values
const returnCartValues = () => localStorage.length && valuesFromLS()

loadProducts(cafes);
returnCartValues()