package com.quickkart.app.models

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Deal(
    @SerializedName("_id")
    val id: String = "",
    val title: String = "",
    val originalPrice: Double = 0.0,
    val discountPrice: Double = 0.0,
    val discount: Int = 0,
    val rating: Double = 0.0,
    val reviews: Int = 0,
    val image: String = "",
    val category: String = "",
    val timeLeft: String = "",
    val isFavorite: Boolean = false,
    val description: String = "",
    val brand: String? = null,
    val tags: List<String>? = null,
    val stock: Int? = null
) : Serializable {
    
    val savings: Double
        get() = originalPrice - discountPrice
}
