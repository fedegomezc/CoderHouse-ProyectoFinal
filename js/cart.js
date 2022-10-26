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
    div.innerHTML += `<button class="button" id="startBuy">INICIAR COMPRA</button>
    <button class="button" id="returnToStore">SEGUIR COMPRANDO</button>
    `;

    cartContainer.appendChild(div);
    
    xButtonEvent();
    addQuantityButton();
    subtractQuantityButton();
    startBuy();
    returnToStore();
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

const startBuy = () => 
{
    const btn = document.querySelector('#startBuy');
    btn.addEventListener('click', ()=> purchaseForm())
}

const purchaseForm = () => {
    let checkoutContainer = document.querySelector('#checkout');
    
    let div = document.createElement('div');
    div.setAttribute('id','checkoutContainer');
    div.innerHTML += `
    <div class="mainscreen"> 
        <div class="card">
            <div class="leftside">
                <img
                    src="/images/cup-coffee-vertical-image.png"
                    class="product"
                    alt="coffee cup"
                />
            </div>
            <div class="rightside">
            <form action="">
                <h1>Datos de contacto</h1>
                <p>Nombre</p>
                <input type="text" class="inputbox" name="nombre" value='Homero' required />
                <p>Email</p>
                <input type="email" class="inputbox" name="email" value='example@gmail.com' required />
                <p>Teléfono</p>
                <input type="tel" class="inputbox" name="phone" value="123-4567-8901" required />
  
                <h1>Entrega</h1>
                <input type="radio" id="tienda" name="entrega" value="Retiro en tienda" required>
                <label for="tienda">Retiro en tienda (gratis)</label>
                <input type="radio" id="delivery" name="entrega" value="Delivery" checked>
                <label for="delivery">Delivery ($350)</label><br><br>
                <label id="hideDelivery" style="display:block">
                    <p>Calle</p>
                    <input type="text" class="inputbox" name="dirección" value='Av. Siempreviva' required />
                    <p>Número</p>
                    <input type="number" class="inputbox" name="dirección" value=742 required />
                    <p>Piso/dpto</p>
                    <input type="text" class="inputbox" name="dirección" placeholder='Ej: 1A' required />
                </label>

                <h1>Forma de pago</h1>
                <input type="radio" id="efectivo" name="pago" value="Efectivo" checked required>
                <label for="efectivo">Efectivo</label>
                <input type="radio" id="debito" name="pago" value="Débito">
                <label for="debito">Débito</label>
                <input type="radio" id="credito" name="pago" value="Crédito">
                <label for="credito">Crédito</label><br><br>
                    <p></p>
                    <button type="submit" class="button" id="checkoutButton">CheckOut</button>
            </form>
            </div>
        </div>
    </div>
    `;
    checkoutContainer.appendChild(div);

    let radioBtns = document.querySelectorAll("input[name='entrega']");

    let findSelected = ()=> {
        let selected = document.querySelector("input[name='entrega']:checked").value;
        if (selected === 'Retiro en tienda') {
            document.getElementById('hideDelivery').style.display = "none";
        } else {
            document.getElementById('hideDelivery').style.display = "block";
        }
    }

    radioBtns.forEach(radioBtn => {
        radioBtn.addEventListener("change", findSelected);
    })

    checkoutButton();
}

const checkoutButton = () => {
    const btn = document.querySelector('#checkoutButton');
    btn.addEventListener('click', ()=> {
        localStorage.clear();
        Swal.fire({
            title: 'Gracias por confiar en nosotros!',
            text: 'Se enviará link de pago al mail en el caso de pago con débito/crédito',
            imageUrl: 'images/thanks-brown-cup-coffee.jpg',
            imageWidth: 400,
            imageHeight: 266,
            imageAlt: 'cup coffe image',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#5e4028',
          }).then((result) => {
            if (result.isConfirmed) {
                location.replace('/index.html')
            }
          })
    })
}

const returnToStore = () => {
    const btn = document.querySelector('#returnToStore');
    btn.addEventListener('click', ()=> location.replace('/index.html'))
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