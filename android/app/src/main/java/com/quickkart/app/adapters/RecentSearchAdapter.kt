package com.quickkart.app.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.quickkart.app.databinding.ItemRecentSearchBinding

class RecentSearchAdapter(
    private val onSearchClick: (String) -> Unit,
    private val onRemoveClick: (String) -> Unit
) : ListAdapter<String, RecentSearchAdapter.ViewHolder>(StringDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemRecentSearchBinding.inflate(
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
        private val binding: ItemRecentSearchBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(query: String) {
            binding.searchText.text = query
            
            binding.root.setOnClickListener {
                onSearchClick(query)
            }
            
            binding.removeButton.setOnClickListener {
                onRemoveClick(query)
            }
        }
    }

    class StringDiffCallback : DiffUtil.ItemCallback<String>() {
        override fun areItemsTheSame(oldItem: String, newItem: String): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: String, newItem: String): Boolean {
            return oldItem == newItem
        }
    }
}
