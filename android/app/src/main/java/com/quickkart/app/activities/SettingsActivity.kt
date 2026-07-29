package com.quickkart.app.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.quickkart.app.databinding.ActivitySettingsBinding

class SettingsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupVersion()
    }

    private fun setupToolbar() {
        binding.toolbar.setNavigationOnClickListener {
            finish()
        }
    }

    private fun setupVersion() {
        try {
            val packageInfo = packageManager.getPackageInfo(packageName, 0)
            binding.versionText.text = packageInfo.versionName
        } catch (e: Exception) {
            binding.versionText.text = "1.0.0"
        }
    }
}
