package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.quickkart.app.databinding.ActivityForgotPasswordBinding
import com.quickkart.app.models.ForgotPasswordRequest
import com.quickkart.app.models.ResetPasswordRequest
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.isValidEmail
import com.quickkart.app.utils.isValidPassword
import kotlinx.coroutines.launch

class ForgotPasswordActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityForgotPasswordBinding
    private var currentStep = 1
    private var userEmail = ""
    private var generatedOtp = ""
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityForgotPasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        binding.backButton.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }
        
        binding.loginLinkContainer.setOnClickListener {
            finish()
        }
        
        binding.loginLink.setOnClickListener {
            finish()
        }
        
        // Step 1: Send OTP
        binding.sendOtpButton.setOnClickListener {
            attemptSendOtp()
        }
        
        // Step 2: Verify OTP
        binding.verifyOtpButton.setOnClickListener {
            attemptVerifyOtp()
        }
        
        binding.resendOtpLink.setOnClickListener {
            attemptSendOtp()
        }
        
        // Step 3: Reset Password
        binding.resetPasswordButton.setOnClickListener {
            attemptResetPassword()
        }
    }
    
    private fun attemptSendOtp() {
        val email = binding.emailInput.text.toString().trim()
        
        if (email.isEmpty()) {
            binding.emailInputLayout.error = "Email is required"
            return
        }
        
        if (!email.isValidEmail()) {
            binding.emailInputLayout.error = "Please enter a valid email"
            return
        }
        
        binding.emailInputLayout.error = null
        userEmail = email
        
        sendOtp(email)
    }
    
    private fun sendOtp(email: String) {
        setStep1Loading(true)
        hideMessages()
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.forgotPassword(
                    ForgotPasswordRequest(email)
                )
                
                if (response.isSuccessful && response.body() != null) {
                    val body = response.body()!!
                    generatedOtp = body.otp
                    
                    // Show demo OTP
                    binding.demoOtpText.text = generatedOtp
                    
                    showSuccess("Verification code sent to $email")
                    goToStep(2)
                } else {
                    val errorMessage = response.errorBody()?.string() ?: "Failed to send code"
                    showError(parseError(errorMessage))
                }
            } catch (e: Exception) {
                showError("Network error. Please try again.")
            } finally {
                setStep1Loading(false)
            }
        }
    }
    
    private fun attemptVerifyOtp() {
        val otp = binding.otpInput.text.toString().trim()
        
        if (otp.isEmpty()) {
            binding.otpInputLayout.error = "Please enter the code"
            return
        }
        
        if (otp.length != 6) {
            binding.otpInputLayout.error = "Code must be 6 digits"
            return
        }
        
        binding.otpInputLayout.error = null
        
        // Verify OTP locally (could also verify on server)
        if (otp == generatedOtp) {
            hideMessages()
            goToStep(3)
        } else {
            showError("Invalid verification code")
        }
    }
    
    private fun attemptResetPassword() {
        val newPassword = binding.newPasswordInput.text.toString()
        val confirmPassword = binding.confirmPasswordInput.text.toString()
        
        var isValid = true
        
        if (newPassword.isEmpty()) {
            binding.newPasswordInputLayout.error = "Password is required"
            isValid = false
        } else if (!newPassword.isValidPassword()) {
            binding.newPasswordInputLayout.error = "Password must be at least 6 characters"
            isValid = false
        } else {
            binding.newPasswordInputLayout.error = null
        }
        
        if (confirmPassword.isEmpty()) {
            binding.confirmPasswordInputLayout.error = "Please confirm your password"
            isValid = false
        } else if (newPassword != confirmPassword) {
            binding.confirmPasswordInputLayout.error = "Passwords do not match"
            isValid = false
        } else {
            binding.confirmPasswordInputLayout.error = null
        }
        
        if (isValid) {
            resetPassword(newPassword)
        }
    }
    
    private fun resetPassword(newPassword: String) {
        setStep3Loading(true)
        hideMessages()
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.resetPassword(
                    ResetPasswordRequest(
                        email = userEmail,
                        otp = generatedOtp,
                        newPassword = newPassword
                    )
                )
                
                if (response.isSuccessful) {
                    showSuccess("Password reset successful! Please login with your new password.")
                    
                    // Navigate to login after a delay
                    binding.root.postDelayed({
                        val intent = Intent(this@ForgotPasswordActivity, LoginActivity::class.java)
                        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK
                        startActivity(intent)
                        finish()
                    }, 2000)
                } else {
                    val errorMessage = response.errorBody()?.string() ?: "Failed to reset password"
                    showError(parseError(errorMessage))
                }
            } catch (e: Exception) {
                showError("Network error. Please try again.")
            } finally {
                setStep3Loading(false)
            }
        }
    }
    
    private fun goToStep(step: Int) {
        currentStep = step
        binding.viewFlipper.displayedChild = step - 1
        updateStepIndicator()
        
        // Update title based on step
        when (step) {
            1 -> {
                binding.pageTitle.text = "Forgot Password?"
                binding.pageSubtitle.text = "No worries, we'll help you reset it"
            }
            2 -> {
                binding.pageTitle.text = "Verify Code"
                binding.pageSubtitle.text = "Enter the 6-digit code we sent"
            }
            3 -> {
                binding.pageTitle.text = "New Password"
                binding.pageSubtitle.text = "Create a strong password"
            }
        }
    }
    
    private fun updateStepIndicator() {
        binding.step1Indicator.alpha = if (currentStep >= 1) 1f else 0.3f
        binding.step2Indicator.alpha = if (currentStep >= 2) 1f else 0.3f
        binding.step3Indicator.alpha = if (currentStep >= 3) 1f else 0.3f
    }
    
    private fun setStep1Loading(loading: Boolean) {
        binding.sendOtpButton.isEnabled = !loading
        binding.step1Progress.visibility = if (loading) View.VISIBLE else View.GONE
        binding.sendOtpButton.text = if (loading) "" else "Send Code"
    }
    
    private fun setStep3Loading(loading: Boolean) {
        binding.resetPasswordButton.isEnabled = !loading
        binding.step3Progress.visibility = if (loading) View.VISIBLE else View.GONE
        binding.resetPasswordButton.text = if (loading) "" else "Reset Password"
    }
    
    private fun showError(message: String) {
        binding.errorCard.visibility = View.VISIBLE
        binding.errorText.text = message
        binding.successCard.visibility = View.GONE
    }
    
    private fun showSuccess(message: String) {
        binding.successCard.visibility = View.VISIBLE
        binding.successText.text = message
        binding.errorCard.visibility = View.GONE
    }
    
    private fun hideMessages() {
        binding.errorCard.visibility = View.GONE
        binding.successCard.visibility = View.GONE
    }
    
    private fun parseError(errorBody: String): String {
        return try {
            // Try to extract error message from JSON
            val start = errorBody.indexOf("\"error\":\"") + 9
            val end = errorBody.indexOf("\"", start)
            if (start > 8 && end > start) {
                errorBody.substring(start, end)
            } else {
                errorBody
            }
        } catch (e: Exception) {
            "An error occurred"
        }
    }
    
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (currentStep > 1) {
            goToStep(currentStep - 1)
        } else {
            super.onBackPressed()
        }
    }
}
