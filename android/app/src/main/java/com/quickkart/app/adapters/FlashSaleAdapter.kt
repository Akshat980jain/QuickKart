package com.quickkart.app.adapters

import android.os.CountDownTimer
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.quickkart.app.databinding.ItemFlashSaleBinding
import com.quickkart.app.managers.FlashSaleManager
import com.quickkart.app.models.FlashSale

class FlashSaleAdapter(
    private val onShopNowClick: (FlashSale) -> Unit
) : ListAdapter<FlashSale, FlashSaleAdapter.ViewHolder>(FlashSaleDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemFlashSaleBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    override fun onViewRecycled(holder: ViewHolder) {
        super.onViewRecycled(holder)
        holder.stopTimer()
    }

    inner class ViewHolder(
        private val binding: ItemFlashSaleBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        private var countDownTimer: CountDownTimer? = null

        fun bind(flashSale: FlashSale) {
            binding.apply {
                saleTitle.text = flashSale.title
                saleDescription.text = flashSale.description
                
                // Start countdown timer
                startTimer(flashSale.timeRemainingMillis)
                
                shopNowButton.setOnClickListener {
                    onShopNowClick(flashSale)
                }
            }
        }

        private fun startTimer(timeRemaining: Long) {
            stopTimer()
            
            countDownTimer = object : CountDownTimer(timeRemaining, 1000) {
                override fun onTick(millisUntilFinished: Long) {
                    binding.countdownTimer.text = FlashSaleManager.formatTimeRemaining(millisUntilFinished)
                }

                override fun onFinish() {
                    binding.countdownTimer.text = "Ended"
                }
            }.start()
        }

        fun stopTimer() {
            countDownTimer?.cancel()
            countDownTimer = null
        }
    }

    class FlashSaleDiffCallback : DiffUtil.ItemCallback<FlashSale>() {
        override fun areItemsTheSame(oldItem: FlashSale, newItem: FlashSale): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: FlashSale, newItem: FlashSale): Boolean {
            return oldItem == newItem
        }
    }
}
