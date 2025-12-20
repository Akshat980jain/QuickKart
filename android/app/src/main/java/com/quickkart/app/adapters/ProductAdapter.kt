package com.quickkart.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.quickkart.app.R
import com.quickkart.app.databinding.ItemProductBinding
import com.quickkart.app.models.Product
import com.quickkart.app.utils.formatPrice

class ProductAdapter(
    private val onProductClick: (Product) -> Unit,
    private val onAddToCart: (Product) -> Unit
) : ListAdapter<Product, ProductAdapter.ProductViewHolder>(ProductDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val binding = ItemProductBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ProductViewHolder(binding)
    }
    
    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class ProductViewHolder(
        private val binding: ItemProductBinding
    ) : RecyclerView.ViewHolder(binding.root) {
        
        fun bind(product: Product) {
            binding.apply {
                // Load image
                Glide.with(productImage)
                    .load(product.image)
                    .placeholder(R.drawable.placeholder_image)
                    .into(productImage)
                
                // Product info
                productName.text = product.name
                productCategory.text = product.category.replaceFirstChar { it.uppercase() }
                
                // Rating - handle nullable
                ratingBar.rating = (product.rating ?: 0.0).toFloat()
                ratingText.text = "(${product.reviews})"
                
                // Price
                if (product.hasDiscount) {
                    productPrice.text = product.discountedPrice.formatPrice()
                    originalPrice.visibility = View.VISIBLE
                    originalPrice.text = product.price.formatPrice()
                    discountBadge.visibility = View.VISIBLE
                    discountBadge.text = "-${product.discount}%"
                } else {
                    productPrice.text = product.price.formatPrice()
                    originalPrice.visibility = View.GONE
                    discountBadge.visibility = View.GONE
                }
                
                // Click listeners
                root.setOnClickListener { onProductClick(product) }
                addToCartButton.setOnClickListener { onAddToCart(product) }
            }
        }
    }
    
    class ProductDiffCallback : DiffUtil.ItemCallback<Product>() {
        override fun areItemsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem == newItem
        }
    }
}
