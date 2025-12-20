package com.quickkart.app.managers

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.quickkart.app.models.CartItem
import com.quickkart.app.models.Product
import com.quickkart.app.utils.Constants
import com.quickkart.app.utils.PrefsHelper

object CartManager {
    
    private val _cartItems = MutableLiveData<List<CartItem>>()
    val cartItems: LiveData<List<CartItem>> = _cartItems
    
    private val _totalItems = MutableLiveData<Int>()
    val totalItems: LiveData<Int> = _totalItems
    
    private val _totalPrice = MutableLiveData<Double>()
    val totalPrice: LiveData<Double> = _totalPrice
    
    init {
        loadCart()
    }
    
    private fun loadCart() {
        val items = PrefsHelper.cartItems
        _cartItems.value = items
        updateTotals(items)
    }
    
    private fun saveCart() {
        _cartItems.value?.let {
            PrefsHelper.cartItems = it
        }
    }
    
    private fun updateTotals(items: List<CartItem>) {
        _totalItems.value = items.sumOf { it.quantity }
        _totalPrice.value = items.sumOf { it.totalPrice }
    }
    
    fun addToCart(product: Product) {
        val currentItems = _cartItems.value?.toMutableList() ?: mutableListOf()
        val existingIndex = currentItems.indexOfFirst { it.product.id == product.id }
        
        if (existingIndex >= 0) {
            currentItems[existingIndex].quantity++
        } else {
            currentItems.add(CartItem(product, 1))
        }
        
        _cartItems.value = currentItems
        updateTotals(currentItems)
        saveCart()
    }
    
    fun removeFromCart(productId: String) {
        val currentItems = _cartItems.value?.toMutableList() ?: mutableListOf()
        currentItems.removeAll { it.product.id == productId }
        
        _cartItems.value = currentItems
        updateTotals(currentItems)
        saveCart()
    }
    
    fun updateQuantity(productId: String, quantity: Int) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        
        val currentItems = _cartItems.value?.toMutableList() ?: mutableListOf()
        val existingIndex = currentItems.indexOfFirst { it.product.id == productId }
        
        if (existingIndex >= 0) {
            currentItems[existingIndex].quantity = quantity
            _cartItems.value = currentItems
            updateTotals(currentItems)
            saveCart()
        }
    }
    
    fun clearCart() {
        _cartItems.value = emptyList()
        _totalItems.value = 0
        _totalPrice.value = 0.0
        PrefsHelper.clearCart()
    }
    
    fun getShippingCost(): Double {
        val total = _totalPrice.value ?: 0.0
        return if (total >= Constants.FREE_SHIPPING_THRESHOLD) 0.0 else Constants.SHIPPING_COST
    }
    
    fun getTaxAmount(): Double {
        val total = _totalPrice.value ?: 0.0
        return total * Constants.TAX_RATE
    }
    
    fun getOrderTotal(promoDiscount: Double = 0.0): Double {
        val subtotal = _totalPrice.value ?: 0.0
        val discount = subtotal * promoDiscount
        val shipping = getShippingCost()
        val tax = getTaxAmount()
        return subtotal + shipping + tax - discount
    }
    
    fun applyPromoCode(code: String): Double? {
        return Constants.PROMO_CODES[code.uppercase()]
    }
}
