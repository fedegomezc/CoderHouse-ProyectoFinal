// every time a product is added the cart is updated
const updateCart = (cart) =>
{
    let cartContainer = document.querySelector('#cart');
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
    div.innerHTML += `<h2>Total = $${total}</h2>`;
    div.innerHTML += `<button class="button" id="checkout">Finalizar Compra</button>`;

    cartContainer.appendChild(div);
    
    xButtonEvent();
    addQuantityButton();
    subtractQuantityButton();
    checkoutButton();
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

const checkoutButton = () => 
{
    const btn = document.querySelector('#checkout');
    btn.addEventListener('click', ()=> {
        Swal.fire({
            title: 'Compra finalizada',
            text: 'Gracias por confiar en nosotros!',
            imageUrl: 'images/thanks-brown-cup-coffee.jpg',
            imageWidth: 400,
            imageHeight: 266,
            imageAlt: 'cup coffe image',
          })
    })
}

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

returnCartValues();