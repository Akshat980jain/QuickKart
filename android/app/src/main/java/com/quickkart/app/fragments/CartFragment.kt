package com.quickkart.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.R
import com.quickkart.app.activities.CheckoutActivity
import com.quickkart.app.adapters.CartAdapter
import com.quickkart.app.databinding.FragmentCartBinding
import com.quickkart.app.managers.CartManager
import com.quickkart.app.utils.formatPrice
import com.quickkart.app.utils.gone
import com.quickkart.app.utils.visible

class CartFragment : Fragment() {
    
    private var _binding: FragmentCartBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var cartAdapter: CartAdapter
    private var appliedPromoCode: String? = null
    private var promoDiscount: Double = 0.0
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCartBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        setupRecyclerView()
        setupClickListeners()
        observeCart()
    }
    
    private fun setupRecyclerView() {
        cartAdapter = CartAdapter(
            onQuantityChanged = { productId, quantity ->
                CartManager.updateQuantity(productId, quantity)
            },
            onRemoveItem = { productId ->
                CartManager.removeFromCart(productId)
                Snackbar.make(binding.root, "Item removed from cart", Snackbar.LENGTH_SHORT)
                    .setAction("UNDO") {
                        // Could implement undo functionality
                    }
                    .show()
            }
        )
        
        binding.cartRecycler.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = cartAdapter
        }
    }
    
    private fun setupClickListeners() {
        binding.applyPromoButton.setOnClickListener {
            val code = binding.promoCodeInput.text.toString().trim()
            if (code.isNotEmpty()) {
                val discount = CartManager.applyPromoCode(code)
                if (discount != null) {
                    appliedPromoCode = code.uppercase()
                    promoDiscount = discount
                    showAppliedPromo()
                    updateOrderSummary()
                } else {
                    Snackbar.make(binding.root, "Invalid promo code", Snackbar.LENGTH_SHORT).show()
                }
                binding.promoCodeInput.text?.clear()
            }
        }
        
        binding.removePromoButton.setOnClickListener {
            appliedPromoCode = null
            promoDiscount = 0.0
            hideAppliedPromo()
            updateOrderSummary()
        }
        
        binding.checkoutButton.setOnClickListener {
            startActivity(Intent(requireContext(), CheckoutActivity::class.java))
        }
        
        binding.continueShoppingButton.setOnClickListener {
            requireActivity().findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                R.id.bottom_navigation
            )?.selectedItemId = R.id.navigation_products
        }
    }
    
    private fun observeCart() {
        CartManager.cartItems.observe(viewLifecycleOwner) { items ->
            if (items.isEmpty()) {
                showEmptyCart()
            } else {
                hideEmptyCart()
                cartAdapter.submitList(items)
            }
        }
        
        CartManager.totalPrice.observe(viewLifecycleOwner) {
            updateOrderSummary()
        }
        
        CartManager.totalItems.observe(viewLifecycleOwner) { count ->
            binding.cartTitle.text = "Your Shopping Cart"
            binding.cartSubtitle.text = "$count ${if (count == 1) "item" else "items"} in your cart"
        }
    }
    
    private fun updateOrderSummary() {
        val subtotal = CartManager.totalPrice.value ?: 0.0
        val shipping = CartManager.getShippingCost()
        val tax = CartManager.getTaxAmount()
        val discountAmount = subtotal * promoDiscount
        val total = CartManager.getOrderTotal(promoDiscount)
        
        binding.subtotalText.text = subtotal.formatPrice()
        binding.shippingText.text = if (shipping == 0.0) "Free" else shipping.formatPrice()
        binding.taxText.text = tax.formatPrice()
        binding.totalText.text = total.formatPrice()
        
        // Show/hide discount row
        if (promoDiscount > 0) {
            binding.discountRow.visible()
            binding.discountText.text = "-${discountAmount.formatPrice()}"
        } else {
            binding.discountRow.gone()
        }
        
        // Free shipping notice
        if (subtotal > 0 && subtotal < 50) {
            binding.freeShippingNotice.visible()
            val remaining = (50 - subtotal).formatPrice()
            binding.freeShippingText.text = "Add $remaining more to qualify for FREE shipping!"
        } else {
            binding.freeShippingNotice.gone()
        }
    }
    
    private fun showAppliedPromo() {
        binding.promoInputLayout.gone()
        binding.appliedPromoCard.visible()
        binding.appliedPromoText.text = appliedPromoCode
    }
    
    private fun hideAppliedPromo() {
        binding.promoInputLayout.visible()
        binding.appliedPromoCard.gone()
    }
    
    private fun showEmptyCart() {
        binding.emptyCartLayout.visible()
        binding.cartContentLayout.gone()
    }
    
    private fun hideEmptyCart() {
        binding.emptyCartLayout.gone()
        binding.cartContentLayout.visible()
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
