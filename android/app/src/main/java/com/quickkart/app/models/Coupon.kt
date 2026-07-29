package com.quickkart.app.models

import java.io.Serializable

data class Coupon(
    val code: String,
    val description: String,
    val discountPercentage: Int,      // e.g., 10 for 10%
    val maxDiscount: Double,          // Maximum discount amount
    val minOrderAmount: Double,       // Minimum order to apply
    val expiryDate: String,           // ISO date string
    val isActive: Boolean = true
) : Serializable {
    
    fun calculateDiscount(orderAmount: Double): Double {
        if (orderAmount < minOrderAmount) return 0.0
        val discount = orderAmount * discountPercentage / 100
        return minOf(discount, maxDiscount)
    }
}
