function Cart(localStoragecartKey){ //thing that create of generate objects use pascal case
    
    const cart={

        cartItems: [],
    
        loadFromStorage(){ // this is a way of declaring function inside object (this is the short hand way)
            this.cartItems= JSON.parse(localStorage.getItem(localStoragecartKey)) || [];
        },
    
        saveToStorage: function(){ //this is another way of declaring function in an object
    
            localStorage.setItem(localStoragecartKey, JSON.stringify(this.cartItems))
    
        },
    
        calcTotalProducts(){
            let totalProducts = 0;
            this.cartItems.forEach((cartItem) => {
    
                totalProducts += cartItem.count
    
            })
    
            return totalProducts
        },
    
        addToCart(productId, button){
            let matchingElement;
            this.cartItems.forEach((item) => {
    
                if (productId === item.productId) {
    
                    matchingElement = item
    
                }
    
            })
    
            if (matchingElement) {
    
                matchingElement.count += parseInt(button.closest('.products-container').querySelector('.qty-selection').value);
    
            }
            else {
                this.cartItems.push({
                    
                    deliveryId: '1',
    
                    productId: productId,
    
                    count: parseInt(button.closest('.products-container').querySelector('.qty-selection').value)
    
                })
    
            }
    
            this.saveToStorage()
        },
    
        removeFromCart(productid) {
        let tempCart = []
    
            this.cartItems.forEach((cartElement) => {
    
                if (cartElement.productId != productid) {
    
                    tempCart.push(cartElement)
    
                }
    
            })
    
            this.cartItems.length = 0
    
            tempCart.forEach(element => this.cartItems.push(element))
    
            this.saveToStorage()
    
        },
    
        updateDeliveryOptions(productId , deliveryOptionId){
    
            const cartItem = this.cartItems.find(cartItem => productId === cartItem.productId)
    
            if (cartItem){
    
                cartItem.deliveryId = deliveryOptionId
                    
                this.saveToStorage()
    
            }
       
        }
    
    
    
    
    
    
    }

    return cart;
}
const cart = Cart('cart-oop');

const bussinessCart = Cart('bussiness-cart');



cart.loadFromStorage()
bussinessCart.loadFromStorage()













