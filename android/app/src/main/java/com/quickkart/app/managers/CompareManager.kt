package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.Product

/**
 * Manages product comparison list
 */
object CompareManager {
    
    private const val PREFS_NAME = "compare_prefs"
    private const val KEY_PRODUCTS = "compare_products"
    private const val MAX_COMPARE_ITEMS = 4  // Usually compare up to 4 products
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Add product to compare list
     */
    fun addToCompare(product: Product): Boolean {
        val products = getCompareList().toMutableList()
        
        // Check if already exists
        if (products.any { it.id == product.id }) {
            return false
        }
        
        // Check max limit
        if (products.size >= MAX_COMPARE_ITEMS) {
            return false
        }
        
        products.add(product)
        saveProducts(products)
        return true
    }
    
    /**
     * Remove product from compare list
     */
    fun removeFromCompare(productId: String) {
        val products = getCompareList().toMutableList()
        products.removeAll { it.id == productId }
        saveProducts(products)
    }
    
    /**
     * Check if product is in compare list
     */
    fun isInCompare(productId: String): Boolean {
        return getCompareList().any { it.id == productId }
    }
    
    /**
     * Get products in compare list
     */
    fun getCompareList(): List<Product> {
        val json = prefs.getString(KEY_PRODUCTS, null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<Product>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    /**
     * Clear compare list
     */
    fun clear() {
        prefs.edit().remove(KEY_PRODUCTS).apply()
    }
    
    /**
     * Get compare count
     */
    fun getCount(): Int = getCompareList().size
    
    /**
     * Check if can add more
     */
    fun canAddMore(): Boolean = getCount() < MAX_COMPARE_ITEMS
    
    private fun saveProducts(products: List<Product>) {
        val json = gson.toJson(products)
        prefs.edit().putString(KEY_PRODUCTS, json).apply()
    }
}
