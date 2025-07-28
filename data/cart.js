export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage(){

    localStorage.setItem("cart", JSON.stringify(cart))

}


export function calcTotalProducts() {
    let totalProducts = 0;
    cart.forEach((cartItem) => {

        totalProducts += cartItem.count

    })

    return totalProducts
}

export function addToCart(productId, button) {
    let matchingElement;
    cart.forEach((item) => {

        if (productId === item.productId) {

            matchingElement = item

        }

    })

    if (matchingElement) {

        matchingElement.count += parseInt(button.closest('.products-container').querySelector('.qty-selection').value);

    }
    else {
        cart.push({
            
            deliveryId: '1',

            productId: productId,

            count: parseInt(button.closest('.products-container').querySelector('.qty-selection').value)

        })

    }

    saveToStorage()
}

export function removeFromCart(productid) {
    let tempCart = []

    cart.forEach((cartElement) => {

        if (cartElement.productId != productid) {

            tempCart.push(cartElement)

        }

    })

    cart.length = 0

    tempCart.forEach(element => cart.push(element))

    saveToStorage()

}



export function updateDeliveryOptions(productId , deliveryOptionId){

    cart.forEach((cartItem)=>{

        if (productId == cartItem.productId){

            cartItem.deliveryId = deliveryOptionId

        }

        saveToStorage()

    })
   
}