package com.quickkart.app.network

import com.quickkart.app.utils.PrefsHelper
import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor : Interceptor {
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val originalRequest = chain.request()
        
        val token = PrefsHelper.authToken
        
        return if (token != null) {
            val newRequest = originalRequest.newBuilder()
                .header("Authorization", "Bearer $token")
                .header("Content-Type", "application/json")
                .build()
            chain.proceed(newRequest)
        } else {
            val newRequest = originalRequest.newBuilder()
                .header("Content-Type", "application/json")
                .build()
            chain.proceed(newRequest)
        }
    }
}
