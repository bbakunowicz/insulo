import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// #Localization(start)
import { IntlProvider, FormattedMessage } from "react-intl";
import {withLocale} from 'insulo-locale-provider';
// #Localization(stop)

// #Localization(start)
const messages = {
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

const INITIAL_STATE = {};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push('/calories');
  }
  
  render() {
    let goto = "Go to";
    let sample = "Sample Data";
  
    // #Localization(start)
    const {value: localeConfig} = this.props.localeContext;
  
    if (localeConfig.currentLocale && typeof localeConfig.locales == 'object' && 
      typeof localeConfig.locales[localeConfig.currentLocale] == 'object') {
      goto = localeConfig.locales[localeConfig.currentLocale]['page_el_goto'];
      sample = localeConfig.locales[localeConfig.currentLocale]['item_sample'];
    }
  
    return (
      <section>
        <IntlProvider locale={localeConfig.currentLocaleHtml} messages={messages[localeConfig.currentLocale]}>
          <h1><FormattedMessage id="heading" /></h1>
          <Typography paragraph>
            <FormattedMessage id="greeting" />
            <br />
            <FormattedMessage id="time" values={{ t: Date.now() }} />
            <br />
            <FormattedMessage id="date" values={{ d: Date.now() }} />
          </Typography>
          <Link href="#" onClick={this.handleClick}>
            {`${goto} "${sample}"`}
          </Link>
        </IntlProvider>
        
      </section>
    )
    // #Localization(stop)
  
    // #No localization(start) - comment the lines below when using localization
    // return (
    //   <section>
    //     <h1>Home</h1>
    //     <Typography paragraph>"Hello! How are you?"</Typography>
    //     <Link href="#" onClick={this.handleClick}>
    //       {`${goto} "${sample}"`}
    //     </Link>
    //   </section>
    // )
    // #No localization(stop)
  
  }
}

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
  localeContext: PropTypes.object.isRequired
};

export default withLocale(Dashboard);
