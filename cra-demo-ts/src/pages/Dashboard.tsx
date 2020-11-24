import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import type { History, LocationState } from 'history';
// #Localization(start)
import { useContext } from 'react'
import { IntlProvider, FormattedMessage } from "react-intl";
import LocaleContext from 'insulo-locale-provider';
// #Localization(stop)

// #Localization(start)
interface IMessages {
  [key: string]: Record<string,string>
}

const messages: IMessages = {
  US: {
    greeting: "Yo Man, what's up?",
    time: "The time is {t, time, short}.",
    date: "The date is {d, date}.",
    heading: "Home (US)"
  },
  en: {
    greeting: "Hello! How are you?",
    time: "The time is {t, time, short}.",
    date: "The date is {d, date}.",
    heading: "Home (EN)"
  },
  pl: {
    greeting: "Witaj! Jak się masz?",
    time: "Jest godzina {t, time, short}.",
    date: "Dzisiaj mamy {d, date}.",
    heading: "Strona domowa"
  },
  es: {
    greeting: "¡Hola! ¿Cómo estás?",
    time: "La hora es {t, time, short}.",
    date: "La fecha es {d, date}.",
    heading: "Casa"
  },
  fr: {
    greeting: "Bonjour! Comment ça va?",
    time: "Il est {t, time, short}.",
    date: "La date est {d, date}.",
    heading: "Accueil"
  },
  de: {
    greeting: "Hallo! Wie geht's?",
    time: "Es ist {t, time, short} Uhr.",
    date: "Das Datum ist {d, date}.",
    heading: "Zuhause"
  }
};
// #Localization(stop)

const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, history: History<LocationState>):void => {
  event.preventDefault();
  history.push('/calories');
}

const Page = ({history}: {history: History<LocationState>}) => {
  let goto = "Go to";
  let sample = "Sample Data";

  // #Localization(start)
  const { value: localeConfig } = useContext(LocaleContext);
  
  if (localeConfig.currentLocale && typeof localeConfig.locales == 'object' && 
    typeof localeConfig.locales[localeConfig.currentLocale] == 'object') {
    goto = localeConfig.locales[localeConfig.currentLocale]['page_el_goto'];
    sample = localeConfig.locales[localeConfig.currentLocale]['item_sample'];
  }

  return (
    <section>
      <IntlProvider locale={localeConfig.currentLocaleHtml} messages={messages[localeConfig.currentLocale as keyof IMessages]}>
        <h1><FormattedMessage id="heading" /></h1>
        <Typography paragraph>
          <FormattedMessage id="greeting" />
          <br />
          <FormattedMessage id="time" values={{ t: Date.now() }} />
          <br />
          <FormattedMessage id="date" values={{ d: Date.now() }} />
        </Typography>
        <Link href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void => handleClick(e, history)}>
          {`${goto} "${sample}"`}
        </Link>
      </IntlProvider>
    </section>
  )
  // #Localization(stop)

  // #No localization(start) - comment below when using localization
  // return (
  //   <section>
  //     <h1>Home</h1>
  //     <Typography paragraph>"Hello! How are you?"</Typography>
  //     <Link href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void => handleClick(e, history)}>
  //       {`${goto} "${sample}"`}
  //     </Link>
  //   </section>
  // )
  // #No localization(stop)

}

export default Page
