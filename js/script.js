// Products list
const cart = [];
const cafes = [
    {
        id: 1,
        name: 'AUTENTICO | BLENDS | 250G',   
        price: 990,
        category: 'BLEND-BRASIL',
        description: 'Café Autentico Blend. Notas: Aroma dulce a almendra tostada y chocolate',
        image: 'images/AUTENTICO-BLENDS.jpg'
    },
    {
        id: 2,
        name: 'CHANGO | BLENDS | 250G',   
        price: 1290,
        category: 'BLEND-M',
        description: 'Café Chango Blend. Notas: Frutos Secos & Maduros',
        image: 'images/CHANGO-BLENDS.jpg'
    },
    {
        id: 3,
        name: 'CHULLO | BLENDS | 250G',
        price: 1290,
        category: 'BLEND-M',
        description: 'Cafe Chullo Blend. Notas: Cítricas & Cacao',
        image: 'images/CHULLO-BLENDS.jpg'
    },
    {
        id: 4,
        name: 'CREMA | BLENDS | 250G',
        price: 990,
        category: 'BLEND-BRASIL',
        description: 'Café Crema Blend. Notas: Aroma intenso a Chocolate',
        image: 'images/CREMA-BLENDS.jpg'
    },
    {
        id: 5,
        name: 'SANTANDER | COLOMBIA | 250G',
        price: 2650,  
        category: 'COLOMBIA-M',
        description: 'Café Santander, Colombia. Notas: azucar morena, miel y cacao',     
        image: 'images/SANTANDER-COLOMBIA.jpg'
    },
    {
        id: 6,
        name: 'FRESCO | BLENDS | 250G',
        price: 990,
        category: 'BLEND-BRASIL',
        description: 'Café Fresco Blend. Notas: Aroma dulce a almendra tostada. Acidez dulce a naranja',       
        image: 'images/FRESCO-BLENDS.jpg'
    },
    {
        id: 7,
        name: 'MINAS GERAIS | BRASIL | 250G',
        price: 1803,
        category: 'BRASIL-M',    
        description: 'Café Minas Gerais, Brasil. Notas: azucar mascabo, fruta madura y chocolate',
        image: 'images/MINA-GERAIS-BRASIL.jpg'
    },
    {
        id: 8,
        name: 'COBAN | GUATEMALA | 250G',
        price: 2300,
        category: 'GUATEMALA-ORGANICO',   
        description: 'Café Coban, Guatemala. Notas: dulce y sabroso con acidez tartárica, sabores praliné, tofee, manzana, cítricos',
        image: 'images/COBAN-GUATEMALA.jpg'
    }
];



// dynamic loading of products
// If another product is added in 'cafes' array, the page is automatically updated
const loadProducts = (cafes) =>
{
    // Select section #container node
    let container = document.querySelector('#container');
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
    // Get the cart section node
    let cartContainer = document.querySelector('#cart');
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
}

loadProducts(cafes);
buttonEvent()