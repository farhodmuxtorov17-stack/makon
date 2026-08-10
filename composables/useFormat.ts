export function useFormat() {
  function formatPrice(v: number, currency = true): string {
    if (!v && v !== 0) return '—'
    const formatted = new Intl.NumberFormat('ru-RU').format(v)
    return currency ? formatted + " so'm" : formatted
  }

  function formatPriceShort(v: number): string {
    if (v >= 1000000000) return (v / 1000000000).toFixed(1) + ' mlrd'
    if (v >= 1000000) return (v / 1000000).toFixed(v >= 10000000 ? 0 : 1) + ' mln'
    if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
    return String(v)
  }

  function formatDate(d: string | null | undefined, opts?: 'short' | 'long' | 'relative'): string {
    if (!d) return '—'
    const date = new Date(d)
    if (isNaN(date.getTime())) return '—'
    
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
    const monthsLong = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
    
    if (opts === 'relative') {
      const diff = Date.now() - date.getTime()
      const mins = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      if (mins < 1) return 'hozir'
      if (mins < 60) return `${mins} daqiqa oldin`
      if (hours < 24) return `${hours} soat oldin`
      if (days < 7) return `${days} kun oldin`
    }
    
    if (opts === 'long') {
      return `${date.getDate()} ${monthsLong[date.getMonth()]} ${date.getFullYear()}`
    }
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  function formatDateTime(d: string | null | undefined): string {
    if (!d) return '—'
    const date = new Date(d)
    if (isNaN(date.getTime())) return '—'
    const time = date.toTimeString().slice(0, 5)
    return formatDate(d) + ', ' + time
  }

  function initials(name: string): string {
    if (!name) return '?'
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  }

  return { formatPrice, formatPriceShort, formatDate, formatDateTime, initials }
}
