package com.quickkart.app.activities

import android.content.Intent
import android.graphics.Paint
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityProductDetailBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.CartManager
import com.quickkart.app.models.Product
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.formatPrice
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProductDetailActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_PRODUCT = "product"
        const val EXTRA_PRODUCT_ID = "product_id"
    }

    private lateinit var binding: ActivityProductDetailBinding
    private var product: Product? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProductDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Try to get product from intent first
        val passedProduct = intent.getSerializableExtra(EXTRA_PRODUCT) as? Product
        if (passedProduct != null) {
            product = passedProduct
            displayProduct(passedProduct)
        } else {
            // Fall back to loading by ID
            val productId = intent.getStringExtra(EXTRA_PRODUCT_ID)
            if (productId != null) {
                loadProduct(productId)
            } else {
                finish()
            }
        }

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.backButton.setOnClickListener {
            finish()
        }

        binding.addToCartButton.setOnClickListener {
            if (!AuthManager.isLoggedIn) {
                showLoginRequiredDialog()
                return@setOnClickListener
            }
            product?.let { p ->
                CartManager.addToCart(p)
                Snackbar.make(binding.root, "Added to cart!", Snackbar.LENGTH_SHORT).show()
            }
        }

        binding.wishlistButton.setOnClickListener {
            Snackbar.make(binding.root, "Added to wishlist!", Snackbar.LENGTH_SHORT).show()
        }

        binding.shareButton.setOnClickListener {
            product?.let { p ->
                val shareIntent = Intent().apply {
                    action = Intent.ACTION_SEND
                    type = "text/plain"
                    putExtra(Intent.EXTRA_TEXT, "Check out ${p.name} on QuickKart!")
                }
                startActivity(Intent.createChooser(shareIntent, "Share via"))
            }
        }
    }

    private fun loadProduct(productId: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = RetrofitClient.apiService.getProduct(productId)
                if (response.isSuccessful) {
                    product = response.body()
                    withContext(Dispatchers.Main) {
                        product?.let { displayProduct(it) }
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Snackbar.make(binding.root, "Error loading product", Snackbar.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun displayProduct(product: Product) {
        binding.productName.text = product.name
        binding.productCategory.text = product.category.uppercase()
        binding.productDescription.text = product.description
        binding.productPrice.text = product.displayPrice.formatPrice()
        
        // Rating - handle nullable
        binding.ratingBar.rating = (product.rating ?: 0.0).toFloat()
        binding.ratingText.text = "(${product.reviewCount} reviews)"
        
        // Original price and discount
        if (product.hasDiscount) {
            binding.originalPrice.visibility = View.VISIBLE
            binding.originalPrice.text = product.price.formatPrice()
            binding.originalPrice.paintFlags = binding.originalPrice.paintFlags or Paint.STRIKE_THRU_TEXT_FLAG
            
            binding.discountBadge.visibility = View.VISIBLE
            binding.discountBadge.text = "${product.discount}% OFF"
        } else {
            binding.originalPrice.visibility = View.GONE
            binding.discountBadge.visibility = View.GONE
        }
        
        // Stock status
        if (product.inStock) {
            binding.stockStatus.text = "In Stock"
            binding.stockStatus.setTextColor(getColor(R.color.success))
        } else {
            binding.stockStatus.text = "Out of Stock"
            binding.stockStatus.setTextColor(getColor(R.color.error))
            binding.addToCartButton.isEnabled = false
        }
        
        // Load image
        Glide.with(this)
            .load(product.image)
            .placeholder(R.drawable.placeholder_image)
            .into(binding.productImage)
    }
    
    private fun showLoginRequiredDialog() {
        MaterialAlertDialogBuilder(this)
            .setTitle("Login Required")
            .setMessage("Please login or sign up to add items to your cart")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setNeutralButton("Sign Up") { _, _ ->
                startActivity(Intent(this, RegisterActivity::class.java))
            }
            .setPositiveButton("Login") { _, _ ->
                startActivity(Intent(this, LoginActivity::class.java))
            }
            .show()
    }
}
