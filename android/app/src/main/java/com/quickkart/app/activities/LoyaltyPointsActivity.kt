package com.quickkart.app.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.quickkart.app.adapters.PointsHistoryAdapter
import com.quickkart.app.databinding.ActivityLoyaltyPointsBinding
import com.quickkart.app.managers.LoyaltyManager

class LoyaltyPointsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoyaltyPointsBinding
    private lateinit var historyAdapter: PointsHistoryAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoyaltyPointsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupRecyclerView()
        displayPointsBalance()
        loadHistory()
    }

    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener { finish() }
    }

    private fun setupRecyclerView() {
        historyAdapter = PointsHistoryAdapter()
        binding.historyRecycler.apply {
            layoutManager = LinearLayoutManager(this@LoyaltyPointsActivity)
            adapter = historyAdapter
        }
    }

    private fun displayPointsBalance() {
        val points = LoyaltyManager.getPointsBalance()
        binding.pointsBalance.text = points.toString()
        
        val value = LoyaltyManager.calculatePointsValue(points)
        binding.pointsValue.text = "Worth ₹${value.toInt()} in discounts"
    }

    private fun loadHistory() {
        val history = LoyaltyManager.getPointsHistory()
        
        if (history.isEmpty()) {
            binding.historyRecycler.visibility = View.GONE
            binding.emptyHistoryText.visibility = View.VISIBLE
        } else {
            binding.historyRecycler.visibility = View.VISIBLE
            binding.emptyHistoryText.visibility = View.GONE
            historyAdapter.submitList(history)
        }
    }
}
