import { cart } from "../data/cart-class.js";
import { products } from "../data/products.js";


let productHtml = "";
products.forEach((product) => {
    productHtml += `<div class="products-container">
                    <div class="product-image-container">
                        <img src="${product.image}" class="product-img">
                    </div>
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-rating">
                        <img src="${product.getStarsURL()}" alt=""><span>${product.rating.count}</span>
                    </div>
                    <div class="product-price">$${product.getPrice()}</div>
                    <div class="product-quantity-selector">
                        <select class="qty-selection">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        ${product.extraHtmlInfo()} <!-- this is polymorphism (((Polymorphism in JavaScript refers to the ability of different objects to respond to the same function or method name in a way appropriate to their own type or structure.)))
    basically we dont need to know about what class the function is from  -->
                    </div>


                    
                    
                    <div class="add-to-cart-button" >
                        <button class="js-add-to-cart-button" data-product-id = "${product.id}" >Add to Cart</button>
                    </div>
        </div>`


});
document.querySelector('.js-products-grid').innerHTML = productHtml;


document.querySelector('.js-count').innerHTML = cart.calcTotalProducts()


document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {

            const productId = button.dataset.productId;

            cart.addToCart(productId, button)

            document.querySelector('.js-count').innerHTML = cart.calcTotalProducts()

        })

    })






