// @flow

import i18n from 'i18next';

const en = require('./translations/en');
const jp = require('./translations/jp');

i18n.init({
  fallbackLng: 'jp',
  initImmediate: false,
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    jp: {
      translation: jp,
    },
  },
});

i18n.ifExists = key => (i18n.exists(key) ? i18n.t(key) : '');
i18n.tf = (key, fallbackKey) => (i18n.exists(key) ? i18n.t(key) : i18n.ifExists(fallbackKey));

export default i18n;
