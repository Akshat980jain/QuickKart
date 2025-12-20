package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityRegisterBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.utils.isValidEmail
import com.quickkart.app.utils.isValidPassword
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityRegisterBinding
    private var isLoading = false
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        binding.registerButton.setOnClickListener {
            if (!isLoading) {
                attemptRegister()
            }
        }
        
        // Make both the link and container clickable
        val navigateBack: (android.view.View) -> Unit = {
            finish()
        }
        
        binding.signInLink.setOnClickListener(navigateBack)
        binding.signInContainer.setOnClickListener(navigateBack)
        
        binding.backButton.setOnClickListener {
            finish()
        }
    }
    
    private fun attemptRegister() {
        val name = binding.nameInput.text.toString().trim()
        val phone = binding.phoneInput.text.toString().trim()
        val email = binding.emailInput.text.toString().trim()
        val password = binding.passwordInput.text.toString()
        val confirmPassword = binding.confirmPasswordInput.text.toString()
        
        // Validate inputs
        var isValid = true
        
        if (name.isEmpty()) {
            binding.nameInputLayout.error = "Name is required"
            isValid = false
        } else if (name.length < 2) {
            binding.nameInputLayout.error = "Name must be at least 2 characters"
            isValid = false
        } else {
            binding.nameInputLayout.error = null
        }
        
        // Phone validation (optional but if provided, validate format)
        if (phone.isNotEmpty() && phone.length < 10) {
            binding.phoneInputLayout.error = "Please enter a valid phone number"
            isValid = false
        } else {
            binding.phoneInputLayout.error = null
        }
        
        if (email.isEmpty()) {
            binding.emailInputLayout.error = "Email is required"
            isValid = false
        } else if (!email.isValidEmail()) {
            binding.emailInputLayout.error = "Please enter a valid email"
            isValid = false
        } else {
            binding.emailInputLayout.error = null
        }
        
        if (password.isEmpty()) {
            binding.passwordInputLayout.error = "Password is required"
            isValid = false
        } else if (!password.isValidPassword()) {
            binding.passwordInputLayout.error = "Password must be at least 6 characters"
            isValid = false
        } else {
            binding.passwordInputLayout.error = null
        }
        
        if (confirmPassword.isEmpty()) {
            binding.confirmPasswordInputLayout.error = "Please confirm your password"
            isValid = false
        } else if (password != confirmPassword) {
            binding.confirmPasswordInputLayout.error = "Passwords do not match"
            isValid = false
        } else {
            binding.confirmPasswordInputLayout.error = null
        }
        
        if (!binding.termsCheckbox.isChecked) {
            binding.termsError.visibility = View.VISIBLE
            isValid = false
        } else {
            binding.termsError.visibility = View.GONE
        }
        
        if (isValid) {
            performRegister(name, email, password)
        }
    }
    
    private fun performRegister(name: String, email: String, password: String) {
        setLoading(true)
        
        lifecycleScope.launch {
            val result = AuthManager.register(name, email, password)
            
            result.onSuccess {
                startActivity(Intent(this@RegisterActivity, MainActivity::class.java))
                finishAffinity()
            }.onFailure { exception ->
                setLoading(false)
                showError(exception.message ?: "Registration failed. Please try again.")
            }
        }
    }
    
    private fun setLoading(loading: Boolean) {
        isLoading = loading
        binding.registerButton.isEnabled = !loading
        binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        binding.registerButton.text = if (loading) "Creating account..." else "Create Account"
    }
    
    private fun showError(message: String) {
        binding.errorCard.visibility = View.VISIBLE
        binding.errorText.text = message
    }
}
