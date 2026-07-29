/**
 * Consistent price formatter — always renders as ₹XX.XX
 * Defensively handles null, undefined, and non-numeric inputs.
 */
export function formatPrice(amount?: number | null): string {
  if (amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount)) {
    return '₹0.00';
  }
  return `₹${amount.toFixed(2)}`;
}

/**
 * Calculates the percentage discount between original and sale price.
 */
export function calcDiscount(originalPrice?: number | null, salePrice?: number | null): number {
  if (!originalPrice || !salePrice || originalPrice <= 0 || salePrice <= 0) return 0;
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
