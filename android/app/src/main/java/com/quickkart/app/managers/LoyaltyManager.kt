package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.quickkart.app.QuickKartApplication
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Manages loyalty points system
 */
object LoyaltyManager {
    
    private const val PREFS_NAME = "loyalty_prefs"
    private const val KEY_POINTS = "total_points"
    private const val KEY_HISTORY = "points_history"
    
    // Points configuration
    const val POINTS_PER_RUPEE = 1  // 1 point per rupee spent
    const val RUPEES_PER_POINT = 0.25  // Each point worth ₹0.25
    const val MIN_REDEEM_POINTS = 100
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    private val gson = Gson()
    
    /**
     * Get current points balance
     */
    fun getPointsBalance(): Int {
        return prefs.getInt(KEY_POINTS, 0)
    }
    
    /**
     * Add points (after purchase)
     */
    fun addPoints(orderAmount: Double, orderId: String) {
        val pointsEarned = (orderAmount * POINTS_PER_RUPEE).toInt()
        val currentPoints = getPointsBalance()
        prefs.edit().putInt(KEY_POINTS, currentPoints + pointsEarned).apply()
        
        // Save to history
        addToHistory(PointsTransaction(
            type = "earned",
            points = pointsEarned,
            description = "Order #${orderId.takeLast(8).uppercase()}",
            date = getCurrentDate()
        ))
    }
    
    /**
     * Redeem points for discount
     */
    fun redeemPoints(pointsToRedeem: Int): Double {
        if (pointsToRedeem < MIN_REDEEM_POINTS) return 0.0
        if (pointsToRedeem > getPointsBalance()) return 0.0
        
        val currentPoints = getPointsBalance()
        prefs.edit().putInt(KEY_POINTS, currentPoints - pointsToRedeem).apply()
        
        val discountAmount = pointsToRedeem * RUPEES_PER_POINT
        
        // Save to history
        addToHistory(PointsTransaction(
            type = "redeemed",
            points = -pointsToRedeem,
            description = "Redeemed for ₹${discountAmount.toInt()} discount",
            date = getCurrentDate()
        ))
        
        return discountAmount
    }
    
    /**
     * Calculate discount value for points
     */
    fun calculatePointsValue(points: Int): Double {
        return points * RUPEES_PER_POINT
    }
    
    /**
     * Get points history
     */
    fun getPointsHistory(): List<PointsTransaction> {
        val json = prefs.getString(KEY_HISTORY, null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<PointsTransaction>>() {}.type
            gson.fromJson(json, type) ?: emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }
    
    private fun addToHistory(transaction: PointsTransaction) {
        val history = getPointsHistory().toMutableList()
        history.add(0, transaction)
        // Keep only last 50 transactions
        val trimmed = history.take(50)
        val json = gson.toJson(trimmed)
        prefs.edit().putString(KEY_HISTORY, json).apply()
    }
    
    private fun getCurrentDate(): String {
        return SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
    }
    
    data class PointsTransaction(
        val type: String,  // "earned" or "redeemed"
        val points: Int,
        val description: String,
        val date: String
    )
}
