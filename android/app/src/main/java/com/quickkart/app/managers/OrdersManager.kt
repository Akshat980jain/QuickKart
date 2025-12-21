package com.quickkart.app.managers

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.Order
import com.quickkart.app.models.CartItem
import com.quickkart.app.models.Address

object OrdersManager {
    
    private const val PREFS_NAME = "orders_prefs"
    private const val KEY_ORDERS = "orders_list"
    
    private val prefs by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Save a new order
     */
    fun saveOrder(order: Order) {
        val orders = getAllOrders().toMutableList()
        orders.add(0, order) // Add to beginning (newest first)
        saveOrders(orders)
    }
    
    /**
     * Create and save order from cart items
     */
    fun createOrder(
        items: List<CartItem>,
        totalAmount: Double,
        shippingAddress: Address?,
        paymentMethod: String
    ): Order {
        val order = Order(
            id = "QK-${(100000..999999).random()}",
            userId = AuthManager.currentUser?.id ?: "guest",
            items = items,
            totalAmount = totalAmount,
            status = "processing",
            shippingAddress = shippingAddress,
            paymentMethod = paymentMethod,
            createdAt = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                .format(java.util.Date()),
            updatedAt = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                .format(java.util.Date())
        )
        saveOrder(order)
        return order
    }
    
    /**
     * Get all orders
     */
    fun getAllOrders(): List<Order> {
        val json = prefs.getString(KEY_ORDERS, null) ?: return emptyList()
        val type = object : TypeToken<List<Order>>() {}.type
        return try {
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    /**
     * Get active/upcoming orders (pending, processing, shipped)
     */
    fun getActiveOrders(): List<Order> {
        return getAllOrders().filter { order ->
            order.status in listOf("pending", "processing", "shipped")
        }
    }
    
    /**
     * Get delivered orders
     */
    fun getDeliveredOrders(): List<Order> {
        return getAllOrders().filter { order ->
            order.status == "delivered"
        }
    }
    
    /**
     * Update order status
     */
    fun updateOrderStatus(orderId: String, newStatus: String) {
        val orders = getAllOrders().toMutableList()
        val index = orders.indexOfFirst { it.id == orderId }
        if (index != -1) {
            val order = orders[index]
            orders[index] = order.copy(
                status = newStatus,
                updatedAt = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                    .format(java.util.Date())
            )
            saveOrders(orders)
        }
    }
    
    /**
     * Get order by ID
     */
    fun getOrderById(orderId: String): Order? {
        return getAllOrders().find { it.id == orderId }
    }
    
    /**
     * Cancel an order (for pending/processing orders)
     */
    fun cancelOrder(orderId: String, reason: String, refundMethod: String, refundDetails: Map<String, String>): Boolean {
        val orders = getAllOrders().toMutableList()
        val index = orders.indexOfFirst { it.id == orderId }
        if (index != -1) {
            val order = orders[index]
            // Only allow cancellation for pending/processing orders
            if (order.status in listOf("pending", "processing")) {
                orders[index] = order.copy(
                    status = "cancelled",
                    updatedAt = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                        .format(java.util.Date())
                )
                saveOrders(orders)
                return true
            }
        }
        return false
    }
    
    /**
     * Request return for a delivered order
     */
    fun requestReturn(orderId: String, reason: String, refundMethod: String, refundDetails: Map<String, String>): Boolean {
        val orders = getAllOrders().toMutableList()
        val index = orders.indexOfFirst { it.id == orderId }
        if (index != -1) {
            val order = orders[index]
            // Only allow return for delivered orders
            if (order.status == "delivered") {
                orders[index] = order.copy(
                    status = "return_requested",
                    updatedAt = java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", java.util.Locale.getDefault())
                        .format(java.util.Date())
                )
                saveOrders(orders)
                return true
            }
        }
        return false
    }
    
    /**
     * Delete a specific order by ID
     */
    fun deleteOrder(orderId: String): Boolean {
        val orders = getAllOrders().toMutableList()
        val removed = orders.removeIf { it.id == orderId }
        if (removed) {
            saveOrders(orders)
        }
        return removed
    }
    
    /**
     * Clear all orders (for testing/logout)
     */
    fun clearOrders() {
        prefs.edit().remove(KEY_ORDERS).apply()
    }
    
    private fun saveOrders(orders: List<Order>) {
        val json = gson.toJson(orders)
        prefs.edit().putString(KEY_ORDERS, json).apply()
    }
}
