package com.quickkart.app.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.adapters.ProductAdapter
import com.quickkart.app.adapters.RecentSearchAdapter
import com.quickkart.app.databinding.ActivitySearchBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.CartManager
import com.quickkart.app.models.Product
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.showToast
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SearchActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySearchBinding
    private lateinit var productAdapter: ProductAdapter
    private lateinit var recentSearchAdapter: RecentSearchAdapter
    
    private var allProducts: List<Product> = emptyList()
    private var searchJob: Job? = null

    companion object {
        private const val PREFS_NAME = "search_prefs"
        private const val KEY_RECENT_SEARCHES = "recent_searches"
        private const val MAX_RECENT_SEARCHES = 10
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySearchBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupSearchBar()
        setupRecyclerViews()
        loadProducts()
        loadRecentSearches()
        
        // Auto-focus search input and show keyboard
        binding.searchInput.requestFocus()
        showKeyboard()
    }

    private fun setupSearchBar() {
        binding.backButton.setOnClickListener {
            finish()
        }

        binding.clearButton.setOnClickListener {
            binding.searchInput.text?.clear()
        }

        binding.micButton.setOnClickListener {
            showToast("Voice search coming soon!")
        }

        binding.clearHistoryButton.setOnClickListener {
            clearRecentSearches()
        }

        // Text change listener with debounce
        binding.searchInput.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
            override fun afterTextChanged(s: Editable?) {
                val query = s?.toString() ?: ""
                binding.clearButton.visibility = if (query.isNotEmpty()) View.VISIBLE else View.GONE
                
                // Debounced search
                searchJob?.cancel()
                searchJob = lifecycleScope.launch {
                    delay(300)
                    performSearch(query)
                }
            }
        })

        // Search action from keyboard
        binding.searchInput.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                val query = binding.searchInput.text.toString().trim()
                if (query.isNotEmpty()) {
                    saveSearchQuery(query)
                    performSearch(query)
                    hideKeyboard()
                }
                true
            } else {
                false
            }
        }
    }

    private fun setupRecyclerViews() {
        // Products grid
        productAdapter = ProductAdapter(
            onProductClick = { product ->
                val intent = Intent(this, ProductDetailActivity::class.java)
                intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT, product)
                startActivity(intent)
            },
            onAddToCart = { product ->
                if (!AuthManager.isLoggedIn) {
                    showToast("Please login to add items to cart")
                    return@ProductAdapter
                }
                CartManager.addToCart(product)
                showToast("${product.name} added to cart")
            }
        )
        
        binding.searchResultsRecycler.apply {
            layoutManager = GridLayoutManager(this@SearchActivity, 2)
            adapter = productAdapter
        }

        // Recent searches
        recentSearchAdapter = RecentSearchAdapter(
            onSearchClick = { query ->
                binding.searchInput.setText(query)
                binding.searchInput.setSelection(query.length)
                saveSearchQuery(query)
                performSearch(query)
            },
            onRemoveClick = { query ->
                removeSearchQuery(query)
            }
        )

        binding.recentSearchesRecycler.apply {
            layoutManager = LinearLayoutManager(this@SearchActivity)
            adapter = recentSearchAdapter
        }
    }

    private fun loadProducts() {
        binding.progressBar.visibility = View.VISIBLE
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getProducts()
                if (response.isSuccessful && response.body() != null) {
                    allProducts = response.body()!!
                    binding.progressBar.visibility = View.GONE
                }
            } catch (e: Exception) {
                binding.progressBar.visibility = View.GONE
                Snackbar.make(binding.root, "Failed to load products", Snackbar.LENGTH_SHORT).show()
            }
        }
    }

    private fun performSearch(query: String) {
        if (query.isEmpty()) {
            // Show recent searches, hide results
            binding.recentSearchesSection.visibility = View.VISIBLE
            binding.searchResultsTitle.visibility = View.GONE
            binding.searchResultsRecycler.visibility = View.GONE
            binding.emptyResultsLayout.visibility = View.GONE
            return
        }

        // Filter products
        val results = allProducts.filter { product ->
            product.name.contains(query, ignoreCase = true) ||
            product.description.contains(query, ignoreCase = true) ||
            product.category.contains(query, ignoreCase = true)
        }

        // Update UI
        binding.recentSearchesSection.visibility = View.GONE
        binding.searchResultsTitle.visibility = View.VISIBLE
        binding.searchResultsTitle.text = "Results for \"$query\" (${results.size})"

        if (results.isEmpty()) {
            binding.searchResultsRecycler.visibility = View.GONE
            binding.emptyResultsLayout.visibility = View.VISIBLE
        } else {
            binding.searchResultsRecycler.visibility = View.VISIBLE
            binding.emptyResultsLayout.visibility = View.GONE
            productAdapter.submitList(results)
        }
    }

    private fun loadRecentSearches() {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val searches = prefs.getStringSet(KEY_RECENT_SEARCHES, emptySet())?.toList() ?: emptyList()
        recentSearchAdapter.submitList(searches.reversed())
        
        binding.recentSearchesSection.visibility = if (searches.isEmpty()) View.GONE else View.VISIBLE
    }

    private fun saveSearchQuery(query: String) {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val searches = prefs.getStringSet(KEY_RECENT_SEARCHES, mutableSetOf())?.toMutableSet() ?: mutableSetOf()
        
        // Remove if exists (to move to top)
        searches.remove(query)
        
        // Add new query
        val newSearches = (listOf(query) + searches.toList()).take(MAX_RECENT_SEARCHES).toMutableSet()
        
        prefs.edit().putStringSet(KEY_RECENT_SEARCHES, newSearches).apply()
        loadRecentSearches()
    }

    private fun removeSearchQuery(query: String) {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val searches = prefs.getStringSet(KEY_RECENT_SEARCHES, mutableSetOf())?.toMutableSet() ?: mutableSetOf()
        searches.remove(query)
        prefs.edit().putStringSet(KEY_RECENT_SEARCHES, searches).apply()
        loadRecentSearches()
    }

    private fun clearRecentSearches() {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().remove(KEY_RECENT_SEARCHES).apply()
        loadRecentSearches()
        showToast("Search history cleared")
    }

    private fun showKeyboard() {
        val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.showSoftInput(binding.searchInput, InputMethodManager.SHOW_IMPLICIT)
    }

    private fun hideKeyboard() {
        val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        imm.hideSoftInputFromWindow(binding.searchInput.windowToken, 0)
    }
}
