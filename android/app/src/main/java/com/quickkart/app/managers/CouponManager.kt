package com.quickkart.app.managers

import android.content.Context
import android.content.SharedPreferences
import com.quickkart.app.QuickKartApplication
import com.quickkart.app.models.Coupon

/**
 * Manages coupon operations
 */
object CouponManager {
    
    private const val PREFS_NAME = "coupon_prefs"
    private const val KEY_APPLIED_COUPON = "applied_coupon"
    
    private val prefs: SharedPreferences by lazy {
        QuickKartApplication.instance.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    
    // Pre-defined coupons (in real app, fetch from API)
    private val availableCoupons = listOf(
        Coupon(
            code = "WELCOME10",
            description = "10% off on your first order",
            discountPercentage = 10,
            maxDiscount = 200.0,
            minOrderAmount = 500.0,
            expiryDate = "2025-12-31"
        ),
        Coupon(
            code = "SAVE20",
            description = "20% off on orders above ₹1000",
            discountPercentage = 20,
            maxDiscount = 500.0,
            minOrderAmount = 1000.0,
            expiryDate = "2025-12-31"
        ),
        Coupon(
            code = "FLAT50",
            description = "Flat ₹50 off on orders above ₹300",
            discountPercentage = 100,
            maxDiscount = 50.0,
            minOrderAmount = 300.0,
            expiryDate = "2025-12-31"
        ),
        Coupon(
            code = "QUICK15",
            description = "15% off - QuickKart Special",
            discountPercentage = 15,
            maxDiscount = 300.0,
            minOrderAmount = 700.0,
            expiryDate = "2025-12-31"
        )
    )
    
    /**
     * Get all available coupons
     */
    fun getAvailableCoupons(): List<Coupon> {
        return availableCoupons.filter { it.isActive }
    }
    
    /**
     * Validate and get coupon by code
     */
    fun validateCoupon(code: String, orderAmount: Double): CouponResult {
        val coupon = availableCoupons.find { 
            it.code.equals(code.trim(), ignoreCase = true) && it.isActive 
        }
        
        if (coupon == null) {
            return CouponResult.Invalid("Invalid coupon code")
        }
        
        if (orderAmount < coupon.minOrderAmount) {
            return CouponResult.Invalid(
                "Minimum order amount is ₹${coupon.minOrderAmount.toInt()}"
            )
        }
        
        return CouponResult.Valid(coupon, coupon.calculateDiscount(orderAmount))
    }
    
    /**
     * Save applied coupon code
     */
    fun saveAppliedCoupon(code: String) {
        prefs.edit().putString(KEY_APPLIED_COUPON, code).apply()
    }
    
    /**
     * Get applied coupon code
     */
    fun getAppliedCouponCode(): String? {
        return prefs.getString(KEY_APPLIED_COUPON, null)
    }
    
    /**
     * Clear applied coupon
     */
    fun clearAppliedCoupon() {
        prefs.edit().remove(KEY_APPLIED_COUPON).apply()
    }
    
    sealed class CouponResult {
        data class Valid(val coupon: Coupon, val discountAmount: Double) : CouponResult()
        data class Invalid(val message: String) : CouponResult()
    }
}
