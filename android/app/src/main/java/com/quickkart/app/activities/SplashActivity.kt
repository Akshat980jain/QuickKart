package com.quickkart.app.activities

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.quickkart.app.R

@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {
    
    private val splashDuration = 2000L
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        
        Handler(Looper.getMainLooper()).postDelayed({
            navigateToNextScreen()
        }, splashDuration)
    }
    
    private fun navigateToNextScreen() {
        // Always go to MainActivity - login is optional
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}
