const CURRENCY_FORMATTER = Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' });

export const formatCurrency = (num: number) => CURRENCY_FORMATTER.format(num);