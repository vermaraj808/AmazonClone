class Cart{
    cartItems; //only writting this means the cartITems is undefined //this property without the hash makes it a public property as it can be accessed outside the class

    #localStoragecartKey; // this is a private property this cannot be accessed outside the class this is to prevent accidental change of this property outside the class

    constructor(localStorageKey) { //constructors can have parameters this is the code that i have to run manually after creating a object but this feature of class does it automatically when a object is created using class method

        this.#localStoragecartKey = localStorageKey
        this.#loadFromStorage()

    }

    calcTotalProducts(){
        let totalProducts = 0;
        
        this.cartItems.forEach((cartItem) => {
            const count = parseInt(cartItem.count); 

            totalProducts += count;
            
        })
        
        
        
    
        return totalProducts
    }

    //i can also make a method private by putting hash(as seen below)
    #loadFromStorage(){ // this is a way of declaring function inside object (this is the short hand way)   
            this.cartItems= JSON.parse(localStorage.getItem(this.#localStoragecartKey)) || [];
    }
    
    saveToStorage = function(){ //this is another way of declaring function in an object
    
            localStorage.setItem(this.#localStoragecartKey, JSON.stringify(this.cartItems))
            console.log('saving')
    
    }

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
    }

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
    
    }
    
    updateDeliveryOptions(productId , deliveryOptionId){
    
            const cartItem = this.cartItems.find(cartItem => productId === cartItem.productId)
    
            if (cartItem){
    
                cartItem.deliveryId = deliveryOptionId
                    
                this.saveToStorage()
    
            }
       
    }

}



export const cart = new Cart('cart-oop');





















