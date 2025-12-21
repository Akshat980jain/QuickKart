package com.quickkart.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.core.widget.doAfterTextChanged
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.quickkart.app.R
import com.quickkart.app.activities.LoginActivity
import com.quickkart.app.activities.ProductDetailActivity
import com.quickkart.app.activities.RegisterActivity
import com.quickkart.app.adapters.ProductAdapter
import com.quickkart.app.databinding.FragmentProductsBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.CartManager
import com.quickkart.app.models.Product
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.Constants
import com.quickkart.app.utils.gone
import com.quickkart.app.utils.showToast
import com.quickkart.app.utils.visible
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class ProductsFragment : Fragment() {
    
    private var _binding: FragmentProductsBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var productAdapter: ProductAdapter
    private var allProducts: List<Product> = emptyList()
    private var searchJob: Job? = null
    
    private var selectedCategory = "all"
    private var sortBy = "rating"
    private var sortOrder = "desc"
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProductsBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        setupRecyclerView()
        setupFilters()
        setupSearch()
        loadProducts()
    }
    
    private fun setupRecyclerView() {
        productAdapter = ProductAdapter(
            onProductClick = { product ->
                val intent = Intent(requireContext(), ProductDetailActivity::class.java)
                intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT, product)
                startActivity(intent)
            },
            onAddToCart = { product ->
                if (!AuthManager.isLoggedIn) {
                    showLoginRequiredDialog()
                    return@ProductAdapter
                }
                CartManager.addToCart(product)
                requireContext().showToast("${product.name} added to cart")
            }
        )
        
        binding.productsRecycler.apply {
            layoutManager = GridLayoutManager(context, 2)
            adapter = productAdapter
        }
        
        binding.swipeRefreshLayout.setOnRefreshListener {
            loadProducts()
        }
    }
    
    private fun setupFilters() {
        // Category spinner
        val categoryNames = Constants.CATEGORIES.map { it.first }
        val categoryAdapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_dropdown_item_1line,
            categoryNames
        )
        binding.categorySpinner.setAdapter(categoryAdapter)
        binding.categorySpinner.setOnItemClickListener { _, _, position, _ ->
            selectedCategory = Constants.CATEGORIES[position].second
            applyFilters()
        }
        
        // Sort spinner
        val sortOptions = listOf("Highest Rated", "Price: Low to High", "Price: High to Low")
        val sortAdapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_dropdown_item_1line,
            sortOptions
        )
        binding.sortSpinner.setAdapter(sortAdapter)
        binding.sortSpinner.setOnItemClickListener { _, _, position, _ ->
            when (position) {
                0 -> { sortBy = "rating"; sortOrder = "desc" }
                1 -> { sortBy = "price"; sortOrder = "asc" }
                2 -> { sortBy = "price"; sortOrder = "desc" }
            }
            applyFilters()
        }
        
        // Clear filters
        binding.clearFiltersButton.setOnClickListener {
            selectedCategory = "all"
            sortBy = "rating"
            sortOrder = "desc"
            binding.searchInput.text?.clear()
            binding.categorySpinner.setText("All Categories", false)
            binding.sortSpinner.setText("Highest Rated", false)
            applyFilters()
        }
    }
    
    private fun setupSearch() {
        binding.searchInput.doAfterTextChanged { text ->
            searchJob?.cancel()
            searchJob = lifecycleScope.launch {
                delay(300) // Debounce
                applyFilters()
            }
        }
        
        binding.clearSearchButton.setOnClickListener {
            binding.searchInput.text?.clear()
        }
    }
    
    private fun loadProducts() {
        showLoading()
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getProducts()
                if (response.isSuccessful && response.body() != null) {
                    allProducts = response.body()!!
                    applyFilters()
                    hideLoading()
                } else {
                    showError("Failed to load products")
                }
            } catch (e: Exception) {
                showError(e.message ?: "Network error")
            } finally {
                binding.swipeRefreshLayout.isRefreshing = false
            }
        }
    }
    
    private fun applyFilters() {
        var filtered = allProducts
        
        // Filter by category
        if (selectedCategory != "all") {
            filtered = filtered.filter { it.category.equals(selectedCategory, ignoreCase = true) }
        }
        
        // Filter by search query
        val query = binding.searchInput.text?.toString()?.lowercase() ?: ""
        if (query.isNotEmpty()) {
            filtered = filtered.filter { 
                it.name.lowercase().contains(query) || 
                it.description.lowercase().contains(query) ||
                it.category.lowercase().contains(query)
            }
        }
        
        // Sort
        filtered = when {
            sortBy == "price" && sortOrder == "asc" -> filtered.sortedBy { it.discountedPrice }
            sortBy == "price" && sortOrder == "desc" -> filtered.sortedByDescending { it.discountedPrice }
            else -> filtered.sortedByDescending { it.rating }
        }
        
        productAdapter.submitList(filtered)
        updateResultsCount(filtered.size)
        
        if (filtered.isEmpty()) {
            showEmpty()
        } else {
            hideEmpty()
        }
    }
    
    private fun updateResultsCount(count: Int) {
        binding.resultsCountText.text = "Showing $count products"
    }
    
    private fun showLoading() {
        binding.progressBar.visible()
        binding.productsRecycler.gone()
        binding.errorLayout.gone()
        binding.emptyLayout.gone()
    }
    
    private fun hideLoading() {
        binding.progressBar.gone()
        binding.productsRecycler.visible()
    }
    
    private fun showError(message: String) {
        binding.progressBar.gone()
        binding.productsRecycler.gone()
        binding.errorLayout.visible()
        binding.errorText.text = message
        
        binding.retryButton.setOnClickListener {
            loadProducts()
        }
    }
    
    private fun showEmpty() {
        binding.emptyLayout.visible()
        binding.productsRecycler.gone()
    }
    
    private fun hideEmpty() {
        binding.emptyLayout.gone()
        binding.productsRecycler.visible()
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    
    private fun showLoginRequiredDialog() {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Login Required")
            .setMessage("Please login or sign up to add items to your cart")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setNeutralButton("Sign Up") { _, _ ->
                startActivity(Intent(requireContext(), RegisterActivity::class.java))
            }
            .setPositiveButton("Login") { _, _ ->
                startActivity(Intent(requireContext(), LoginActivity::class.java))
            }
            .show()
    }
}
