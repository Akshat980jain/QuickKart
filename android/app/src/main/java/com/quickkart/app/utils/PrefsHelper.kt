package com.quickkart.app.utils

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.CartItem
import com.quickkart.app.models.User

object PrefsHelper {
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(
            Constants.PREFS_NAME,
            Context.MODE_PRIVATE
        )
    }
    
    private val gson = Gson()
    
    // Auth Token
    var authToken: String?
        get() = prefs.getString(Constants.KEY_AUTH_TOKEN, null)
        set(value) {
            prefs.edit().putString(Constants.KEY_AUTH_TOKEN, value).apply()
        }
    
    // User
    var user: User?
        get() {
            val json = prefs.getString(Constants.KEY_USER, null)
            return json?.let { gson.fromJson(it, User::class.java) }
        }
        set(value) {
            val json = value?.let { gson.toJson(it) }
            prefs.edit().putString(Constants.KEY_USER, json).apply()
        }
    
    // Cart Items
    var cartItems: List<CartItem>
        get() {
            val json = prefs.getString(Constants.KEY_CART, null)
            return if (json != null) {
                val type = object : TypeToken<List<CartItem>>() {}.type
                gson.fromJson(json, type)
            } else {
                emptyList()
            }
        }
        set(value) {
            val json = gson.toJson(value)
            prefs.edit().putString(Constants.KEY_CART, json).apply()
        }
    
    // Check if logged in
    val isLoggedIn: Boolean
        get() = authToken != null && user != null
    
    // Clear all auth data
    fun clearAuth() {
        prefs.edit()
            .remove(Constants.KEY_AUTH_TOKEN)
            .remove(Constants.KEY_USER)
            .apply()
    }
    
    // Clear cart
    fun clearCart() {
        prefs.edit().remove(Constants.KEY_CART).apply()
    }
    
    // Clear all data
    fun clearAll() {
        prefs.edit().clear().apply()
    }
}
