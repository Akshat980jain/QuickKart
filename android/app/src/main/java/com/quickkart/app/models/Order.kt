package com.quickkart.app.models

import com.google.gson.annotations.SerializedName

data class Order(
    @SerializedName("_id")
    val id: String = "",
    val userId: String = "",
    val items: List<CartItem> = emptyList(),
    val totalAmount: Double = 0.0,
    val status: String = "pending", // pending, processing, shipped, delivered
    val shippingAddress: Address? = null,
    val paymentMethod: String = "",
    val paymentId: String? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)
