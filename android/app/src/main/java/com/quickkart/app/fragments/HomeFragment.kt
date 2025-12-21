package com.quickkart.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.quickkart.app.R
import com.quickkart.app.activities.LoginActivity
import com.quickkart.app.activities.ProductDetailActivity
import com.quickkart.app.activities.RegisterActivity
import com.quickkart.app.activities.SearchActivity
import com.quickkart.app.adapters.CategoryAdapter
import com.quickkart.app.adapters.ProductAdapter
import com.quickkart.app.databinding.FragmentHomeBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.CartManager
import com.quickkart.app.models.Product
import com.quickkart.app.network.RetrofitClient
import com.quickkart.app.utils.gone
import com.quickkart.app.utils.showToast
import com.quickkart.app.utils.visible
import kotlinx.coroutines.launch

class HomeFragment : Fragment() {
    
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var featuredProductsAdapter: ProductAdapter
    private lateinit var categoryAdapter: CategoryAdapter
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        setupRecyclerViews()
        setupClickListeners()
        loadFeaturedProducts()
        loadCategories()
        updateLoginButtonState()
    }
    
    override fun onResume() {
        super.onResume()
        updateLoginButtonState()
    }
    
    private fun updateLoginButtonState() {
        if (AuthManager.isLoggedIn) {
            binding.loginButton.text = AuthManager.currentUser?.name?.take(10) ?: "Account"
            binding.loginButton.setIconResource(R.drawable.ic_person)
        } else {
            binding.loginButton.text = "Login"
            binding.loginButton.setIconResource(R.drawable.ic_login)
        }
    }
    
    private fun setupRecyclerViews() {
        // Featured Products - Horizontal
        featuredProductsAdapter = ProductAdapter(
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
        
        binding.featuredProductsRecycler.apply {
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
            adapter = featuredProductsAdapter
        }
        
        // Categories - Grid
        categoryAdapter = CategoryAdapter { _ ->
            // Navigate to products with category filter
            // Could use NavController or pass as argument
        }
        
        binding.categoriesRecycler.apply {
            layoutManager = GridLayoutManager(context, 2)
            adapter = categoryAdapter
        }
    }
    
    private fun setupClickListeners() {
        binding.loginButton.setOnClickListener {
            if (AuthManager.isLoggedIn) {
                // Navigate to profile
                requireActivity().findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                    R.id.bottom_navigation
                )?.selectedItemId = R.id.navigation_profile
            } else {
                startActivity(Intent(requireContext(), LoginActivity::class.java))
            }
        }
        
        binding.shopNowButton.setOnClickListener {
            // Navigate to Products tab
            requireActivity().findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                R.id.bottom_navigation
            )?.selectedItemId = R.id.navigation_products
        }
        
        binding.viewDealsButton.setOnClickListener {
            // Navigate to Deals
        }
        
        binding.viewAllProductsLink.setOnClickListener {
            requireActivity().findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                R.id.bottom_navigation
            )?.selectedItemId = R.id.navigation_products
        }
        
        binding.newsletterButton.setOnClickListener {
            val email = binding.newsletterInput.text.toString().trim()
            if (email.isNotEmpty() && android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                requireContext().showToast("Thank you for subscribing!")
                binding.newsletterInput.text?.clear()
            } else {
                requireContext().showToast("Please enter a valid email")
            }
        }
        
        binding.swipeRefreshLayout.setOnRefreshListener {
            loadFeaturedProducts()
        }
        
        // Search bar click listeners
        binding.searchBar.setOnClickListener {
            startActivity(Intent(requireContext(), SearchActivity::class.java))
        }
        
        binding.micButton.setOnClickListener {
            requireContext().showToast("Voice search coming soon!")
        }
        
        binding.cameraButton.setOnClickListener {
            requireContext().showToast("Image search coming soon!")
        }
    }
    
    private fun loadFeaturedProducts() {
        binding.productsProgressBar.visible()
        binding.productsErrorText.gone()
        
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getProducts()
                if (response.isSuccessful && response.body() != null) {
                    val products = response.body()!!.take(8) // Show first 8 as featured
                    featuredProductsAdapter.submitList(products)
                    binding.productsProgressBar.gone()
                } else {
                    showProductsError("Failed to load products")
                }
            } catch (e: Exception) {
                showProductsError(e.message ?: "Network error")
            } finally {
                binding.swipeRefreshLayout.isRefreshing = false
            }
        }
    }
    
    private fun showProductsError(message: String) {
        binding.productsProgressBar.gone()
        binding.productsErrorText.visible()
        binding.productsErrorText.text = message
    }
    
    private fun loadCategories() {
        val categories = listOf(
            CategoryItem("Electronics", R.drawable.ic_category_electronics, "electronics"),
            CategoryItem("Fashion", R.drawable.ic_category_fashion, "clothing"),
            CategoryItem("Home & Kitchen", R.drawable.ic_category_home, "home"),
            CategoryItem("Sports", R.drawable.ic_category_sports, "sports")
        )
        categoryAdapter.submitList(categories)
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

data class CategoryItem(
    val name: String,
    val iconRes: Int,
    val slug: String
)
