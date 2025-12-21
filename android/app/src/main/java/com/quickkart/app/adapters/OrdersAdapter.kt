package com.quickkart.app.adapters

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.quickkart.app.R
import com.quickkart.app.databinding.ItemOrderBinding
import com.quickkart.app.models.Order
import com.quickkart.app.utils.formatPrice
import java.text.SimpleDateFormat
import java.util.Locale

class OrdersAdapter(
    private val onTrackClick: (Order) -> Unit,
    private val onDetailsClick: (Order) -> Unit,
    private val onDeleteClick: (Order) -> Unit,
    private val onCancelReturnClick: (Order) -> Unit
) : ListAdapter<Order, OrdersAdapter.OrderViewHolder>(OrderDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val binding = ItemOrderBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return OrderViewHolder(binding)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class OrderViewHolder(
        private val binding: ItemOrderBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(order: Order) {
            binding.apply {
                // Order ID
                orderId.text = "Order #${order.id}"

                // Format date
                orderDate.text = formatOrderDate(order.createdAt)

                // Status chip
                setupStatusChip(order.status)

                // Item count - handle empty or null items safely
                val count = if (order.items.isNotEmpty()) {
                    order.items.sumOf { it.quantity }
                } else {
                    0
                }
                itemCount.text = if (count <= 1) "1 item" else "$count items"

                // Payment method
                paymentMethod.text = "Paid via ${order.paymentMethod}"

                // Total amount
                totalAmount.text = order.totalAmount.formatPrice()

                // Status icon and buttons based on order status
                when (order.status) {
                    "delivered" -> {
                        statusIcon.setImageResource(R.drawable.ic_check_circle)
                        trackButton.text = "Reorder"
                        trackButton.setIconResource(R.drawable.ic_cart)
                        // Show return button for delivered orders
                        cancelReturnButton.visibility = View.VISIBLE
                        cancelReturnButton.text = "Return Order"
                        cancelReturnButton.setIconResource(R.drawable.ic_return)
                    }
                    "shipped" -> {
                        statusIcon.setImageResource(R.drawable.ic_truck)
                        trackButton.text = "Track Order"
                        trackButton.setIconResource(R.drawable.ic_track)
                        // Cannot cancel shipped orders
                        cancelReturnButton.visibility = View.GONE
                    }
                    "cancelled", "return_requested" -> {
                        statusIcon.setImageResource(R.drawable.ic_close)
                        trackButton.text = "View Status"
                        trackButton.setIconResource(R.drawable.ic_info)
                        // Cannot cancel already cancelled orders
                        cancelReturnButton.visibility = View.GONE
                    }
                    else -> {
                        // pending, processing
                        statusIcon.setImageResource(R.drawable.ic_clock)
                        trackButton.text = "Track Order"
                        trackButton.setIconResource(R.drawable.ic_track)
                        // Show cancel button for pending/processing orders
                        cancelReturnButton.visibility = View.VISIBLE
                        cancelReturnButton.text = "Cancel Order"
                        cancelReturnButton.setIconResource(R.drawable.ic_close)
                    }
                }

                // Click listeners
                trackButton.setOnClickListener { onTrackClick(order) }
                detailsButton.setOnClickListener { onDetailsClick(order) }
                deleteButton.setOnClickListener { onDeleteClick(order) }
                cancelReturnButton.setOnClickListener { onCancelReturnClick(order) }
            }
        }

        private fun setupStatusChip(status: String) {
            val (text, bgColor, textColor) = when (status) {
                "pending" -> Triple("Pending", "#FEF3C7", "#D97706")
                "processing" -> Triple("Processing", "#DBEAFE", "#2563EB")
                "shipped" -> Triple("Shipped", "#E0E7FF", "#4F46E5")
                "delivered" -> Triple("Delivered", "#DCFCE7", "#16A34A")
                "cancelled" -> Triple("Cancelled", "#FEE2E2", "#DC2626")
                "return_requested" -> Triple("Return Requested", "#FEF3C7", "#D97706")
                else -> Triple(status.replaceFirstChar { it.uppercase() }, "#F3F4F6", "#6B7280")
            }

            binding.statusChip.apply {
                this.text = text
                setChipBackgroundColorResource(android.R.color.transparent)
                chipBackgroundColor = android.content.res.ColorStateList.valueOf(Color.parseColor(bgColor))
                setTextColor(Color.parseColor(textColor))
            }
        }

        private fun formatOrderDate(dateString: String): String {
            return try {
                val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
                val outputFormat = SimpleDateFormat("MMM dd, yyyy 'at' hh:mm a", Locale.getDefault())
                val date = inputFormat.parse(dateString)
                date?.let { outputFormat.format(it) } ?: dateString
            } catch (e: Exception) {
                dateString
            }
        }
    }

    class OrderDiffCallback : DiffUtil.ItemCallback<Order>() {
        override fun areItemsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem == newItem
        }
    }
}
