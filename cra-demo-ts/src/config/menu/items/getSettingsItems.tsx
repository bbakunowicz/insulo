import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {menuTypes} from 'insulo-menu';

// #Theming(start)
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import PaletteIcon from '@material-ui/icons/Palette';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
// #Theming(stop)

// #Localization(start)
import LanguageIcon from '@material-ui/icons/Language';
// #Localization(stop)

export default () => { 
  return [
      {
        caption: "Menu variants",
        icon: <MenuIcon />,
        items: [
          {
            caption: "Temporary",
            icon: <MenuOpenIcon />,
            dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.TEMPORARY},
            configProp: ['variant'],
            configValue: menuTypes.TEMPORARY
          },
          {
            caption: "Persistent",
            icon: <MenuIcon />,
            dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.PERSISTENT},
            configProp: ['variant'],
            configValue: menuTypes.PERSISTENT,
            // #Visibility(start)
            authProps: { persistentEnabled: true }
            // #Visibility(stop)
          },
          {
            caption: "Minimized",
            icon: < MoreVertIcon />,
            dispatcherProps: {type: menuTypes.SET_MENU_VARIANT, variant: menuTypes.MINIMIZED},
            configProp: ['variant'],
            configValue: menuTypes.MINIMIZED,
          },
        ],
      },
      // #Theming(start)
      {
        caption: "Theme type",
        icon: <InvertColorsIcon />,
        items: [
          {
            caption: "Light",
            icon: <Brightness7Icon />,
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME_TYPE', themeType: 'light'},
            configProp: ['type'],
            configValue: 'light'
          },
          {
            caption: "Dark",
            icon: <Brightness2Icon />,
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME_TYPE', themeType: 'dark'},
            configProp: ['type'],
            configValue: 'dark'
          },
        ]
      },
      {
        caption: "Themes",
        icon: <PaletteIcon />,
        items: [
          {
            caption: "Default",
            icon: <RadioButtonUncheckedIcon />,
            iconSelected: <RadioButtonCheckedIcon />,
            iconColor: indigo,
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME', current: 'default'},
            configProp: ['current'],
            configValue: 'default'
          },
          {
            caption: "Light red",
            icon: <RadioButtonUncheckedIcon />,
            iconSelected: <RadioButtonCheckedIcon />,
            iconColor: red[400],
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME', current: 'red-light'},
            configProp: ['current'],
            configValue: 'red-light'
          },
          {
            caption: "Dark red",
            icon: <RadioButtonUncheckedIcon />,
            iconSelected: <RadioButtonCheckedIcon />,
            iconColor: red[700],
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME', current: 'red-main'},
            configProp: ['current'],
            configValue: 'red-main'
          },
          {
            caption: "Light green",
            icon: <RadioButtonUncheckedIcon />,
            iconSelected: <RadioButtonCheckedIcon />,
            iconColor: green[400],
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME', current: 'green-light'},
            configProp: ['current'],
            configValue: 'green-light'
          },
          {
            caption: "Dark green",
            icon: <RadioButtonUncheckedIcon />,
            iconSelected: <RadioButtonCheckedIcon />,
            iconColor: green[700],
            context: 'theme',
            dispatcherProps: {type: 'SET_THEME', current: 'green-main'},
            configProp: ['current'],
            configValue: 'green-main'
          },
        ]
      },
      // #Theming(stop)

      // #Localization(start)
      {
        caption: "Languages",
        icon: <LanguageIcon />,
        items: [
          {
            caption: "English",
            classes: ['flag-icon', 'flag-icon-gb', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'en'},
            configProp: ['currentLocale'],
            configValue: 'en'
          },
          {
            caption: "American",
            classes: ['flag-icon', 'flag-icon-us', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'US'},
            configProp: ['currentLocale'],
            configValue: 'US'
          },
          {
            caption: "Polski",
            classes: ['flag-icon', 'flag-icon-pl', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'pl'},
            configProp: ['currentLocale'],
            configValue: 'pl'
          },
          {
            caption: "Español",
            classes: ['flag-icon', 'flag-icon-es', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'es'},
            configProp: ['currentLocale'],
            configValue: 'es'
          },
          {
            caption: "Français",
            classes: ['flag-icon', 'flag-icon-fr', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'fr'},
            configProp: ['currentLocale'],
            configValue: 'fr'
          },
          {
            caption: "Deutsche",
            classes: ['flag-icon', 'flag-icon-de', 'flag-icon-squared'],
            context: 'locale',
            dispatcherProps: {type: 'SET_CURRENT_LOCALE', currentLocale: 'de'},
            configProp: ['currentLocale'],
            configValue: 'de'
          },
        ]
      }
      // #Localization(stop)
    ];
}

