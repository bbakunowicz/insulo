import type {LocaleProviderInitValues} from 'insulo-locale-provider';

import en from './lang/en'
import pl from './lang/pl'
import US from './lang/en-US'
import es from './lang/es'
import fr from './lang/fr'
import de from './lang/de'

const init:LocaleProviderInitValues = { 
  defaultLang: 'en',
  locales: {
    US,
    en,
    pl,
    es,
    fr,
    de
  },
  mappingsMui:{
    US: 'enUS',
    en: 'enUS',
    pl: 'plPL',
    es: 'esES',
    fr: 'frFR',
    de: 'deDE'
  },
  mappingsHtml:{
    US: 'en-US',
    en: 'en-EN',
    pl: 'pl',
    es: 'es',
    fr: 'fr',
    de: 'de'
  }
}

export default init;