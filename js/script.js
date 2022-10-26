let cart = [];
let cafes = [];
let container = document.querySelector('#container');
let inputFilter = document.querySelector("#productFilter");

// Return cart values from LocalStorage
const valuesFromLS = () => {
    cart = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        value = JSON.parse(localStorage.getItem(key))
        cart.push(value)
    }
}
// If localStorage has items return values
const returnCartValues = () => localStorage.length && valuesFromLS()

returnCartValues();

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
        const response = await fetch('./js/db.json');
        const data = await response.json();
        loadProducts(data);
        cafes.push(...data);
        setQuantityIcon();
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

const setQuantityIcon = () =>
{
    let amount = document.querySelector('.cartAmount');
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    amount.innerHTML = total;
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
    
    setQuantityIcon(cart);
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