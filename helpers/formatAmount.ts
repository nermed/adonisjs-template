// helpers/formatAmount.js
export default function formatAmount(amount: any) {
  // Convert the amount to a string and split it by the decimal point
  const [integer, decimal] = amount.toString().split(".");

  // Add a comma separator every three digits in the integer part
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Return the formatted amount with the currency symbol and the decimal part
  return `${formattedInteger}${decimal ? `.${decimal}` : ''}`;
};
