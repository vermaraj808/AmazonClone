import { cart } from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { formatPrice } from "../utils.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary (){

    let totalItemsCost = 0
    let totalShippingCost = 0
    let totalBeforeTax = 0
    let taxTenPercent = 0
    let orderTotal = 0

    

    cart.cartItems.forEach((cartItem) => {

        const product = getProduct(cartItem.productId)

        const option = getDeliveryOption(cartItem.deliveryId)

        totalItemsCost += product.priceCents*cartItem.count

        totalShippingCost += option.priceCents

        totalBeforeTax = totalItemsCost+totalShippingCost
    
        taxTenPercent = totalBeforeTax/10

        orderTotal = totalBeforeTax + taxTenPercent

    });
    
    document.querySelector('.price-summary-container-js').innerHTML = 
    `
                    <div class="order-summary-title">
                        Order Summary
                    </div>
                    <div class="order-summary-productCost-container order-summary-element-grid">
                        <div class="order-summary-productCost-title">Items <span class="item-number">(3)</span>:</div>
                        <div class="order-summary-productCost item-end item-total-js">$${formatPrice(totalItemsCost)}</div>
                    </div>
                    <div class="order-summary-shippingCost-container order-summary-element-grid">
                        <div class="order-summary-productCost-title">Shipping & handling:</div>
                        <div class="order-summary-productCost item-end">$${formatPrice(totalShippingCost)}</div>
                    </div>
                    <div class="order-summary-totalBeforeTax-container order-summary-element-grid">
                        <div class="order-summary-totalBeforeTax-title">Total before tax:</div>
                        <div class="order-summary-totalBeforeTax item-end">$${formatPrice(totalBeforeTax)}</div>
                    </div>
                    <div class="order-summary-totalTax-container order-summary-element-grid">
                        <div class="order-summary-totalTax-title">Estimated tax (10%):</div>
                        <div class="order-summary-totalTax item-end">$${formatPrice(taxTenPercent)}</div>
                    </div>
                    <div class="order-summary-total-container order-summary-element-grid">
                        <div class="order-summary-total-title">Order total:</div>
                        <div class="order-summary-total item-end">$${formatPrice(orderTotal)}</div>
                    </div>
                    <div class="place-order-button-container">
                        <button class="place-order-button">Place your order</button>
                    </div>
                </div>

    `
    

}