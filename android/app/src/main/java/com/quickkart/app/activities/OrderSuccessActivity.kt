package com.quickkart.app.activities

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.OvershootInterpolator
import android.widget.FrameLayout
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.animation.doOnEnd
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityOrderSuccessBinding
import com.quickkart.app.managers.OrdersManager
import com.quickkart.app.models.Order
import kotlin.random.Random

class OrderSuccessActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityOrderSuccessBinding
    private val confettiViews = mutableListOf<View>()
    
    private var savedOrderId: String = ""
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOrderSuccessBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        saveOrderAndSetupUI()
        setupClickListeners()
        startAnimations()
    }
    
    private fun saveOrderAndSetupUI() {
        // Get order details from intent
        val totalAmount = intent.getDoubleExtra("total_amount", 0.0)
        val paymentMethod = intent.getStringExtra("payment_method") ?: "Card"
        
        // Create and save the order
        val order = OrdersManager.createOrder(
            items = emptyList(), // Cart was already cleared, but order is saved
            totalAmount = totalAmount,
            shippingAddress = null,
            paymentMethod = paymentMethod
        )
        
        savedOrderId = order.id
        binding.orderIdText.text = "Order ID: #${order.id}"
    }
    
    private fun setupClickListeners() {
        binding.continueShoppingButton.setOnClickListener {
            navigateToHome()
        }
        
        binding.viewOrdersButton.setOnClickListener {
            // Navigate to orders
            val intent = Intent(this, OrdersActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
    
    private fun navigateToHome() {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
        }
        startActivity(intent)
        finish()
    }
    
    private fun startAnimations() {
        // Start confetti immediately
        startConfettiAnimation()
        
        // Animate success icon
        binding.successIcon.animate()
            .alpha(1f)
            .scaleX(1f)
            .scaleY(1f)
            .setDuration(600)
            .setInterpolator(OvershootInterpolator(1.5f))
            .start()
        
        // Animate text elements with staggered delays
        animateViewIn(binding.hurrayText, 200)
        animateViewIn(binding.successTitle, 350)
        animateViewIn(binding.successMessage, 500)
        animateViewIn(binding.orderIdText, 650)
        animateViewIn(binding.continueShoppingButton, 800)
        animateViewIn(binding.viewOrdersButton, 950)
    }
    
    private fun animateViewIn(view: View, delay: Long) {
        view.animate()
            .alpha(1f)
            .translationY(0f)
            .setDuration(500)
            .setStartDelay(delay)
            .setInterpolator(AccelerateDecelerateInterpolator())
            .start()
    }
    
    private fun startConfettiAnimation() {
        val confettiColors = listOf(
            Color.parseColor("#FF6B6B"),  // Red
            Color.parseColor("#4ECDC4"),  // Teal
            Color.parseColor("#FFE66D"),  // Yellow
            Color.parseColor("#A8E6CF"),  // Light Green
            Color.parseColor("#DDA0DD"),  // Plum
            Color.parseColor("#87CEEB"),  // Sky Blue
            Color.parseColor("#FFA500"),  // Orange
            Color.parseColor("#16A34A")   // Green (primary success)
        )
        
        val container = binding.confettiContainer
        val screenWidth = resources.displayMetrics.widthPixels
        val screenHeight = resources.displayMetrics.heightPixels
        
        // Create multiple waves of confetti
        repeat(3) { wave ->
            container.postDelayed({
                repeat(20) {
                    createConfettiParticle(container, confettiColors, screenWidth, screenHeight)
                }
            }, wave * 500L)
        }
    }
    
    private fun createConfettiParticle(
        container: FrameLayout,
        colors: List<Int>,
        screenWidth: Int,
        screenHeight: Int
    ) {
        val particle = View(this).apply {
            val size = Random.nextInt(8, 16)
            layoutParams = FrameLayout.LayoutParams(size, size)
            
            // Random shape - circle or rectangle
            if (Random.nextBoolean()) {
                setBackgroundResource(R.drawable.confetti_particle)
            } else {
                setBackgroundColor(colors.random())
            }
            
            // Random starting position at the top
            x = Random.nextFloat() * screenWidth
            y = -50f
            rotation = Random.nextFloat() * 360
        }
        
        container.addView(particle)
        confettiViews.add(particle)
        
        // Animate the particle falling with rotation
        val duration = Random.nextLong(2000, 4000)
        val fallDistance = screenHeight + 100f
        val horizontalDrift = Random.nextFloat() * 200 - 100
        
        val fallAnimator = ObjectAnimator.ofFloat(particle, "translationY", 0f, fallDistance)
        val driftAnimator = ObjectAnimator.ofFloat(particle, "translationX", 0f, horizontalDrift)
        val rotateAnimator = ObjectAnimator.ofFloat(particle, "rotation", 0f, Random.nextFloat() * 720 - 360)
        val alphaAnimator = ObjectAnimator.ofFloat(particle, "alpha", 1f, 0f).apply {
            startDelay = duration - 500
        }
        
        AnimatorSet().apply {
            playTogether(fallAnimator, driftAnimator, rotateAnimator, alphaAnimator)
            this.duration = duration
            interpolator = AccelerateDecelerateInterpolator()
            doOnEnd {
                container.removeView(particle)
                confettiViews.remove(particle)
            }
            start()
        }
    }
    
    override fun onBackPressed() {
        // Go to home instead of back to checkout
        navigateToHome()
    }
    
    override fun onDestroy() {
        super.onDestroy()
        // Clean up any remaining confetti
        confettiViews.forEach { binding.confettiContainer.removeView(it) }
        confettiViews.clear()
    }
}
