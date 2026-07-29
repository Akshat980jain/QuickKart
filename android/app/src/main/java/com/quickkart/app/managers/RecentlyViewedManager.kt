package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.Product

/**
 * Manages recently viewed products
 */
object RecentlyViewedManager {
    
    private const val PREFS_NAME = "recently_viewed_prefs"
    private const val KEY_PRODUCTS = "recent_products"
    private const val MAX_ITEMS = 20
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Add product to recently viewed
     */
    fun addProduct(product: Product) {
        val products = getRecentlyViewed().toMutableList()
        
        // Remove if already exists (to move to front)
        products.removeAll { it.id == product.id }
        
        // Add to front
        products.add(0, product)
        
        // Trim to max size
        val trimmed = products.take(MAX_ITEMS)
        
        saveProducts(trimmed)
    }
    
    /**
     * Get recently viewed products
     */
    fun getRecentlyViewed(): List<Product> {
        val json = prefs.getString(KEY_PRODUCTS, null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<Product>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    /**
     * Clear all recently viewed
     */
    fun clear() {
        prefs.edit().remove(KEY_PRODUCTS).apply()
    }
    
    /**
     * Get count of recently viewed
     */
    fun getCount(): Int = getRecentlyViewed().size
    
    private fun saveProducts(products: List<Product>) {
        val json = gson.toJson(products)
        prefs.edit().putString(KEY_PRODUCTS, json).apply()
    }
}
