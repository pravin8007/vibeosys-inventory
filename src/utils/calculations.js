export const calculateMaterial = (qty, price) => {
  const totalPrice = qty * price;
  const tax = totalPrice * 0.1;
  return {
    totalPrice,
    tax,
    totalAmount: totalPrice + tax,
  };
};

export const calculateProductTotal = (materials) =>
  materials.reduce((sum, m) => sum + m.totalAmount, 0);
