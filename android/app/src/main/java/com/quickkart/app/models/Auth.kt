package com.quickkart.app.models

import com.google.gson.annotations.SerializedName

data class  AuthResponse(
    val token: String = "",
    val user: User = User(),
    val message: String? = null
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String
)
