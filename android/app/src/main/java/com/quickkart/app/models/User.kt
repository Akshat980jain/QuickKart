package com.quickkart.app.models

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("_id")
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val role: String = "user",
    val phone: String? = null,
    val address: String? = null,
    val dateOfBirth: String? = null,
    val gender: String? = null
)
