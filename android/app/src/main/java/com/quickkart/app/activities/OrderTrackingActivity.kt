package com.quickkart.app.activities

import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.pdf.PdfDocument
import android.os.Bundle
import android.os.Environment
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityOrderTrackingBinding
import com.quickkart.app.managers.CartManager
import com.quickkart.app.managers.OrdersManager
import com.quickkart.app.models.Order
import com.quickkart.app.utils.formatPrice
import com.quickkart.app.utils.showToast
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class OrderTrackingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityOrderTrackingBinding
    private var order: Order? = null

    companion object {
        const val EXTRA_ORDER_ID = "extra_order_id"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOrderTrackingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val orderId = intent.getStringExtra(EXTRA_ORDER_ID)
        if (orderId == null) {
            showToast("Order not found")
            finish()
            return
        }

        order = OrdersManager.getOrderById(orderId)
        if (order == null) {
            showToast("Order not found")
            finish()
            return
        }

        setupToolbar()
        displayOrderInfo()
        updateTrackingTimeline()
        setupClickListeners()
    }

    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener { finish() }
    }

    private fun displayOrderInfo() {
        order?.let { order ->
            binding.orderIdText.text = "Order #${order.id.takeLast(8).uppercase()}"
            binding.orderDateText.text = "Placed on ${formatDate(order.createdAt)}"
            
            val itemCount = order.items.size
            binding.itemCountText.text = "$itemCount item${if (itemCount != 1) "s" else ""} • ${order.totalAmount.formatPrice()}"
            
            binding.deliveryAddressText.text = order.shippingAddress?.fullAddress ?: "No address provided"
        }
    }

    private fun updateTrackingTimeline() {
        order?.let { order ->
            val status = order.status.lowercase()
            
            // Step 1: Order Placed - Always complete
            setStepComplete(binding.step1Icon, binding.step1Title, binding.step1Line, binding.step1Date)
            binding.step1Date.text = formatDate(order.createdAt)

            // Step 2: Processing
            when (status) {
                "pending" -> {
                    setStepPending(binding.step2Icon, binding.step2Title, binding.step2Line, binding.step2Date)
                    setStepPending(binding.step3Icon, binding.step3Title, binding.step3Line, binding.step3Date)
                    setStepPending(binding.step4Icon, binding.step4Title, null, binding.step4Date)
                }
                "processing" -> {
                    setStepComplete(binding.step2Icon, binding.step2Title, binding.step2Line, binding.step2Date)
                    binding.step2Date.text = "In progress"
                    setStepPending(binding.step3Icon, binding.step3Title, binding.step3Line, binding.step3Date)
                    setStepPending(binding.step4Icon, binding.step4Title, null, binding.step4Date)
                }
                "shipped" -> {
                    setStepComplete(binding.step2Icon, binding.step2Title, binding.step2Line, binding.step2Date)
                    binding.step2Date.text = "Completed"
                    setStepComplete(binding.step3Icon, binding.step3Title, binding.step3Line, binding.step3Date)
                    binding.step3Date.text = "On the way"
                    setStepPending(binding.step4Icon, binding.step4Title, null, binding.step4Date)
                }
                "delivered" -> {
                    setStepComplete(binding.step2Icon, binding.step2Title, binding.step2Line, binding.step2Date)
                    binding.step2Date.text = "Completed"
                    setStepComplete(binding.step3Icon, binding.step3Title, binding.step3Line, binding.step3Date)
                    binding.step3Date.text = "Completed"
                    setStepComplete(binding.step4Icon, binding.step4Title, null, binding.step4Date)
                    binding.step4Date.text = "Delivered"
                }
                "cancelled" -> {
                    binding.step2Title.text = "Cancelled"
                    binding.step2Icon.setImageResource(R.drawable.ic_close)
                    binding.step2Icon.imageTintList = ContextCompat.getColorStateList(this, R.color.error)
                    binding.step2Title.setTextColor(ContextCompat.getColor(this, R.color.error))
                }
            }
        }
    }

    private fun setStepComplete(icon: ImageView, title: TextView, line: android.view.View?, date: TextView) {
        icon.setImageResource(R.drawable.ic_check_circle)
        icon.imageTintList = ContextCompat.getColorStateList(this, R.color.success)
        title.setTextColor(ContextCompat.getColor(this, R.color.text_primary))
        title.setTypeface(null, android.graphics.Typeface.BOLD)
        line?.setBackgroundColor(ContextCompat.getColor(this, R.color.success))
        date.setTextColor(ContextCompat.getColor(this, R.color.text_secondary))
    }

    private fun setStepPending(icon: ImageView, title: TextView, line: android.view.View?, date: TextView) {
        icon.setImageResource(R.drawable.ic_circle_outline)
        icon.imageTintList = ContextCompat.getColorStateList(this, R.color.text_hint)
        title.setTextColor(ContextCompat.getColor(this, R.color.text_hint))
        title.setTypeface(null, android.graphics.Typeface.NORMAL)
        line?.setBackgroundColor(ContextCompat.getColor(this, R.color.divider))
        date.setTextColor(ContextCompat.getColor(this, R.color.text_hint))
        date.text = ""
    }

    private fun setupClickListeners() {
        binding.downloadInvoiceButton.setOnClickListener {
            generateInvoicePdf()
        }

        binding.reorderButton.setOnClickListener {
            reorderItems()
        }
    }

    private fun generateInvoicePdf() {
        order?.let { order ->
            try {
                val document = PdfDocument()
                val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 size
                val page = document.startPage(pageInfo)
                val canvas = page.canvas
                val paint = Paint()

                // Header
                paint.textSize = 24f
                paint.isFakeBoldText = true
                canvas.drawText("QuickKart Invoice", 40f, 60f, paint)

                // Order details
                paint.textSize = 12f
                paint.isFakeBoldText = false
                canvas.drawText("Order ID: ${order.id.takeLast(8).uppercase()}", 40f, 100f, paint)
                canvas.drawText("Date: ${formatDate(order.createdAt)}", 40f, 120f, paint)
                canvas.drawText("Status: ${order.status.replaceFirstChar { it.uppercase() }}", 40f, 140f, paint)

                // Line
                canvas.drawLine(40f, 160f, 555f, 160f, paint)

                // Items header
                paint.isFakeBoldText = true
                canvas.drawText("Item", 40f, 190f, paint)
                canvas.drawText("Qty", 350f, 190f, paint)
                canvas.drawText("Price", 450f, 190f, paint)

                // Items
                paint.isFakeBoldText = false
                var yPos = 220f
                order.items.forEach { item ->
                    canvas.drawText(item.product.name.take(40), 40f, yPos, paint)
                    canvas.drawText("${item.quantity}", 350f, yPos, paint)
                    canvas.drawText(item.product.discountedPrice.formatPrice(), 450f, yPos, paint)
                    yPos += 25f
                }

                // Total
                canvas.drawLine(40f, yPos + 10f, 555f, yPos + 10f, paint)
                paint.isFakeBoldText = true
                paint.textSize = 14f
                canvas.drawText("Total: ${order.totalAmount.formatPrice()}", 40f, yPos + 40f, paint)

                document.finishPage(page)

                // Save file
                val fileName = "Invoice_${order.id.takeLast(8)}.pdf"
                val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                val file = File(downloadsDir, fileName)
                document.writeTo(FileOutputStream(file))
                document.close()

                showToast("Invoice saved to Downloads")
            } catch (e: Exception) {
                showToast("Failed to generate invoice: ${e.message}")
            }
        }
    }

    private fun reorderItems() {
        order?.let { order ->
            order.items.forEach { item ->
                // Add each item to cart
                repeat(item.quantity) {
                    CartManager.addToCart(item.product)
                }
            }
            showToast("Items added to cart!")
            
            // Navigate to cart
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("navigate_to_cart", true)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
    }

    private fun formatDate(dateString: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val outputFormat = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
            val date = inputFormat.parse(dateString)
            outputFormat.format(date ?: Date())
        } catch (e: Exception) {
            dateString
        }
    }
}
