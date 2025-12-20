package com.quickkart.app.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.quickkart.app.R
import com.quickkart.app.databinding.ItemCartBinding
import com.quickkart.app.models.CartItem
import com.quickkart.app.utils.formatPrice

class CartAdapter(
    private val onQuantityChanged: (productId: String, quantity: Int) -> Unit,
    private val onRemoveItem: (productId: String) -> Unit
) : ListAdapter<CartItem, CartAdapter.CartViewHolder>(CartDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val binding = ItemCartBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return CartViewHolder(binding)
    }
    
    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class CartViewHolder(
        private val binding: ItemCartBinding
    ) : RecyclerView.ViewHolder(binding.root) {
        
        fun bind(cartItem: CartItem) {
            val product = cartItem.product
            
            binding.apply {
                // Load image
                Glide.with(productImage)
                    .load(product.image)
                    .placeholder(R.drawable.placeholder_image)
                    .into(productImage)
                
                // Product info
                productName.text = product.name
                productCategory.text = product.category.replaceFirstChar { it.uppercase() }
                productPrice.text = product.discountedPrice.formatPrice()
                
                // Quantity
                quantityText.text = cartItem.quantity.toString()
                
                // Total
                itemTotal.text = cartItem.totalPrice.formatPrice()
                
                // Stock status
                stockStatus.text = if (product.inStock) "In Stock" else "Out of Stock"
                stockStatus.setTextColor(
                    itemView.context.getColor(
                        if (product.inStock) R.color.success else R.color.error
                    )
                )
                
                // Click listeners
                decreaseButton.setOnClickListener {
                    if (cartItem.quantity > 1) {
                        onQuantityChanged(product.id, cartItem.quantity - 1)
                    }
                }
                
                increaseButton.setOnClickListener {
                    onQuantityChanged(product.id, cartItem.quantity + 1)
                }
                
                removeButton.setOnClickListener {
                    onRemoveItem(product.id)
                }
            }
        }
    }
    
    class CartDiffCallback : DiffUtil.ItemCallback<CartItem>() {
        override fun areItemsTheSame(oldItem: CartItem, newItem: CartItem): Boolean {
            return oldItem.product.id == newItem.product.id
        }
        
        override fun areContentsTheSame(oldItem: CartItem, newItem: CartItem): Boolean {
            return oldItem.product.id == newItem.product.id && 
                   oldItem.quantity == newItem.quantity
        }
    }
}
