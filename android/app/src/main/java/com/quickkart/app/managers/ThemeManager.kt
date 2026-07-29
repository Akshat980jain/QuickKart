package com.quickkart.app.managers

import androidx.appcompat.app.AppCompatDelegate

/**
 * Manages app theme - Always light mode
 */
object ThemeManager {
    
    /**
     * Initialize theme on app start - Always light mode
     */
    fun init() {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
    }
}
