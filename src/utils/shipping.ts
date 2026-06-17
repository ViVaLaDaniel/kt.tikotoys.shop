export const calculateShippingCost = (
  subtotal: number,
  shippingMethod: string,
): number => {
  if (shippingMethod === 'express') return 9.99;
  return subtotal > 50 ? 0 : 5.99;
};
