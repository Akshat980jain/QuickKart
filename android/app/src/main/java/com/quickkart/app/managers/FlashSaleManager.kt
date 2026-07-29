package com.quickkart.app.managers

import com.quickkart.app.models.FlashSale

/**
 * Manages flash sales
 */
object FlashSaleManager {
    
    // Pre-defined flash sales (in real app, fetch from API)
    private val flashSales: List<FlashSale> by lazy {
        val now = System.currentTimeMillis()
        val oneHour = 60 * 60 * 1000L
        val oneDay = 24 * oneHour
        
        listOf(
            FlashSale(
                id = "flash1",
                title = "⚡ Lightning Deal",
                description = "Up to 50% off on Electronics",
                discountPercentage = 50,
                productIds = listOf("1", "2", "3"),
                startTime = now,
                endTime = now + (6 * oneHour),  // 6 hours from now
                bannerColor = "#FF5722"
            ),
            FlashSale(
                id = "flash2",
                title = "🔥 Super Saver",
                description = "Flat 40% off on Fashion",
                discountPercentage = 40,
                productIds = listOf("4", "5", "6"),
                startTime = now,
                endTime = now + (12 * oneHour),  // 12 hours from now
                bannerColor = "#E91E63"
            ),
            FlashSale(
                id = "flash3",
                title = "🎉 Mega Sale",
                description = "Extra 30% off on Home & Kitchen",
                discountPercentage = 30,
                productIds = listOf("7", "8", "9"),
                startTime = now,
                endTime = now + oneDay,  // 24 hours from now
                bannerColor = "#9C27B0"
            )
        )
    }
    
    /**
     * Get all active flash sales
     */
    fun getActiveFlashSales(): List<FlashSale> {
        return flashSales.filter { it.isActive }
    }
    
    /**
     * Get flash sale by ID
     */
    fun getFlashSaleById(id: String): FlashSale? {
        return flashSales.find { it.id == id }
    }
    
    /**
     * Check if product is in any active flash sale
     */
    fun getFlashSaleForProduct(productId: String): FlashSale? {
        return flashSales.find { 
            it.isActive && productId in it.productIds 
        }
    }
    
    /**
     * Format remaining time as "HH:MM:SS"
     */
    fun formatTimeRemaining(millis: Long): String {
        val seconds = (millis / 1000) % 60
        val minutes = (millis / (1000 * 60)) % 60
        val hours = (millis / (1000 * 60 * 60))
        
        return String.format("%02d:%02d:%02d", hours, minutes, seconds)
    }
}
