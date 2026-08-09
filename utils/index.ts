// utils/index.ts

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('uz-UZ').format(n)
}

export function formatCurrency(amount: number, currency: string = 'UZS'): string {
  const symbols: Record<string, string> = { UZS: "so'm", USD: '$', EUR: '€' }
  const formatted = new Intl.NumberFormat('uz-UZ').format(Math.round(amount))
  return currency === 'UZS'
    ? `${formatted} ${symbols[currency]}`
    : `${symbols[currency]}${formatted}`
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('uz-UZ', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: string): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return 'hozir'
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} kun oldin`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export function monthLabel(m: number): string {
  const months = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ]
  return months[m - 1] || String(m)
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function percent(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}
