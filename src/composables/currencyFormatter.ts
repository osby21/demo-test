export const useCurrencyFormatter = (locale = 'en-US', currency = 'USD') => {
  return {
    format: (value: number | undefined | null, fractionDigits = 0) => {
      // Maneja casos donde el valor no sea numérico
      const safeValue = value || 0;
      return safeValue.toLocaleString(locale, {
        style: 'currency',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
        currency: currency
      });
    }
  }
}
