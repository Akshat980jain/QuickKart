package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityCompareBinding
import com.quickkart.app.databinding.ItemCompareProductBinding
import com.quickkart.app.managers.CompareManager
import com.quickkart.app.models.Product
import com.quickkart.app.utils.ShareHelper
import com.quickkart.app.utils.formatPrice
import com.quickkart.app.utils.showToast

class CompareActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCompareBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCompareBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupClickListeners()
    }

    override fun onResume() {
        super.onResume()
        loadCompareProducts()
    }

    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener { finish() }
        binding.toolbar.inflateMenu(R.menu.menu_compare)
        binding.toolbar.setOnMenuItemClickListener { item ->
            when (item.itemId) {
                R.id.action_share -> {
                    val products = CompareManager.getCompareList()
                    if (products.isNotEmpty()) {
                        ShareHelper.shareComparison(this, products)
                    }
                    true
                }
                else -> false
            }
        }
    }

    private fun setupClickListeners() {
        binding.browseButton.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

        binding.clearButton.setOnClickListener {
            CompareManager.clear()
            loadCompareProducts()
            showToast("Comparison cleared")
        }
    }

    private fun loadCompareProducts() {
        val products = CompareManager.getCompareList()

        if (products.isEmpty()) {
            binding.emptyState.visibility = View.VISIBLE
            binding.scrollView.visibility = View.GONE
            binding.clearButton.visibility = View.GONE
        } else {
            binding.emptyState.visibility = View.GONE
            binding.scrollView.visibility = View.VISIBLE
            binding.clearButton.visibility = View.VISIBLE
            
            displayProducts(products)
        }
    }

    private fun displayProducts(products: List<Product>) {
        binding.compareContainer.removeAllViews()
        
        products.forEach { product ->
            val itemBinding = ItemCompareProductBinding.inflate(
                LayoutInflater.from(this),
                binding.compareContainer,
                false
            )
            
            itemBinding.apply {
                productName.text = product.name
                productPrice.text = product.discountedPrice.formatPrice()
                productRating.text = "${product.rating}/5"
                productCategory.text = product.category
                
                Glide.with(productImage)
                    .load(product.image)
                    .placeholder(R.drawable.placeholder_image)
                    .into(productImage)
                
                removeButton.setOnClickListener {
                    CompareManager.removeFromCompare(product.id)
                    loadCompareProducts()
                }
                
                root.setOnClickListener {
                    val intent = Intent(this@CompareActivity, ProductDetailActivity::class.java)
                    intent.putExtra("product", product)
                    startActivity(intent)
                }
            }
            
            binding.compareContainer.addView(itemBinding.root)
        }
    }
}
