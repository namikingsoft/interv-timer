import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { en } from '../locales/en'

const toKeyFromObj = (item, path = '') => {
  if (Array.isArray(item)) {
    return item.map((x, i) => toKeyFromObj(x, `${path}[${i}]`))
  }
  if (typeof item === 'object') {
    return Object.keys(item).reduce(
      (acc, x) => ({
        ...acc,
        [x]: toKeyFromObj(item[x], `${path}.${x}`),
      }),
      {},
    )
  }
  return path.replace(/^\./, '')
}

const keyObj = toKeyFromObj(en.translation)

interface ReturnHookType {
  t: TFunction
  k: typeof en.translation
}

export const useTranslationWithKey = (): ReturnHookType => {
  const { t } = useTranslation()
  return { t, k: keyObj }
}
