package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.Product

/**
 * Manages wishlist operations using SharedPreferences
 */
object WishlistManager {
    
    private const val PREFS_NAME = "wishlist_prefs"
    private const val KEY_WISHLIST = "wishlist_items"
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Get all wishlist items
     */
    fun getWishlist(): List<Product> {
        val json = prefs.getString(KEY_WISHLIST, null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<Product>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    /**
     * Check if product is in wishlist
     */
    fun isInWishlist(productId: String): Boolean {
        return getWishlist().any { it.id == productId }
    }
    
    /**
     * Add product to wishlist
     */
    fun addToWishlist(product: Product): Boolean {
        if (isInWishlist(product.id)) return false
        
        val items = getWishlist().toMutableList()
        items.add(0, product) // Add to beginning
        saveWishlist(items)
        return true
    }
    
    /**
     * Remove product from wishlist
     */
    fun removeFromWishlist(productId: String): Boolean {
        val items = getWishlist().toMutableList()
        val removed = items.removeIf { it.id == productId }
        if (removed) {
            saveWishlist(items)
        }
        return removed
    }
    
    /**
     * Toggle wishlist status
     */
    fun toggleWishlist(product: Product): Boolean {
        return if (isInWishlist(product.id)) {
            removeFromWishlist(product.id)
            false // Not in wishlist anymore
        } else {
            addToWishlist(product)
            true // Now in wishlist
        }
    }
    
    /**
     * Get wishlist count
     */
    fun getWishlistCount(): Int {
        return getWishlist().size
    }
    
    /**
     * Clear wishlist
     */
    fun clearWishlist() {
        prefs.edit().remove(KEY_WISHLIST).apply()
    }
    
    private fun saveWishlist(items: List<Product>) {
        val json = gson.toJson(items)
        prefs.edit().putString(KEY_WISHLIST, json).apply()
    }
}
