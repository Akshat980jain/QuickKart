package com.quickkart.app.models

import java.io.Serializable
import java.util.UUID

data class SavedAddress(
    val id: String = UUID.randomUUID().toString(),
    val name: String,            // Recipient name
    val phone: String,           // Phone number
    val addressLine1: String,    // House/Flat no, Building
    val addressLine2: String = "",   // Street, Area (optional)
    val city: String,
    val state: String,
    val pincode: String,
    val isDefault: Boolean = false,
    val label: String = "Home"   // Home, Work, Other
) : Serializable {
    
    val fullAddress: String
        get() = buildString {
            append(addressLine1)
            if (addressLine2.isNotEmpty()) append(", $addressLine2")
            append(", $city, $state - $pincode")
        }
}
