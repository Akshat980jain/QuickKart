package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.SavedAddress
import java.util.UUID

/**
 * Manages saved addresses using SharedPreferences
 */
object AddressManager {
    
    private const val PREFS_NAME = "address_prefs"
    private const val KEY_ADDRESSES = "saved_addresses"
    private const val KEY_DEFAULT_ADDRESS = "default_address_id"
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Get all saved addresses
     */
    fun getAddresses(): List<SavedAddress> {
        val json = prefs.getString(KEY_ADDRESSES, null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<SavedAddress>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    /**
     * Add a new address
     */
    fun addAddress(address: SavedAddress): Boolean {
        val addresses = getAddresses().toMutableList()
        
        // If this is the first address or marked as default, update defaults
        val newAddr = if (addresses.isEmpty()) {
            address.copy(isDefault = true)
        } else if (address.isDefault) {
            // Clear other defaults
            val updated = addresses.map { it.copy(isDefault = false) }
            addresses.clear()
            addresses.addAll(updated)
            address
        } else {
            address
        }
        
        addresses.add(0, newAddr)
        saveAddresses(addresses)
        
        if (newAddr.isDefault) {
            setDefaultAddressId(newAddr.id)
        }
        
        return true
    }
    
    /**
     * Update an existing address
     */
    fun updateAddress(address: SavedAddress): Boolean {
        val addresses = getAddresses().toMutableList()
        val index = addresses.indexOfFirst { it.id == address.id }
        
        if (index == -1) return false
        
        // If setting as default, clear others
        if (address.isDefault) {
            val updated = addresses.map { 
                if (it.id == address.id) address else it.copy(isDefault = false) 
            }
            saveAddresses(updated)
            setDefaultAddressId(address.id)
        } else {
            addresses[index] = address
            saveAddresses(addresses)
        }
        
        return true
    }
    
    /**
     * Delete an address
     */
    fun deleteAddress(addressId: String): Boolean {
        val addresses = getAddresses().toMutableList()
        val removed = addresses.removeIf { it.id == addressId }
        
        if (removed) {
            saveAddresses(addresses)
            
            // If deleted address was default, set first as default
            if (getDefaultAddressId() == addressId && addresses.isNotEmpty()) {
                val newDefault = addresses[0].copy(isDefault = true)
                updateAddress(newDefault)
            }
        }
        
        return removed
    }
    
    /**
     * Get default address
     */
    fun getDefaultAddress(): SavedAddress? {
        val defaultId = getDefaultAddressId()
        return if (defaultId != null) {
            getAddresses().find { it.id == defaultId }
        } else {
            getAddresses().firstOrNull()
        }
    }
    
    /**
     * Set default address
     */
    fun setDefaultAddress(addressId: String) {
        val addresses = getAddresses()
        val updated = addresses.map { 
            it.copy(isDefault = it.id == addressId) 
        }
        saveAddresses(updated)
        setDefaultAddressId(addressId)
    }
    
    /**
     * Get address count
     */
    fun getAddressCount(): Int = getAddresses().size
    
    private fun saveAddresses(addresses: List<SavedAddress>) {
        val json = gson.toJson(addresses)
        prefs.edit().putString(KEY_ADDRESSES, json).apply()
    }
    
    private fun getDefaultAddressId(): String? = prefs.getString(KEY_DEFAULT_ADDRESS, null)
    
    private fun setDefaultAddressId(id: String) {
        prefs.edit().putString(KEY_DEFAULT_ADDRESS, id).apply()
    }
}
