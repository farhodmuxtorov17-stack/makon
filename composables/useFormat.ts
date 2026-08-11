/**
 * MAKON — Unified currency & number formatting
 * All amounts are in UZS (Uzbek Som)
 */

export function useFormat() {
  /**
   * Full format: 25 000 000 UZS
   */
  function formatUZS(amount: number): string {
    if (!amount && amount !== 0) return '—'
    return new Intl.NumberFormat('ru-RU').format(Math.round(amount)) + " UZS"
  }

  /**
   * Short format: 25.0M / 1.4 mlr
   */
  function formatUZSShort(amount: number): string {
    if (!amount && amount !== 0) return '—'
    if (Math.abs(amount) >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + ' mlr'
    if (Math.abs(amount) >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M'
    if (Math.abs(amount) >= 1_000) return (amount / 1_000).toFixed(0) + 'K'
    return String(Math.round(amount))
  }

  /**
   * Compact with currency: 25.0M UZS
   */
  function formatUZSCompact(amount: number): string {
    return formatUZSShort(amount) + " UZS"
  }

  /**
   * Per m²: 294 000 UZS/m²
   */
  function formatPerM2(amount: number): string {
    return new Intl.NumberFormat('ru-RU').format(Math.round(amount)) + " UZS/m²"
  }

  /**
   * Number with spaces: 1 248
   */
  function formatNumber(n: number): string {
    return new Intl.NumberFormat('ru-RU').format(n)
  }

  /**
   * Date: 15 avg 2026
   */
  function formatDate(d: string | Date): string {
    const date = typeof d === 'string' ? new Date(d) : d
    return date.toLocaleDateString('uz', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  /**
   * Relative time: "5 daqiqa avval"
   */
  function timeAgo(d: string | Date): string {
    const date = typeof d === 'string' ? new Date(d) : d
    const diff = Date.now() - date.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'hozir'
    if (mins < 60) return `${mins} daqiqa avval`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} soat avval`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} kun avval`
    const months = Math.floor(days / 30)
    return `${months} oy avval`
  }

  return { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo }
}
