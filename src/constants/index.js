export default {
  BASE_URL:
    'https://0pysqf2ujc.execute-api.us-west-1.amazonaws.com/drywall-development',

  PRIVACY_POLICY: 'https://www.drywallgenie.com/pages/privacy-policy',
  TERMS_AND_CONDITIONS:
    'https://www.drywallgenie.com/pages/terms-and-conditions',

  TOKEN: 'TOKEN',

  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  SPECIAL_CHAR_REGEXP: /^[a-zA-Z0-9\s]*$/,
  VALID_EMAIL_REGEXP:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
