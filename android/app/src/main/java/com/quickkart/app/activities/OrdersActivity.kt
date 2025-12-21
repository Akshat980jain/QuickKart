package com.quickkart.app.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.tabs.TabLayout
import com.quickkart.app.adapters.OrdersAdapter
import com.quickkart.app.databinding.ActivityOrdersBinding
import com.quickkart.app.managers.AuthManager
import com.quickkart.app.managers.OrdersManager
import com.quickkart.app.models.Order

class OrdersActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityOrdersBinding
    private lateinit var ordersAdapter: OrdersAdapter
    private var currentTab = 0 // 0 = Active, 1 = Delivered
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOrdersBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupToolbar()
        setupTabs()
        setupRecyclerView()
        setupClickListeners()
        loadOrders()
    }
    
    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener {
            finish()
        }
    }
    
    private fun setupTabs() {
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Active"))
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText("Delivered"))
        
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
            layoutManager = LinearLayoutManager(this@OrdersActivity)
            adapter = ordersAdapter
        }
    }
    
    private fun setupClickListeners() {
        binding.shopNowButton.setOnClickListener {
            // Go to home
            val intent = Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            startActivity(intent)
            finish()
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
        
        // Update empty state text based on tab
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
        MaterialAlertDialogBuilder(this)
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
        MaterialAlertDialogBuilder(this)
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
        val intent = Intent(this, CancelReturnActivity::class.java).apply {
            putExtra(CancelReturnActivity.EXTRA_ORDER_ID, order.id)
            putExtra(CancelReturnActivity.EXTRA_IS_RETURN, isReturn)
        }
        startActivity(intent)
    }
    
    override fun onResume() {
        super.onResume()
        loadOrders() // Refresh on resume
    }
}
