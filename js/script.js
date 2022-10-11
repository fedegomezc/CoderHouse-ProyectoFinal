let cafes = [];
let cart = [];
let container = document.querySelector('#container');
let cartContainer = document.querySelector('#cart');
let inputFilter = document.querySelector("#productFilter");

// If another product is added in 'cafes' array, the page is automatically updated
const loadProducts = (cafes) =>
{
    for (const cafe of cafes) 
    {
        let {id, name, price, description, image} = cafe
        let div = document.createElement('div');
        // set attribute for css style
        div.setAttribute('class', 'card');  
        div.innerHTML = 
        `
            <img src="${image}" alt="${description}">
            <h3>$${price}</h3>
            <h4>${name}</h4>
            <button class="button" id="${id}">Agregar al carrito</button>
        `;
        container.appendChild(div);
    }
    buttonEvent()
}

const getData = async () => 
{
    try
    {
        const response = await fetch('/js/db.json');
        const data = await response.json();
        loadProducts(data);
        cafes.push(...data);
    }
    catch(e)
    {
        console.log(e);
    }
}

getData();

// buttons function - addToCart
const buttonEvent = () => 
{
    let buttons = document.querySelectorAll('.button');
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
        localStorage.setItem(`${cafe.id}`, JSON.stringify(newCafe))
    }

    const addNewItem = () => { 
         let cafe = cafes.find(element => element.id == id);
         cafe && saveNewItem(cafe)  
    }

    // If the product is already exist in the cart, add 1 to the quantity 
    // else add the product to cart
    let found = cart.find(element => element.id == id);
            found ? addQuantity(found) : addNewItem()

    updateCart(cart);
}

// every time a product is added the cart is updated
const updateCart = (cart) =>
{
    let container = document.getElementById("cartContainer");
    // if the container exist it is removed
    container && container.parentNode.removeChild(container);
    // create element for new products added in cartContainer 
    let div = document.createElement('div');
    div.setAttribute('id','cartContainer');
    div.innerHTML += ` <h2>Carrito de compras</h2>`;
    // variable to save total price of products
    let total = 0;
    for (const product of cart)
    {
        let {id, name, price, quantity} = product

        div.innerHTML += `
            <div class="cart-item">
                <h4>${name}</h4>
                <h4>Precio: $ ${price}</h4>
                <h4>Cantidad: ${quantity} 
                <button class="buttonAdd" id="${id}">+</button>
                <button class="buttonRemove" id="${id}">-</button></h4>
                <h4>Subtotal: $ ${price * quantity}</h4>
                <button class="buttonX" id="${id}">Eliminar</button>
            </div>
        `;
        total += price * quantity
    }
    div.innerHTML += `
        <h2>Total = $
        ${total}</h2>
    `;
    cartContainer.appendChild(div);
    
    xButtonEvent()
    addQuantityButton()
    subtractQuantityButton()
}

// Function to remove an element from array by ID
const removeItem = (array, id) => 
{
    const objIndex = array.findIndex((obj) => obj.id == id);
    array.splice(objIndex, 1);
    return array; 
}

const removeItemFromCart = (id) => 
{
    let newCart = removeItem(cart, id)
    localStorage.removeItem(`${id}`)
    updateCart(newCart)
}
// x buttons Event - removeItem from cart
const xButtonEvent = () => 
{
    let buttonx = document.querySelectorAll('.buttonX');
    for (const button of buttonx) {
        button.addEventListener('click', ()=> removeItemFromCart(button.id))
    }
}


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
    for (const button of buttonAdd) {
        button.addEventListener('click', ()=> addQuantity(button.id))
    }
}

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
    for (const button of buttonRemove) {
        button.addEventListener('click', ()=> subtractQuantity(button.id))
    }
}

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


// Return cart values from LocalStorage
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

// loadProducts(cafes);
returnCartValues()