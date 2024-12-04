const validateMenuItem = (item) => {
    const categories = ['Pizza', 'Pasta', 'Dessert'];
    if (!item.name || typeof item.name !== 'string') return "Invalid name";
    if (!item.price || item.price <= 0) return "Invalid price";
    if (!categories.includes(item.category)) return "Invalid category";
    return null;
  };
  
  const validateOrder = (items, menu) => {
    if (!Array.isArray(items)) return "Invalid items format";
    for (const { id, quantity } of items) {
      if (!menu.find(item => item.id === id)) return `Invalid item ID: ${id}`;
      if (!quantity || quantity <= 0) return "Invalid quantity";
    }
    return null;
  };
  
  module.exports = { validateMenuItem, validateOrder };
  