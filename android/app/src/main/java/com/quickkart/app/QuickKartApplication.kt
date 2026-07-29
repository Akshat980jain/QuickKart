package com.quickkart.app

import android.app.Application
import com.quickkart.app.managers.ThemeManager

class QuickKartApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        instance = this
        ThemeManager.init()
    }
    
    companion object {
        lateinit var instance: QuickKartApplication
            private set
    }
}
