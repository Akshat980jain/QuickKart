package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityLoginBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.utils.isValidEmail
import com.quickkart.app.utils.isValidPassword
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityLoginBinding
    private var isLoading = false
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        binding.loginButton.setOnClickListener {
            if (!isLoading) {
                attemptLogin()
            }
        }
        
        // Make both the link and container clickable for better UX
        val navigateToRegister: (android.view.View) -> Unit = {
            // Start RegisterActivity
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            startActivity(intent)
        }
        
        binding.signUpLink.setOnClickListener(navigateToRegister)
        binding.signUpContainer.setOnClickListener(navigateToRegister)
        
        binding.forgotPasswordLink.setOnClickListener {
            Snackbar.make(binding.root, "Forgot password feature coming soon", Snackbar.LENGTH_SHORT).show()
        }
        
        binding.googleButton.setOnClickListener {
            Snackbar.make(binding.root, "Google sign-in coming soon", Snackbar.LENGTH_SHORT).show()
        }
        
        binding.facebookButton.setOnClickListener {
            Snackbar.make(binding.root, "Facebook sign-in coming soon", Snackbar.LENGTH_SHORT).show()
        }
    }
    
    private fun attemptLogin() {
        val email = binding.emailInput.text.toString().trim()
        val password = binding.passwordInput.text.toString()
        
        // Validate inputs
        if (email.isEmpty()) {
            binding.emailInputLayout.error = "Email is required"
            return
        }
        
        if (!email.isValidEmail()) {
            binding.emailInputLayout.error = "Please enter a valid email"
            return
        }
        
        binding.emailInputLayout.error = null
        
        if (password.isEmpty()) {
            binding.passwordInputLayout.error = "Password is required"
            return
        }
        
        if (!password.isValidPassword()) {
            binding.passwordInputLayout.error = "Password must be at least 6 characters"
            return
        }
        
        binding.passwordInputLayout.error = null
        
        // Perform login
        performLogin(email, password)
    }
    
    private fun performLogin(email: String, password: String) {
        setLoading(true)
        
        lifecycleScope.launch {
            val result = AuthManager.login(email, password)
            
            result.onSuccess {
                startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                finishAffinity()
            }.onFailure { exception ->
                setLoading(false)
                showError(exception.message ?: "Login failed. Please try again.")
            }
        }
    }
    
    private fun setLoading(loading: Boolean) {
        isLoading = loading
        binding.loginButton.isEnabled = !loading
        binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        binding.loginButton.text = if (loading) "Signing in..." else "Sign in"
    }
    
    private fun showError(message: String) {
        binding.errorCard.visibility = View.VISIBLE
        binding.errorText.text = message
    }
}
