package com.quickkart.app.models

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Product(
    @SerializedName("_id")
    val id: String = "",
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    val image: String = "",
    val category: String = "",
    val inStock: Boolean = true,
    val rating: Double? = 0.0,
    val reviews: Int = 0,
    val discount: Int? = 0
) : Serializable {
    
    val discountedPrice: Double
        get() = if ((discount ?: 0) > 0) price * (1 - (discount ?: 0) / 100.0) else price
    
    val displayPrice: Double
        get() = discountedPrice
    
    val reviewCount: Int
        get() = reviews
    
    val hasDiscount: Boolean
        get() = (discount ?: 0) > 0
}
