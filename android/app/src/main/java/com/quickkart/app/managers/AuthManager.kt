package com.quickkart.app.managers

import com.quickkart.app.models.AuthResponse
import com.quickkart.app.models.LoginRequest
import com.quickkart.app.models.RegisterRequest
import com.quickkart.app.models.User
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.PrefsHelper
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object AuthManager {
    
    val currentUser: User?
        get() = PrefsHelper.user
    
    val isLoggedIn: Boolean
        get() = PrefsHelper.isLoggedIn
    
    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = RetrofitClient.apiService.login(LoginRequest(email, password))
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    // Save to preferences
                    PrefsHelper.authToken = authResponse.token
                    PrefsHelper.user = authResponse.user
                    Result.success(authResponse)
                } else {
                    val errorMessage = response.errorBody()?.string() ?: "Login failed"
                    Result.failure(Exception(errorMessage))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    suspend fun register(name: String, email: String, password: String): Result<AuthResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = RetrofitClient.apiService.register(
                    RegisterRequest(name, email, password)
                )
                if (response.isSuccessful && response.body() != null) {
                    val authResponse = response.body()!!
                    // Save to preferences
                    PrefsHelper.authToken = authResponse.token
                    PrefsHelper.user = authResponse.user
                    Result.success(authResponse)
                } else {
                    val errorMessage = response.errorBody()?.string() ?: "Registration failed"
                    Result.failure(Exception(errorMessage))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    fun logout() {
        PrefsHelper.clearAuth()
        PrefsHelper.clearCart()
    }
}
