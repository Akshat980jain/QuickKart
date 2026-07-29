package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.adapters.WishlistAdapter
import com.quickkart.app.databinding.ActivityWishlistBinding
import com.quickkart.app.managers.CartManager
import com.quickkart.app.managers.WishlistManager
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.utils.showToast

class WishlistActivity : AppCompatActivity() {

    private lateinit var binding: ActivityWishlistBinding
    private lateinit var wishlistAdapter: WishlistAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWishlistBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupRecyclerView()
        setupClickListeners()
        loadWishlist()
    }

    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener {
            finish()
        }
    }

    private fun setupRecyclerView() {
        wishlistAdapter = WishlistAdapter(
            onProductClick = { product ->
                val intent = Intent(this, ProductDetailActivity::class.java)
                intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT, product)
                startActivity(intent)
            },
            onRemoveClick = { product ->
                WishlistManager.removeFromWishlist(product.id)
                loadWishlist()
                Snackbar.make(binding.root, "Removed from wishlist", Snackbar.LENGTH_SHORT)
                    .setAction("Undo") {
                        WishlistManager.addToWishlist(product)
                        loadWishlist()
                    }
                    .show()
            },
            onAddToCartClick = { product ->
                if (!AuthManager.isLoggedIn) {
                    showToast("Please login to add items to cart")
                    return@WishlistAdapter
                }
                CartManager.addToCart(product)
                showToast("${product.name} added to cart")
            }
        )

        binding.wishlistRecycler.apply {
            layoutManager = GridLayoutManager(this@WishlistActivity, 2)
            adapter = wishlistAdapter
        }
    }

    private fun setupClickListeners() {
        binding.clearAllButton.setOnClickListener {
            if (WishlistManager.getWishlistCount() == 0) return@setOnClickListener
            
            MaterialAlertDialogBuilder(this)
                .setTitle("Clear Wishlist?")
                .setMessage("Are you sure you want to remove all items from your wishlist?")
                .setNegativeButton("Cancel", null)
                .setPositiveButton("Clear All") { _, _ ->
                    WishlistManager.clearWishlist()
                    loadWishlist()
                    showToast("Wishlist cleared")
                }
                .show()
        }

        binding.browseProductsButton.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
            finish()
        }
    }

    private fun loadWishlist() {
        val items = WishlistManager.getWishlist()
        
        binding.wishlistCount.text = "${items.size} items"
        
        if (items.isEmpty()) {
            binding.wishlistRecycler.visibility = View.GONE
            binding.emptyLayout.visibility = View.VISIBLE
            binding.clearAllButton.visibility = View.GONE
        } else {
            binding.wishlistRecycler.visibility = View.VISIBLE
            binding.emptyLayout.visibility = View.GONE
            binding.clearAllButton.visibility = View.VISIBLE
            wishlistAdapter.submitList(items)
        }
    }

    override fun onResume() {
        super.onResume()
        loadWishlist()
    }
}
