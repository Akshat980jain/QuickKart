export async function fetchProducts() {
  const res = await fetch('https://quickkart-b0yb.onrender.com/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
} 