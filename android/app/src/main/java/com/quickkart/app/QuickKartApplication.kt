package com.quickkart.app

import android.app.Application

class QuickKartApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        instance = this
    }
    
    companion object {
        lateinit var instance: QuickKartApplication
            private set
    }
}
