package com.quickkart.app.models

import java.io.Serializable

data class FlashSale(
    val id: String,
    val title: String,
    val description: String,
    val discountPercentage: Int,
    val productIds: List<String>,  // Products in this sale
    val startTime: Long,           // Timestamp in millis
    val endTime: Long,             // Timestamp in millis
    val bannerColor: String = "#FF5722"  // Orange default
) : Serializable {
    
    val isActive: Boolean
        get() {
            val now = System.currentTimeMillis()
            return now in startTime..endTime
        }
    
    val hasEnded: Boolean
        get() = System.currentTimeMillis() > endTime
    
    val timeRemainingMillis: Long
        get() = maxOf(0, endTime - System.currentTimeMillis())
}
