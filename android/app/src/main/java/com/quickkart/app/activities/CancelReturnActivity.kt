package com.quickkart.app.activities

import android.os.Bundle
import android.view.View
import android.widget.RadioButton
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.Snackbar
import com.quickkart.app.R
import com.quickkart.app.databinding.ActivityCancelReturnBinding
import com.quickkart.app.managers.OrdersManager
import com.quickkart.app.models.Order
import com.quickkart.app.utils.formatPrice
import java.text.SimpleDateFormat
import java.util.Locale

class CancelReturnActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_ORDER_ID = "order_id"
        const val EXTRA_IS_RETURN = "is_return"
    }

    private lateinit var binding: ActivityCancelReturnBinding
    private var order: Order? = null
    private var isReturn = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCancelReturnBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val orderId = intent.getStringExtra(EXTRA_ORDER_ID)
        isReturn = intent.getBooleanExtra(EXTRA_IS_RETURN, false)

        if (orderId == null) {
            finish()
            return
        }

        order = OrdersManager.getOrderById(orderId)
        if (order == null) {
            finish()
            return
        }

        setupToolbar()
        setupOrderSummary()
        setupReasonOptions()
        setupRefundMethodListeners()
        setupConfirmButton()
    }

    private fun setupToolbar() {
        binding.toolbar.title = if (isReturn) "Return Order" else "Cancel Order"
        binding.toolbar.setNavigationOnClickListener {
            finish()
        }
    }

    private fun setupOrderSummary() {
        order?.let { o ->
            binding.orderId.text = "#${o.id}"
            binding.orderDate.text = formatOrderDate(o.createdAt)
            binding.refundAmount.text = o.totalAmount.formatPrice()
        }
    }

    private fun setupReasonOptions() {
        // Update title based on action type
        binding.reasonTitle.text = if (isReturn) {
            "Why do you want to return this order?"
        } else {
            "Why do you want to cancel this order?"
        }

        // Show return-specific reasons for delivered orders
        if (isReturn) {
            binding.reasonNotAsDescribed.visibility = View.VISIBLE
            binding.reasonDefective.visibility = View.VISIBLE
            binding.reasonWrongItem.visibility = View.VISIBLE
        }

        // Listen for "Other" selection to show text input
        binding.reasonGroup.setOnCheckedChangeListener { _, checkedId ->
            binding.otherReasonLayout.visibility = if (checkedId == R.id.reasonOther) {
                View.VISIBLE
            } else {
                View.GONE
            }
        }
    }

    private fun setupRefundMethodListeners() {
        binding.refundMethodGroup.setOnCheckedChangeListener { _, checkedId ->
            // Hide all
            binding.upiLayout.visibility = View.GONE
            binding.bankDetailsLayout.visibility = View.GONE
            binding.giftCouponInfo.visibility = View.GONE
            binding.refundTimeline.visibility = View.VISIBLE

            when (checkedId) {
                R.id.refundUpi -> {
                    binding.upiLayout.visibility = View.VISIBLE
                }
                R.id.refundGiftCoupon -> {
                    binding.giftCouponInfo.visibility = View.VISIBLE
                    binding.refundTimeline.visibility = View.GONE // Instant for gift
                }
                R.id.refundBank -> {
                    binding.bankDetailsLayout.visibility = View.VISIBLE
                }
            }
        }
    }

    private fun setupConfirmButton() {
        binding.confirmButton.text = if (isReturn) "Request Return" else "Confirm Cancellation"

        binding.confirmButton.setOnClickListener {
            if (validateInputs()) {
                showFinalConfirmation()
            }
        }
    }

    private fun validateInputs(): Boolean {
        // Check reason selected
        if (binding.reasonGroup.checkedRadioButtonId == -1) {
            Snackbar.make(binding.root, "Please select a reason", Snackbar.LENGTH_SHORT).show()
            return false
        }

        // Check other reason text if selected
        if (binding.reasonGroup.checkedRadioButtonId == R.id.reasonOther) {
            if (binding.otherReasonInput.text.isNullOrBlank()) {
                binding.otherReasonLayout.error = "Please specify your reason"
                return false
            }
        }

        // Check refund method selected
        if (binding.refundMethodGroup.checkedRadioButtonId == -1) {
            Snackbar.make(binding.root, "Please select a refund method", Snackbar.LENGTH_SHORT).show()
            return false
        }

        // Validate UPI
        if (binding.refundMethodGroup.checkedRadioButtonId == R.id.refundUpi) {
            val upi = binding.upiInput.text.toString().trim()
            if (upi.isBlank() || !upi.contains("@")) {
                binding.upiLayout.error = "Please enter a valid UPI ID"
                return false
            }
        }

        // Validate bank details
        if (binding.refundMethodGroup.checkedRadioButtonId == R.id.refundBank) {
            if (binding.accountHolderInput.text.isNullOrBlank()) {
                Snackbar.make(binding.root, "Please enter account holder name", Snackbar.LENGTH_SHORT).show()
                return false
            }
            if (binding.accountNumberInput.text.isNullOrBlank()) {
                Snackbar.make(binding.root, "Please enter account number", Snackbar.LENGTH_SHORT).show()
                return false
            }
            if (binding.ifscInput.text.isNullOrBlank()) {
                Snackbar.make(binding.root, "Please enter IFSC code", Snackbar.LENGTH_SHORT).show()
                return false
            }
        }

        return true
    }

    private fun showFinalConfirmation() {
        val actionText = if (isReturn) "return" else "cancellation"
        val refundMethod = when (binding.refundMethodGroup.checkedRadioButtonId) {
            R.id.refundUpi -> "UPI (${binding.upiInput.text})"
            R.id.refundGiftCoupon -> "Gift Coupon (Instant)"
            R.id.refundBank -> "Bank Transfer"
            else -> ""
        }

        MaterialAlertDialogBuilder(this)
            .setTitle("Confirm ${if (isReturn) "Return" else "Cancellation"}")
            .setMessage("Your refund of ${order?.totalAmount?.formatPrice()} will be processed via $refundMethod.\n\nAre you sure you want to proceed with this $actionText?")
            .setNegativeButton("Go Back") { dialog, _ ->
                dialog.dismiss()
            }
            .setPositiveButton("Confirm") { _, _ ->
                processRequest()
            }
            .show()
    }

    private fun processRequest() {
        val reason = getSelectedReason()
        val refundMethod = getSelectedRefundMethod()
        val refundDetails = getRefundDetails()

        val success = if (isReturn) {
            OrdersManager.requestReturn(order!!.id, reason, refundMethod, refundDetails)
        } else {
            OrdersManager.cancelOrder(order!!.id, reason, refundMethod, refundDetails)
        }

        if (success) {
            val message = if (isReturn) {
                "Return request submitted successfully!"
            } else {
                "Order cancelled successfully!"
            }
            
            MaterialAlertDialogBuilder(this)
                .setTitle("Success")
                .setMessage("$message\n\nYour refund will be processed shortly.")
                .setPositiveButton("OK") { _, _ ->
                    finish()
                }
                .setCancelable(false)
                .show()
        } else {
            Snackbar.make(binding.root, "Failed to process request", Snackbar.LENGTH_SHORT).show()
        }
    }

    private fun getSelectedReason(): String {
        val selectedId = binding.reasonGroup.checkedRadioButtonId
        return if (selectedId == R.id.reasonOther) {
            binding.otherReasonInput.text.toString()
        } else {
            findViewById<RadioButton>(selectedId)?.text?.toString() ?: ""
        }
    }

    private fun getSelectedRefundMethod(): String {
        return when (binding.refundMethodGroup.checkedRadioButtonId) {
            R.id.refundUpi -> "UPI"
            R.id.refundGiftCoupon -> "Gift Coupon"
            R.id.refundBank -> "Bank Transfer"
            else -> ""
        }
    }

    private fun getRefundDetails(): Map<String, String> {
        return when (binding.refundMethodGroup.checkedRadioButtonId) {
            R.id.refundUpi -> mapOf("upi_id" to binding.upiInput.text.toString())
            R.id.refundBank -> mapOf(
                "account_holder" to binding.accountHolderInput.text.toString(),
                "account_number" to binding.accountNumberInput.text.toString(),
                "ifsc" to binding.ifscInput.text.toString()
            )
            else -> emptyMap()
        }
    }

    private fun formatOrderDate(dateString: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
            val outputFormat = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
            val date = inputFormat.parse(dateString)
            date?.let { outputFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }
}
