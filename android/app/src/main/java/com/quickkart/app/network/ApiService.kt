package com.quickkart.app.network

import com.quickkart.app.models.AuthResponse
import com.quickkart.app.models.ForgotPasswordRequest
import com.quickkart.app.models.ForgotPasswordResponse
import com.quickkart.app.models.LoginRequest
import com.quickkart.app.models.Product
import com.quickkart.app.models.RegisterRequest
import com.quickkart.app.models.ResetPasswordRequest
import com.quickkart.app.models.ResetPasswordResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {
    
    // Auth Endpoints
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
    
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>
    
    @POST("api/auth/forgot-password")
    suspend fun forgotPassword(@Body request: ForgotPasswordRequest): Response<ForgotPasswordResponse>
    
    @POST("api/auth/reset-password")
    suspend fun resetPassword(@Body request: ResetPasswordRequest): Response<ResetPasswordResponse>
    
    // Product Endpoints
    @GET("api/products")
    suspend fun getProducts(): Response<List<Product>>
    
    @GET("api/products/{id}")
    suspend fun getProduct(@Path("id") id: String): Response<Product>
}
