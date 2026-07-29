package com.quickkart.app.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.quickkart.app.R
import com.quickkart.app.databinding.ItemPointsHistoryBinding
import com.quickkart.app.managers.LoyaltyManager

class PointsHistoryAdapter : ListAdapter<LoyaltyManager.PointsTransaction, PointsHistoryAdapter.ViewHolder>(
    TransactionDiffCallback()
) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemPointsHistoryBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class ViewHolder(
        private val binding: ItemPointsHistoryBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(transaction: LoyaltyManager.PointsTransaction) {
            binding.apply {
                description.text = transaction.description
                date.text = transaction.date
                
                if (transaction.type == "earned") {
                    points.text = "+${transaction.points}"
                    points.setTextColor(ContextCompat.getColor(root.context, R.color.success))
                    icon.setImageResource(R.drawable.ic_add)
                    icon.imageTintList = ContextCompat.getColorStateList(root.context, R.color.success)
                } else {
                    points.text = "${transaction.points}"
                    points.setTextColor(ContextCompat.getColor(root.context, R.color.error))
                    icon.setImageResource(R.drawable.ic_coupon)
                    icon.imageTintList = ContextCompat.getColorStateList(root.context, R.color.error)
                }
            }
        }
    }

    class TransactionDiffCallback : DiffUtil.ItemCallback<LoyaltyManager.PointsTransaction>() {
        override fun areItemsTheSame(
            oldItem: LoyaltyManager.PointsTransaction,
            newItem: LoyaltyManager.PointsTransaction
        ): Boolean = oldItem.date == newItem.date && oldItem.description == newItem.description

        override fun areContentsTheSame(
            oldItem: LoyaltyManager.PointsTransaction,
            newItem: LoyaltyManager.PointsTransaction
        ): Boolean = oldItem == newItem
    }
}
