/*let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
    productsInCart = [];
}
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function () { // 4
    let sum = 0;
    productsInCart.forEach(item => {
        sum += item.price;
    });
    return sum;
}

const updateShoppingCartHTML = function () {  // 3
    localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
                <li class="buyItem">
                    <img src="${product.image}">
                    <div>
                        <h5>${product.name}</h5>
                        <h6>$${product.price}</h6>
                        <div>
                            <button class="button-minus" data-id=${product.id}>-</button>
                            <span class="countOfProduct">${product.count}</span>
                            <button class="button-plus" data-id=${product.id}>+</button>
                        </div>
                    </div>
                </li>`
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden');
        cartSumPrice.innerHTML = '$' + countTheSumPrice();

    }
    else {
        document.querySelector('.checkout').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
        cartSumPrice.innerHTML = '';
    }
}

function updateProductsInCart(product) { // 2
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}

products.forEach(item => {   // 1
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            const productID = e.target.dataset.productId;
            const productName = item.querySelector('.productName').innerHTML;
            const productPrice = item.querySelector('.priceValue').innerHTML;
            const productImage = item.querySelector('img').src;
            let product = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice,
            }
            updateProductsInCart(product);
            updateShoppingCartHTML();
        }
    });
});

parentElement.addEventListener('click', (e) => { // Last
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');
    if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == e.target.dataset.id) {
                if (isPlusButton) {
                    productsInCart[i].count += 1
                }
                else if (isMinusButton) {
                    productsInCart[i].count -= 1
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
    }
});

updateShoppingCartHTML();*/


let carts = document.querySelectorAll(".add-cart")
let products = [
    {
        name: product - 1,
        tag: product1,
        price: 13,
        incart: 0
    },
    {
        name: product - 2,
        tag: product2,
        price: 16,
        incart: 0
    },
    {
        name: product - 3,
        tag: product3,
        price: 20,
        incart: 0
    },
    {
        name: product - 4,
        tag: product4,
        price: 30,
        incart: 0
    }
]
for (let i = 0; i < carts.length; i++) {
    carts[i] = addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function onLoadCartNumbers() {
    let productsNumbers = localStorage.getItem('cartsNumbers');
    if (productsNumbers) {
        document.querySelectorAll('.cart span').textContent = productsNumbers;
    }
}
function cartNumbers(product) {
    let productsNumbers = localStorage.getItem('cartsNumbers');
    productsNumbers = parseInt(productsNumbers);
    if (productsNumbers) {
        localStorage.setItem('cartNumbers', productsNumbers + 1);
        document.querySelectorAll('.cart span').textContent = productsNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbeers', 1);
        document.querySelectorAll('.cart span').textContent = 1;
    }
    setitems(product);
}


function setitems(product) {
    let cartItems = localStorage.getItem('productIncarts');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }


        }
        cartItems[product.tag].incart += 1;

    }
    else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(productss){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + productss.price);
    }
    else{
        localStorage.setItem('totalCost',productss.price);
    }

}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartcost = localStorage.getItem('totalCost')
    if(cartItems && productContainer){
        productContainer.innerHTML = '' ;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
            <><div class="products"><ion-icon name="close-circle-outline"></ion-icon>
                    <img src="images/${item.tag}.jpg">
                        <span> ${item.name} </span>
                  </></div><div class="price">
                        ${item.price}
                    </div><div class="quantity"><ion-icon class="decrease" name="arrow-down-outline"></ion-icon>
                        <span>${item.incart}</span>
                        <ion-icon class="increase" name="arrow-up-outline"></ion-icon>
                    </div><div class="total">$${item.incart * item.price},00</div></>

                
           
        });
        productContainer.innerHTML +=
        <div class="basketTotalContainer">
            <h4 class="basketTtotalTitle">
                basket total </h4>
                <h4 class="basketTotal">
                $${cartcost},00
            </h4>
        </div>
    }
}

onLoadCartNumbers();
displayCart();