import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { pt } from './pt'

// Registry of available locales. Add new languages here.
const locales = {
  'pt-PT': pt,
}

export type Locale = keyof typeof locales
export const DEFAULT_LOCALE: Locale = 'pt-PT'

type Vars = Record<string, string | number>

/** Resolve a dotted key path (e.g. "home.title") against a translation dict. */
function resolve(dict: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, dict)
}

/** Replace {placeholders} in a string with the provided variables. */
function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (_, name) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  )
}

interface I18nValue {
  locale: Locale
  /** Translate a key, with optional {var} interpolation. */
  t: (key: string, vars?: Vars) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({
  children,
  locale = DEFAULT_LOCALE,
}: {
  children: ReactNode
  locale?: Locale
}) {
  const value = useMemo<I18nValue>(() => {
    const dict = locales[locale]
    return {
      locale,
      t: (key, vars) => {
        const found = resolve(dict, key)
        if (typeof found !== 'string') {
          // Missing/!string key: surface the key so it's easy to spot.
          if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${key}`)
          return key
        }
        return interpolate(found, vars)
      },
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** Hook returning the translate function `t`. */
export function useT() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useT must be used within <I18nProvider>')
  return ctx.t
}

/** Hook returning the full i18n context (locale + t). */
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
