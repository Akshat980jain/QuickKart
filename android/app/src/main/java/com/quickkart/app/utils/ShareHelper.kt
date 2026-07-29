package com.quickkart.app.utils

import android.content.Context
import android.content.Intent
import com.quickkart.app.models.Product

/**
 * Helper for sharing products
 */
object ShareHelper {
    
    /**
     * Share a product
     */
    fun shareProduct(context: Context, product: Product) {
        val shareText = buildString {
            appendLine("🛒 Check out this product on QuickKart!")
            appendLine()
            appendLine("📦 ${product.name}")
            appendLine("💰 Price: ₹${product.discountedPrice.toInt()}")
            val discount = product.discount ?: 0
            if (discount > 0) {
                appendLine("🏷️ ${discount}% OFF!")
            }
            appendLine("⭐ Rating: ${product.rating}/5")
            appendLine()
            appendLine("Download QuickKart app to shop!")
        }
        
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, "Check out ${product.name} on QuickKart!")
            putExtra(Intent.EXTRA_TEXT, shareText)
        }
        
        context.startActivity(Intent.createChooser(intent, "Share via"))
    }
    
    /**
     * Share multiple products (comparison result)
     */
    fun shareComparison(context: Context, products: List<Product>) {
        val shareText = buildString {
            appendLine("🔍 Product Comparison on QuickKart")
            appendLine()
            products.forEachIndexed { index, product ->
                appendLine("${index + 1}. ${product.name}")
                appendLine("   💰 ₹${product.discountedPrice.toInt()}")
                appendLine("   ⭐ ${product.rating}/5")
                appendLine()
            }
            appendLine("Download QuickKart app to compare more!")
        }
        
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_SUBJECT, "Product Comparison from QuickKart")
            putExtra(Intent.EXTRA_TEXT, shareText)
        }
        
        context.startActivity(Intent.createChooser(intent, "Share comparison via"))
    }
}
