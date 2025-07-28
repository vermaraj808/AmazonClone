import { cart } from '../../data/cart-class.js'
import { products } from '../../data/products.js'
import { formatPrice } from '../utils.js'
import { deliveryOptions } from '../../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './priceSummary.js'








export function renderCheckout() {
    

    document.querySelector('.orders-container').innerHTML = '';

    cart.cartItems.forEach((cartItem) => {

        const productId = cartItem.productId

        const deliveryId =cartItem.deliveryId

        const matchingProd = getProduct(productId)

        const today = dayjs()

        const option = getDeliveryOption(deliveryId)

        let deliveryDate = today.add(option.deliveryDays, 'days')

        let deliveryDateString = deliveryDate.format('dddd, MMMM D')

        const productHtml = `
        <div class="orders orders-content-js-${matchingProd.id}">
        <div class="date">Delivery date: ${deliveryDateString}</div>
        <div class="orders-content ">
        <div class="product-img">
        <img src="${matchingProd.image}" alt="">
        </div>
        <div class="product-details">
        <div class="product-name">${matchingProd.name}</div>
        <div class="product-price">$${matchingProd.getPrice()}</div>
        <div class="product-qty">
        <span class="qty">Quantity:<span class="count-js" data-product-id = "${matchingProd.id}"> ${cartItem.count}</span></span>
        <span class="update js-update-button">Update</span>
        <span class="delete js-delete-button" data-product-id = "${matchingProd.id}">Delete</span>
        </div>
        </div>
        <div class="delivery-option">
        
        <div class="delivery-options-title">Choose a delivery option:</div>
        
        ${deliveryOptionsRender(matchingProd, cartItem)}
        
        </div>
        
        </div>
        </div>`
        document.querySelector('.orders-container').innerHTML += productHtml;


    })
    document.querySelectorAll('.delivery-options-js').forEach((element) => {

        element.addEventListener('click', () => {

            const { productId, deliveryId } = element.dataset

            cart.updateDeliveryOptions(productId, deliveryId)

            renderCheckout()

            renderPaymentSummary()




        })


    })

    let orderContainer = document.querySelector('.orders-container')
    document.querySelectorAll(".js-delete-button").forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
            const productId = deleteButton.dataset.productId



            cart.removeFromCart(productId)

            renderCheckout()

            renderPaymentSummary()




            renderItemCount()

        })

    })
    if (cart.cartItems.length == 0) {

        orderContainer.innerHTML = `<div class ="cart-empty-msg-container">
        <p>Cart is Empty</p>
        </div>`

    }

    renderItemCount()
    function deliveryOptionsRender(matchingProd, cartItem) {
    
        let html = ''
    
        deliveryOptions.forEach((option) => {
    
            const today = dayjs()
            let deliveryDate = today.add(option.deliveryDays, 'days')
            let deliveryDateString = deliveryDate.format('dddd, MMMM D')
            let dilveryPrice = option.id == '1' ? 'FREE' : `$${formatPrice(option.priceCents)}`
            let isChecked = option.id == cartItem.deliveryId ? 'checked' : ''
    
            html +=
                `
                <div class="shipping-options delivery-options-js "
                data-product-id = ${matchingProd.id}
                data-delivery-id = ${option.id}
                >
                                        
                    <input type="radio" name = "${matchingProd.id}" ${isChecked}>
    
                    <div>
    
                        <div class="delivery-date">${deliveryDateString}</div>
                                                
                        <div class="cost-of-shipping">${dilveryPrice} - Shipping</div>
    
                    </div>                                           
                                    
                </div>
    
            `
        })
        return html
    
    }
    
    function renderItemCount() {
    
        document.querySelector('.item-count').innerHTML = cart.calcTotalProducts()
    }
}








