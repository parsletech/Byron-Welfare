import { KES_TO_USD } from "../config/sheets"

export const formatCurrency = (amount, currency = "KES") => {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * KES_TO_USD)
  }
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (amount) =>
  new Intl.NumberFormat("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)