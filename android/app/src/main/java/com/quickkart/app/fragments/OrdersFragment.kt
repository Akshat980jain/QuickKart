package com.quickkart.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.tabs.TabLayout
import com.quickkart.app.R
import com.quickkart.app.activities.CancelReturnActivity
import com.quickkart.app.activities.LoginActivity
import com.quickkart.app.activities.MainActivity
import com.quickkart.app.activities.RegisterActivity
import com.quickkart.app.adapters.OrdersAdapter
import com.quickkart.app.databinding.FragmentOrdersBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.OrdersManager
import com.quickkart.app.models.Order

class OrdersFragment : Fragment() {
    
    private var _binding: FragmentOrdersBinding? = null
    private val binding get() = _binding!!
    
    private lateinit var ordersAdapter: OrdersAdapter
    private var currentTab = 0 // 0 = Active, 1 = Delivered
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentOrdersBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Check if user is logged in
        if (!AuthManager.isLoggedIn) {
            showLoginRequiredState()
            return
        }
        
        setupTabs()
        setupRecyclerView()
        setupClickListeners()
        loadOrders()
    }
    
    override fun onResume() {
        super.onResume()
        // Recheck login state when returning to fragment
        if (!AuthManager.isLoggedIn) {
            showLoginRequiredState()
        } else if (!::ordersAdapter.isInitialized) {
            setupTabs()
            setupRecyclerView()
            setupClickListeners()
            loadOrders()
        } else {
            loadOrders()
        }
    }
    
    private fun showLoginRequiredState() {
        binding.tabLayout.visibility = View.GONE
        binding.ordersRecycler.visibility = View.GONE
        binding.emptyLayout.visibility = View.VISIBLE
        binding.emptyIcon.setImageResource(R.drawable.ic_person)
        binding.emptyTitle.text = "Login Required"
        binding.emptySubtitle.text = "Please login or sign up to view your orders"
        binding.shopNowButton.text = "Login"
        binding.shopNowButton.setOnClickListener {
            showLoginDialog()
        }
    }
    
    private fun showLoginDialog() {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Login Required")
            .setMessage("Please login or sign up to view your orders")
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
    
    private fun setupTabs() {
        binding.tabLayout.visibility = View.VISIBLE
        // Only add tabs if not already added
        if (binding.tabLayout.tabCount == 0) {
            binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Active"))
            binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Delivered"))
        }
        
        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                currentTab = tab?.position ?: 0
                loadOrders()
            }
            
            override fun onTabUnselected(tab: TabLayout.Tab?) {}
            override fun onTabReselected(tab: TabLayout.Tab?) {}
        })
    }
    
    private fun setupRecyclerView() {
        ordersAdapter = OrdersAdapter(
            onTrackClick = { order ->
                handleTrackClick(order)
            },
            onDetailsClick = { order ->
                handleDetailsClick(order)
            },
            onDeleteClick = { order ->
                handleDeleteClick(order)
            },
            onCancelReturnClick = { order ->
                handleCancelReturnClick(order)
            }
        )
        
        binding.ordersRecycler.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = ordersAdapter
        }
    }
    
    private fun setupClickListeners() {
        binding.shopNowButton.setOnClickListener {
            // Navigate to home tab
            (activity as? MainActivity)?.navigateToHome()
        }
    }
    
    private fun loadOrders() {
        val orders = if (currentTab == 0) {
            OrdersManager.getActiveOrders()
        } else {
            OrdersManager.getDeliveredOrders()
        }
        
        if (orders.isEmpty()) {
            showEmptyState()
        } else {
            showOrders(orders)
        }
    }
    
    private fun showOrders(orders: List<Order>) {
        binding.emptyLayout.visibility = View.GONE
        binding.ordersRecycler.visibility = View.VISIBLE
        ordersAdapter.submitList(orders)
    }
    
    private fun showEmptyState() {
        binding.ordersRecycler.visibility = View.GONE
        binding.emptyLayout.visibility = View.VISIBLE
        binding.emptyIcon.setImageResource(R.drawable.ic_package)
        binding.shopNowButton.text = "Start Shopping"
        binding.shopNowButton.setOnClickListener {
            (activity as? MainActivity)?.navigateToHome()
        }
        
        binding.emptyTitle.text = if (currentTab == 0) {
            "No active orders"
        } else {
            "No delivered orders"
        }
        
        binding.emptySubtitle.text = if (currentTab == 0) {
            "Your upcoming orders will appear here"
        } else {
            "Your past orders will appear here"
        }
    }
    
    private fun handleTrackClick(order: Order) {
        if (order.status == "delivered") {
            Snackbar.make(binding.root, "Reorder feature coming soon!", Snackbar.LENGTH_SHORT).show()
        } else {
            Snackbar.make(binding.root, "Order ${order.id} is ${order.status}", Snackbar.LENGTH_SHORT).show()
        }
    }
    
    private fun handleDetailsClick(order: Order) {
        val itemCount = if (order.items.isNotEmpty()) {
            order.items.sumOf { it.quantity }
        } else {
            1
        }
        val message = "Order ${order.id}\n$itemCount items • ${order.paymentMethod}"
        Snackbar.make(binding.root, message, Snackbar.LENGTH_LONG).show()
    }
    
    private fun handleDeleteClick(order: Order) {
        // First confirmation
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Remove Order?")
            .setMessage("Are you sure you want to remove Order #${order.id} from your history?")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setPositiveButton("Remove") { _, _ ->
                // Second confirmation
                showSecondDeleteConfirmation(order)
            }
            .show()
    }
    
    private fun showSecondDeleteConfirmation(order: Order) {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Confirm Deletion")
            .setMessage("This action cannot be undone. Are you absolutely sure you want to remove this order?")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setPositiveButton("Delete Permanently") { _, _ ->
                deleteOrder(order)
            }
            .show()
    }
    
    private fun deleteOrder(order: Order) {
        val deleted = OrdersManager.deleteOrder(order.id)
        if (deleted) {
            Snackbar.make(binding.root, "Order removed from history", Snackbar.LENGTH_SHORT).show()
            loadOrders() // Refresh the list
        } else {
            Snackbar.make(binding.root, "Failed to remove order", Snackbar.LENGTH_SHORT).show()
        }
    }
    
    private fun handleCancelReturnClick(order: Order) {
        val isReturn = order.status == "delivered"
        val intent = Intent(requireContext(), CancelReturnActivity::class.java).apply {
            putExtra(CancelReturnActivity.EXTRA_ORDER_ID, order.id)
            putExtra(CancelReturnActivity.EXTRA_IS_RETURN, isReturn)
        }
        startActivity(intent)
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
