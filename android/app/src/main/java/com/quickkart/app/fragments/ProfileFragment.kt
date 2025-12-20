package com.quickkart.app.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.quickkart.app.activities.LoginActivity
import com.quickkart.app.activities.RegisterActivity
import com.quickkart.app.databinding.FragmentProfileBinding
import com.quickkart.app.managers.AuthManager

class ProfileFragment : Fragment() {
    
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        updateUI()
        setupClickListeners()
    }
    
    override fun onResume() {
        super.onResume()
        updateUI()
    }
    
    private fun updateUI() {
        if (AuthManager.isLoggedIn) {
            showLoggedInState()
        } else {
            showGuestState()
        }
    }
    
    private fun showLoggedInState() {
        val user = AuthManager.currentUser
        
        // Show user info
        binding.userInfoCard.visibility = View.VISIBLE
        binding.menuCard.visibility = View.VISIBLE
        binding.logoutButton.visibility = View.VISIBLE
        
        // Hide guest state
        binding.guestCard.visibility = View.GONE
        
        if (user != null) {
            binding.userName.text = user.name
            binding.userEmail.text = user.email
            binding.userRole.text = user.role.replaceFirstChar { it.uppercase() }
            binding.userInitial.text = user.name.firstOrNull()?.uppercase() ?: "U"
            binding.phoneValue.text = user.phone ?: "Not provided"
        }
    }
    
    private fun showGuestState() {
        // Hide user info
        binding.userInfoCard.visibility = View.GONE
        binding.menuCard.visibility = View.GONE
        binding.logoutButton.visibility = View.GONE
        
        // Show guest state
        binding.guestCard.visibility = View.VISIBLE
    }
    
    private fun setupClickListeners() {
        // Guest state buttons
        binding.guestLoginButton.setOnClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
        }
        
        binding.guestSignUpButton.setOnClickListener {
            startActivity(Intent(requireContext(), RegisterActivity::class.java))
        }
        
        // Profile info section
        binding.editProfileButton.setOnClickListener {
            // Could open edit profile dialog or activity
        }
        
        // Menu items - access the root view of each include
        binding.ordersItem.root.setOnClickListener {
            if (!AuthManager.isLoggedIn) {
                promptLogin("view orders")
                return@setOnClickListener
            }
            // Navigate to orders
        }
        
        binding.wishlistItem.root.setOnClickListener {
            if (!AuthManager.isLoggedIn) {
                promptLogin("view wishlist")
                return@setOnClickListener
            }
            // Navigate to wishlist
        }
        
        binding.paymentsItem.root.setOnClickListener {
            if (!AuthManager.isLoggedIn) {
                promptLogin("manage payments")
                return@setOnClickListener
            }
            // Navigate to payment methods
        }
        
        binding.notificationsItem.root.setOnClickListener {
            // Navigate to notifications
        }
        
        binding.settingsItem.root.setOnClickListener {
            // Navigate to settings
        }
        
        binding.helpItem.root.setOnClickListener {
            // Navigate to help/support
        }
        
        // Logout
        binding.logoutButton.setOnClickListener {
            showLogoutConfirmation()
        }
    }
    
    private fun promptLogin(action: String) {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Login Required")
            .setMessage("Please login to $action")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setPositiveButton("Login") { _, _ ->
                startActivity(Intent(requireContext(), LoginActivity::class.java))
            }
            .show()
    }
    
    private fun showLogoutConfirmation() {
        MaterialAlertDialogBuilder(requireContext())
            .setTitle("Logout")
            .setMessage("Are you sure you want to logout?")
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .setPositiveButton("Logout") { _, _ ->
                AuthManager.logout()
                updateUI()
            }
            .show()
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
