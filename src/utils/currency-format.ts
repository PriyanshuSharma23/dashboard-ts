export const formatCurrency = (amount: number): string => {
  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  return rupee.format(amount);
};
