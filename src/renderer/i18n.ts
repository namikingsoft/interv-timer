import i18next from 'i18next'
import { en } from './locales/en'
import { ja } from './locales/ja'

const instance = i18next.createInstance()

instance.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en,
    ja,
  },
  returnObjects: false,
})

export const i18n = instance
