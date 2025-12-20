package com.quickkart.app.utils

object Constants {
    const val BASE_URL = "https://quickkart-b0yb.onrender.com/"
    
    // Intent Extras
    const val EXTRA_PRODUCT = "product"
    const val EXTRA_PRODUCT_ID = "product_id"
    
    // SharedPreferences Keys
    const val PREFS_NAME = "quickkart_prefs"
    const val KEY_AUTH_TOKEN = "auth_token"
    const val KEY_USER = "user"
    const val KEY_CART = "cart"
    
    // Categories
    val CATEGORIES = listOf(
        "All Categories" to "all",
        "Electronics" to "electronics",
        "Clothing" to "clothing",
        "Home & Kitchen" to "home",
        "Beauty" to "beauty",
        "Sports" to "sports",
        "Books" to "books",
        "Toys" to "toys",
        "Automotive" to "automotive",
        "Garden" to "garden",
        "Food & Beverages" to "food"
    )
    
    // Promo Codes
    val PROMO_CODES = mapOf(
        "SAVE10" to 0.10,
        "WELCOME20" to 0.20,
        "FIRST15" to 0.15
    )
    
    // Tax Rate
    const val TAX_RATE = 0.085
    
    // Free Shipping Threshold
    const val FREE_SHIPPING_THRESHOLD = 50.0
    const val SHIPPING_COST = 5.99
}
