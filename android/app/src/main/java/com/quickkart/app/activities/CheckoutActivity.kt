package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityCheckoutBinding
import com.quickkart.app.managers.CartManager
import com.quickkart.app.models.Address
import com.quickkart.app.utils.formatPrice

class CheckoutActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityCheckoutBinding
    private var currentStep = 1
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupToolbar()
        setupViews()
        setupClickListeners()
    }
    
    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener {
            if (currentStep > 1) {
                showStep(currentStep - 1)
            } else {
                finish()
            }
        }
    }
    
    private fun setupViews() {
        showStep(1)
    }
    
    private fun setupClickListeners() {
        binding.nextButton.setOnClickListener {
            when (currentStep) {
                1 -> {
                    if (validateShippingForm()) {
                        showStep(2)
                    }
                }
                2 -> {
                    if (validatePaymentForm()) {
                        showStep(3)
                    }
                }
                3 -> {
                    placeOrder()
                }
            }
        }
        
        binding.backButton.setOnClickListener {
            if (currentStep > 1) {
                showStep(currentStep - 1)
            }
        }
    }
    
    private fun showStep(step: Int) {
        currentStep = step
        
        // Hide all cards
        binding.shippingCard.visibility = View.GONE
        binding.paymentCard.visibility = View.GONE
        binding.reviewCard.visibility = View.GONE
        
        // Update step indicators
        binding.step1.setBackgroundResource(if (step >= 1) R.drawable.circle_primary else R.drawable.circle_divider)
        binding.step2.setBackgroundResource(if (step >= 2) R.drawable.circle_primary else R.drawable.circle_divider)
        binding.step3.setBackgroundResource(if (step >= 3) R.drawable.circle_primary else R.drawable.circle_divider)
        
        // Show/hide back button
        binding.backButton.visibility = if (step > 1) View.VISIBLE else View.GONE
        
        // Update button text
        when (step) {
            1 -> {
                binding.shippingCard.visibility = View.VISIBLE
                binding.toolbar.title = "Shipping Information"
                binding.nextButton.text = "Continue to Payment"
            }
            2 -> {
                binding.paymentCard.visibility = View.VISIBLE
                binding.toolbar.title = "Payment Method"
                binding.nextButton.text = "Review Order"
            }
            3 -> {
                binding.reviewCard.visibility = View.VISIBLE
                binding.toolbar.title = "Review Order"
                binding.nextButton.text = "Place Order"
                populateReviewStep()
            }
        }
    }
    
    private fun validateShippingForm(): Boolean {
        var isValid = true
        
        if (binding.firstNameInput.text.isNullOrBlank()) {
            binding.firstNameLayout.error = "First name is required"
            isValid = false
        } else {
            binding.firstNameLayout.error = null
        }
        
        if (binding.lastNameInput.text.isNullOrBlank()) {
            binding.lastNameLayout.error = "Last name is required"
            isValid = false
        } else {
            binding.lastNameLayout.error = null
        }
        
        if (binding.addressInput.text.isNullOrBlank()) {
            binding.addressLayout.error = "Address is required"
            isValid = false
        } else {
            binding.addressLayout.error = null
        }
        
        if (binding.cityInput.text.isNullOrBlank()) {
            binding.cityLayout.error = "City is required"
            isValid = false
        } else {
            binding.cityLayout.error = null
        }
        
        if (binding.stateInput.text.isNullOrBlank()) {
            binding.stateLayout.error = "State is required"
            isValid = false
        } else {
            binding.stateLayout.error = null
        }
        
        if (binding.zipInput.text.isNullOrBlank()) {
            binding.zipLayout.error = "ZIP code is required"
            isValid = false
        } else {
            binding.zipLayout.error = null
        }
        
        if (binding.phoneInput.text.isNullOrBlank()) {
            binding.phoneLayout.error = "Phone number is required"
            isValid = false
        } else {
            binding.phoneLayout.error = null
        }
        
        return isValid
    }
    
    private fun validatePaymentForm(): Boolean {
        val selectedPaymentId = binding.paymentMethodGroup.checkedRadioButtonId
        if (selectedPaymentId == -1) {
            Snackbar.make(binding.root, "Please select a payment method", Snackbar.LENGTH_SHORT).show()
            return false
        }
        return true
    }
    
    private fun populateReviewStep() {
        // Shipping address summary
        val address = getShippingAddress()
        binding.reviewShippingAddress.text = "Shipping to: ${address.fullAddress}"
        
        // Payment method summary
        val paymentMethod = when (binding.paymentMethodGroup.checkedRadioButtonId) {
            R.id.creditCardRadio -> "Credit Card"
            R.id.debitCardRadio -> "Debit Card"
            R.id.upiRadio -> "UPI"
            R.id.codRadio -> "Cash on Delivery"
            else -> "Not selected"
        }
        binding.reviewPaymentMethod.text = "Payment: $paymentMethod"
        
        // Order total
        val total = CartManager.getOrderTotal()
        binding.reviewTotal.text = "Total: ${total.formatPrice()}"
    }
    
    private fun getShippingAddress(): Address {
        return Address(
            firstName = binding.firstNameInput.text.toString(),
            lastName = binding.lastNameInput.text.toString(),
            address1 = binding.addressInput.text.toString(),
            address2 = "",
            city = binding.cityInput.text.toString(),
            state = binding.stateInput.text.toString(),
            zipCode = binding.zipInput.text.toString(),
            country = "India",
            phone = binding.phoneInput.text.toString()
        )
    }
    
    private fun placeOrder() {
        binding.nextButton.isEnabled = false
        binding.nextButton.text = "Processing..."
        binding.progressBar.visibility = View.VISIBLE
        
        // Simulate order processing
        binding.root.postDelayed({
            CartManager.clearCart()
            
            val intent = Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
                putExtra("show_order_success", true)
            }
            startActivity(intent)
            finish()
        }, 2000)
    }
}
