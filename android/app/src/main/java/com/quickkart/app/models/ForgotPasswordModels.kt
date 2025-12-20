package com.quickkart.app.models

// Request for forgot password
data class ForgotPasswordRequest(
    val email: String
)

// Response for forgot password
data class ForgotPasswordResponse(
    val message: String = "",
    val otp: String = "" // For demo only, won't be returned in production
)

// Request for reset password
data class ResetPasswordRequest(
    val email: String,
    val otp: String,
    val newPassword: String
)

// Response for reset password
data class ResetPasswordResponse(
    val message: String = ""
)
