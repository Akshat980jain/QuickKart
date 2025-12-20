package com.quickkart.app.models

import java.io.Serializable

data class CartItem(
    val product: Product,
    var quantity: Int = 1
) : Serializable {
    
    val totalPrice: Double
        get() = product.discountedPrice * quantity
}
