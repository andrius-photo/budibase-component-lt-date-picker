export type Locale = {
  weekdays?: string[]
  months?: string[]
  weekStartsOn?: number
}
type InnerLocale = {
  weekdays: string[]
  months: string[]
  weekStartsOn: number
}
export function getLocaleDefaults(): InnerLocale {
  return {
    weekdays: ['Sek','Pir', 'Antr', 'Tre', 'Ket', 'Pen', 'Šeš'],
    months: [
      'Sausis',
      'Vasaris',
      'Kovas',
      'Balandis',
      'Gegužė',
      'Birželis',
      'Liepa',
      'Rugpjūtis',
      'Rugsėjis',
      'Spalis',
      'Lapkritis',
      'Gruodis',
    ],
    weekStartsOn: 2,
  }
}
export function getInnerLocale(locale: Locale = {}): InnerLocale {
  const innerLocale = getLocaleDefaults()
  if (typeof locale.weekStartsOn === 'number') {
    innerLocale.weekStartsOn = locale.weekStartsOn
  }
  if (locale.months) innerLocale.months = locale.months
  if (locale.weekdays) innerLocale.weekdays = locale.weekdays
  return innerLocale
}

type DateFnsLocale = {
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  }
  localize?: {
    month: (n: number, options?: { width?: string }) => string
    day: (i: number, options?: { width?: string }) => string
  }
}
/** Create a Locale from a date-fns locale */
export function localeFromDateFnsLocale(dateFnsLocale: DateFnsLocale): InnerLocale {
  const locale = getLocaleDefaults()
  if (typeof dateFnsLocale?.options?.weekStartsOn === 'number') {
    locale.weekStartsOn = dateFnsLocale.options.weekStartsOn
  }
  if (dateFnsLocale.localize) {
    for (let i = 0; i < 7; i++) {
      // widths: narrow, short, abbreviated, wide, any
      locale.weekdays[i] = dateFnsLocale.localize.day(i, { width: 'short' })
    }

    for (let i = 0; i < 12; i++) {
      locale.months[i] = dateFnsLocale.localize.month(i, { width: 'wide' })
    }
  }
  return locale
}
