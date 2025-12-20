package com.quickkart.app.models

import java.io.Serializable

data class Address(
    val firstName: String = "",
    val lastName: String = "",
    val address1: String = "",
    val address2: String? = null,
    val city: String = "",
    val state: String = "",
    val zipCode: String = "",
    val country: String = "",
    val phone: String = ""
) : Serializable {
    
    val fullName: String
        get() = "$firstName $lastName".trim()
    
    val fullAddress: String
        get() = listOfNotNull(address1, address2, city, state, zipCode, country)
            .filter { it.isNotEmpty() }
            .joinToString(", ")
}
