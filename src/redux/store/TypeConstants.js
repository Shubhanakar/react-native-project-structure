export const TOKEN = {
  SET_TOKEN_REQUEST: {
    type: 'SET_TOKEN_REQUEST',
    value: 'token',
  },
  SET_TOKEN_SUCCESS: {
    type: 'SET_TOKEN_SUCCESS',
    value: 'token',
  },
  SET_TOKEN_FAILURE: {
    type: 'SET_TOKEN_FAILURE',
    value: 'token',
  },

  GET_TOKEN_REQUEST: {
    type: 'GET_TOKEN_REQUEST',
    value: 'token',
  },
  GET_TOKEN_SUCCESS: {
    type: 'GET_TOKEN_SUCCESS',
    value: 'token',
  },
  GET_TOKEN_FAILURE: {
    type: 'GET_TOKEN_FAILURE',
    value: 'token',
  },
};

export const AUTH = {
  LOGIN_REQUEST: {
    type: 'LOGIN_REQUEST',
    value: 'signinResponse',
  },
  LOGIN_SUCCESS: {
    type: 'LOGIN_SUCCESS',
    value: 'signinResponse',
  },
  LOGIN_FAILURE: {
    type: 'LOGIN_FAILURE',
    value: 'signinResponse',
  },

  LOGOUT_REQUEST: {
    type: 'LOGOUT_REQUEST',
    value: 'signinResponse',
  },
  LOGOUT_SUCCESS: {
    type: 'LOGOUT_SUCCESS',
    value: 'signinResponse',
  },
  LOGOUT_FAILURE: {
    type: 'LOGOUT_FAILURE',
    value: 'signinResponse',
  },

  SIGNUP_REQUEST: {
    type: 'SIGNUP_REQUEST',
    value: 'signUpResponse',
  },
  SIGNUP_SUCCESS: {
    type: 'SIGNUP_SUCCESS',
    value: 'signUpResponse',
  },
  SIGNUP_FAILURE: {
    type: 'SIGNUP_FAILURE',
    value: 'signUpResponse',
  },

  FORGOT_PASSWORD_REQUEST: {
    type: 'FORGOT_PASSWORD_REQUEST',
    value: 'forgotpwRes',
  },
  FORGOT_PASSWORD_SUCCESS: {
    type: 'FORGOT_PASSWORD_SUCCESS',
    value: 'forgotpwRes',
  },
  FORGOT_PASSWORD_FAILURE: {
    type: 'FORGOT_PASSWORD_FAILURE',
    value: 'forgotpwRes',
  },

  FORGOT_PW_VERIFY_REQUEST: {
    type: 'FORGOT_PW_VERIFY_REQUEST',
    value: 'forgotpwVerifyRes',
  },
  FORGOT_PW_VERIFY_SUCCESS: {
    type: 'FORGOT_PW_VERIFY_SUCCESS',
    value: 'forgotpwVerifyRes',
  },
  FORGOT_PW_VERIFY_FAILURE: {
    type: 'FORGOT_PW_VERIFY_FAILURE',
    value: 'forgotpwVerifyRes',
  },

  RESET_PW_REQUEST: {
    type: 'RESET_PW_REQUEST',
    value: 'resetpwRes',
  },
  RESET_PW_SUCCESS: {
    type: 'RESET_PW_SUCCESS',
    value: 'resetpwRes',
  },
  RESET_PW_FAILURE: {
    type: 'RESET_PW_FAILURE',
    value: 'resetpwRes',
  },

  GET_CMS_REQUEST: {
    type: 'GET_CMS_REQUEST',
    value: 'cmsList',
  },
  GET_CMS_SUCCESS: {
    type: 'GET_CMS_SUCCESS',
    value: 'cmsList',
  },
  GET_CMS_FAILURE: {
    type: 'GET_CMS_FAILURE',
    value: 'cmsList',
  },

  OTP_VERIFY_REQUEST: {
    type: 'OTP_VERIFY_REQUEST',
    value: 'otpResponse',
  },
  OTP_VERIFY_SUCCESS: {
    type: 'OTP_VERIFY_SUCCESS',
    value: 'otpResponse',
  },
  OTP_VERIFY_FAILURE: {
    type: 'OTP_VERIFY_FAILURE',
    value: 'otpResponse',
  },

  OTP_RESEND_REQUEST: {
    type: 'OTP_RESEND_REQUEST',
    value: 'resendOTP',
  },
  OTP_RESEND_SUCCESS: {
    type: 'OTP_RESEND_SUCCESS',
    value: 'resendOTP',
  },
  OTP_RESEND_FAILURE: {
    type: 'OTP_RESEND_FAILURE',
    value: 'resendOTP',
  },

  GET_COUNTRY_LIST_REQUEST: {
    type: 'GET_COUNTRY_LIST_REQUEST',
    value: 'countryList',
  },
  GET_COUNTRY_LIST_SUCCESS: {
    type: 'GET_COUNTRY_LIST_SUCCESS',
    value: 'countryList',
  },
  GET_COUNTRY_LIST_FAILURE: {
    type: 'GET_COUNTRY_LIST_FAILURE',
    value: 'countryList',
  },

  SOCIAL_DATA_REQUEST: {
    type: 'SOCIAL_DATA_REQUEST',
    value: 'socialData',
  },
  SOCIAL_DATA_SUCCESS: {
    type: 'SOCIAL_DATA_SUCCESS',
    value: 'socialData',
  },
  SOCIAL_DATA_FAILURE: {
    type: 'SOCIAL_DATA_FAILURE',
    value: 'socialData',
  },
};

export const JOB = {
  CREATE_JOB_REQUEST: {
    type: 'CREATE_JOB_REQUEST',
    value: 'createJob',
  },
  CREATE_JOB_SUCCESS: {
    type: 'CREATE_JOB_SUCCESS',
    value: 'createJob',
  },
  CREATE_JOB_FAILURE: {
    type: 'CREATE_JOB_FAILURE',
    value: 'createJob',
  },

  EDIT_JOB_REQUEST: {
    type: 'EDIT_JOB_REQUEST',
    value: 'editJob',
  },
  EDIT_JOB_SUCCESS: {
    type: 'EDIT_JOB_SUCCESS',
    value: 'editJob',
  },
  EDIT_JOB_FAILURE: {
    type: 'EDIT_JOB_FAILURE',
    value: 'editJob',
  },

  DELETE_JOB_REQUEST: {
    type: 'DELETE_JOB_REQUEST',
    value: 'deleteJobRes',
  },
  DELETE_JOB_SUCCESS: {
    type: 'DELETE_JOB_SUCCESS',
    value: 'deleteJobRes',
  },
  DELETE_JOB_FAILURE: {
    type: 'DELETE_JOB_FAILURE',
    value: 'deleteJobRes',
  },

  ADD_NEW_JOB_AREA_REQUEST: {
    type: 'ADD_NEW_JOB_AREA_REQUEST',
    value: 'addNewJobArea',
  },
  ADD_NEW_JOB_AREA_SUCCESS: {
    type: 'ADD_NEW_JOB_AREA_SUCCESS',
    value: 'addNewJobArea',
  },
  ADD_NEW_JOB_AREA_FAILURE: {
    type: 'ADD_NEW_JOB_AREA_FAILURE',
    value: 'addNewJobArea',
  },
  CREATE_JOB_AREA_REQUEST: {
    type: 'CREATE_JOB_AREA_REQUEST',
    value: 'createJobArea',
  },
  CREATE_JOB_AREA_SUCCESS: {
    type: 'CREATE_JOB_AREA_SUCCESS',
    value: 'createJobArea',
  },
  CREATE_JOB_AREA_FAILURE: {
    type: 'CREATE_JOB_AREA_FAILURE',
    value: 'createJobArea',
  },

  JOB_LIST_REQUEST: {
    type: 'JOB_LIST_REQUEST',
    value: 'jobList',
  },
  JOB_LIST_SUCCESS: {
    type: 'JOB_LIST_SUCCESS',
    value: 'jobList',
  },
  JOB_LIST_FAILURE: {
    type: 'JOB_LIST_FAILURE',
    value: 'jobList',
  },
  KEEP_JOB_REQUEST: {
    type: 'KEEP_JOB_REQUEST',
    value: 'keepJobs',
  },
  KEEP_JOB_SUCCESS: {
    type: 'KEEP_JOB_SUCCESS',
    value: 'keepJobs',
  },
  KEEP_JOB_FAILURE: {
    type: 'KEEP_JOB_FAILURE',
    value: 'keepJobs',
  },

  CREATE_SHEET_REQUEST: {
    type: 'CREATE_SHEET_REQUEST',
    value: 'createSheet',
  },
  CREATE_SHEET_SUCCESS: {
    type: 'CREATE_SHEET_SUCCESS',
    value: 'createSheet',
  },
  CREATE_SHEET_FAILURE: {
    type: 'CREATE_SHEET_FAILURE',
    value: 'createSheet',
  },

  EDIT_SHEET_REQUEST: {
    type: 'EDIT_SHEET_REQUEST',
    value: 'editSheet',
  },
  EDIT_SHEET_SUCCESS: {
    type: 'EDIT_SHEET_SUCCESS',
    value: 'editSheet',
  },
  EDIT_SHEET_FAILURE: {
    type: 'EDIT_SHEET_FAILURE',
    value: 'editSheet',
  },

  DELETE_SHEET_REQUEST: {
    type: 'DELETE_SHEET_REQUEST',
    value: 'deleteSheet',
  },
  DELETE_SHEET_SUCCESS: {
    type: 'DELETE_SHEET_SUCCESS',
    value: 'deleteSheet',
  },
  DELETE_SHEET_FAILURE: {
    type: 'DELETE_SHEET_FAILURE',
    value: 'deleteSheet',
  },

  DELETE_SUPPLIER_REQUEST: {
    type: 'DELETE_SUPPLIER_REQUEST',
    value: 'deleteSupplier',
  },
  DELETE_SUPPLIER_SUCCESS: {
    type: 'DELETE_SUPPLIER_SUCCESS',
    value: 'deleteSupplier',
  },
  DELETE_SUPPLIER_FAILURE: {
    type: 'DELETE_SUPPLIER_FAILURE',
    value: 'deleteSupplier',
  },

  CREATE_SUPPLIER_REQUEST: {
    type: 'CREATE_SUPPLIER_REQUEST',
    value: 'createSupplier',
  },
  CREATE_SUPPLIER_SUCCESS: {
    type: 'CREATE_SUPPLIER_SUCCESS',
    value: 'createSupplier',
  },
  CREATE_SUPPLIER_FAILURE: {
    type: 'CREATE_SUPPLIER_FAILURE',
    value: 'createSupplier',
  },

  EDIT_SUPPLIER_REQUEST: {
    type: 'EDIT_SUPPLIER_REQUEST',
    value: 'editSupplier',
  },
  EDIT_SUPPLIER_SUCCESS: {
    type: 'EDIT_SUPPLIER_SUCCESS',
    value: 'editSupplier',
  },
  EDIT_SUPPLIER_FAILURE: {
    type: 'EDIT_SUPPLIER_FAILURE',
    value: 'editSupplier',
  },

  SHEET_TYPE_REQUEST: {
    type: 'SHEET_TYPE_REQUEST',
    value: 'shteeType',
  },
  SHEET_TYPE_SUCCESS: {
    type: 'SHEET_TYPE_SUCCESS',
    value: 'shteeType',
  },
  SHEET_TYPE_FAILURE: {
    type: 'SHEET_TYPE_FAILURE',
    value: 'shteeType',
  },

  GET_SHEETS_REQUEST: {
    type: 'GET_SHEETS_REQUEST',
    value: 'sheetList',
  },
  GET_SHEETS_SUCCESS: {
    type: 'GET_SHEETS_SUCCESS',
    value: 'sheetList',
  },
  GET_SHEETS_FAILURE: {
    type: 'GET_SHEETS_FAILURE',
    value: 'sheetList',
  },

  GET_SUPPLIER_LIST_REQUEST: {
    type: 'GET_SUPPLIER_LIST_REQUEST',
    value: 'supplierList',
  },
  GET_SUPPLIER_LIST_SUCCESS: {
    type: 'GET_SUPPLIER_LIST_SUCCESS',
    value: 'supplierList',
  },
  GET_SUPPLIER_LIST_FAILURE: {
    type: 'GET_SUPPLIER_LIST_FAILURE',
    value: 'supplierList',
  },

  GET_SINGLE_JOB_DETAILS_REQUEST: {
    type: 'GET_SINGLE_JOB_DETAILS_REQUEST',
    value: 'singleJobDetailsReq',
  },
  GET_SINGLE_JOB_DETAILS_SUCCESS: {
    type: 'GET_SINGLE_JOB_DETAILS_SUCCESS',
    value: 'singleJobDetailsReq',
  },
  GET_SINGLE_JOB_DETAILS_FAILURE: {
    type: 'GET_SINGLE_JOB_DETAILS_FAILURE',
    value: 'singleJobDetailsReq',
  },

  GET_JOB_AREA_REQUEST: {
    type: 'GET_JOB_AREA_REQUEST',
    value: 'jobAreaList',
  },
  GET_JOB_AREA_SUCCESS: {
    type: 'GET_JOB_AREA_SUCCESS',
    value: 'jobAreaList',
  },
  GET_JOB_AREA_FAILURE: {
    type: 'GET_JOB_AREA_FAILURE',
    value: 'jobAreaList',
  },

  UPDATE_JOB_AREA_REQUEST: {
    type: 'UPDATE_JOB_AREA_REQUEST',
    value: 'updateJobArea',
  },
  UPDATE_JOB_AREA_SUCCESS: {
    type: 'UPDATE_JOB_AREA_SUCCESS',
    value: 'updateJobArea',
  },
  UPDATE_JOB_AREA_FAILURE: {
    type: 'UPDATE_JOB_AREA_FAILURE',
    value: 'updateJobArea',
  },

  DELETE_JOB_AREA_REQUEST: {
    type: 'DELETE_JOB_AREA_REQUEST',
    value: 'deleteJobArea',
  },
  DELETE_JOB_AREA_SUCCESS: {
    type: 'DELETE_JOB_AREA_SUCCESS',
    value: 'deleteJobArea',
  },
  DELETE_JOB_AREA_FAILURE: {
    type: 'DELETE_JOB_AREA_FAILURE',
    value: 'deleteJobArea',
  },

  GET_JOB_AREA_BY_ID_REQUEST: {
    type: 'GET_JOB_AREA_BY_ID_REQUEST',
    value: 'getJobAreaByID',
  },
  GET_JOB_AREA_BY_ID_SUCCESS: {
    type: 'GET_JOB_AREA_BY_ID_SUCCESS',
    value: 'getJobAreaByID',
  },
  GET_JOB_AREA_BY_ID_FAILURE: {
    type: 'GET_JOB_AREA_BY_ID_FAILURE',
    value: 'getJobAreaByID',
  },

  SELECTED_JOB_AREA_REQUEST: {
    type: 'SELECTED_JOB_AREA_REQUEST',
    value: 'selectedJobArea',
  },
  SELECTED_JOB_AREA_SUCCESS: {
    type: 'SELECTED_JOB_AREA_SUCCESS',
    value: 'selectedJobArea',
  },
  SELECTED_JOB_AREA_FAILURE: {
    type: 'SELECTED_JOB_AREA_FAILURE',
    value: 'selectedJobArea',
  },
  FILTER_JOB_REQUEST: {
    type: 'FILTER_JOB_REQUEST',
    value: 'jobList',
  },
  FILTER_JOB_SUCCESS: {
    type: 'FILTER_JOB_SUCCESS',
    value: 'jobList',
  },
  FILTER_JOB_FAILURE: {
    type: 'FILTER_JOB_FAILURE',
    value: 'jobList',
  },

  SEARCH_JOB_REQUEST: {
    type: 'SEARCH_JOB_REQUEST',
    value: 'jobList',
  },
  SEARCH_JOB_SUCCESS: {
    type: 'SEARCH_JOB_SUCCESS',
    value: 'jobList',
  },
  SEARCH_JOB_FAILURE: {
    type: 'SEARCH_JOB_FAILURE',
    value: 'jobList',
  },

  JOB_SUMMARY_REQUEST: {
    type: 'JOB_SUMMARY_REQUEST',
    value: 'jobSummary',
  },
  JOB_SUMMARY_SUCCESS: {
    type: 'JOB_SUMMARY_SUCCESS',
    value: 'jobSummary',
  },
  JOB_SUMMARY_FAILURE: {
    type: 'JOB_SUMMARY_FAILURE',
    value: 'jobSummary',
  },

  CLEAN_JOB_REDUCER_REQUEST: {
    type: 'CLEAN_JOB_REDUCER_REQUEST',
    value: 'cleanJobReducerRequest',
  },
  CLEAN_JOB_REDUCER_SUCCESS: {
    type: 'CLEAN_JOB_REDUCER_SUCCESS',
    value: 'cleanJobReducerRequest',
  },
  CLEAN_JOB_REDUCER_FAILURE: {
    type: 'CLEAN_JOB_REDUCER_FAILURE',
    value: 'cleanJobReducerRequest',
  },
};

export const ADD_SUPPLY = {
  SAVE_ADD_SUPPLY_SUCCESS: {
    type: 'SAVE_ADD_SUPPLY_SUCCESS',
  },
  SAVE_ADD_SUPPLY_REQUEST: {
    type: 'SAVE_ADD_SUPPLY_REQUEST',
  },
  UPDATE_ADD_SUPPLY_SUCCESS: {
    type: 'UPDATE_ADD_SUPPLY_SUCCESS',
  },
  UPDATE_ADD_SUPPLY_REQUEST: {
    type: 'UPDATE_ADD_SUPPLY_REQUEST',
  },
  RESET_ADD_SUPPLY_SUCCESS: {
    type: 'RESET_ADD_SUPPLY_SUCCESS',
  },
  RESET_ADD_SUPPLY_REQUEST: {
    type: 'RESET_ADD_SUPPLY_REQUEST',
  },

  INCREMENT_COUNTER_SUCCESS: {
    type: 'INCREMENT_COUNTER_SUCCESS',
  },
  INCREMENT_COUNTER_REQUEST: {
    type: 'INCREMENT_COUNTER_REQUEST',
  },

  DECREMENT_COUNTER_SUCCESS: {
    type: 'DECREMENT_COUNTER_SUCCESS',
  },
  DECREMENT_COUNTER_REQUEST: {
    type: 'DECREMENT_COUNTER_REQUEST',
  },
};

export const PROFILE = {
  GET_PROFILE_REQUEST: {
    type: 'GET_PROFILE_REQUEST',
    value: 'profileDetails',
  },
  GET_PROFILE_SUCCESS: {
    type: 'GET_PROFILE_SUCCESS',
    value: 'profileDetails',
  },
  GET_PROFILE_FAILURE: {
    type: 'GET_PROFILE_FAILURE',
    value: 'profileDetails',
  },

  GET_HOME_REQUEST: {
    type: 'GET_HOME_REQUEST',
    value: 'homeDetails',
  },
  GET_HOME_SUCCESS: {
    type: 'GET_HOME_SUCCESS',
    value: 'homeDetails',
  },
  GET_HOME_FAILURE: {
    type: 'GET_HOME_FAILURE',
    value: 'homeDetails',
  },

  UPDATE_PROFILE_REQUEST: {
    type: 'UPDATE_PROFILE_REQUEST',
    value: 'profileDetails',
  },
  UPDATE_PROFILE_SUCCESS: {
    type: 'UPDATE_PROFILE_SUCCESS',
    value: 'profileDetails',
  },
  UPDATE_PROFILE_FAILURE: {
    type: 'UPDATE_PROFILE_FAILURE',
    value: 'profileDetails',
  },

  DELETE_ACCOUNT_REQUEST: {
    type: 'DELETE_ACCOUNT_REQUEST',
    value: 'deleteAccount',
  },
  DELETE_ACCOUNT_SUCCESS: {
    type: 'DELETE_ACCOUNT_SUCCESS',
    value: 'deleteAccount',
  },
  DELETE_ACCOUNT_FAILURE: {
    type: 'DELETE_ACCOUNT_FAILURE',
    value: 'deleteAccount',
  },
};

export const SETTINGS = {
  GET_SETTINGS_REQUEST: {
    type: 'GET_SETTINGS_REQUEST',
    value: 'settings',
  },
  GET_SETTINGS_SUCCESS: {
    type: 'GET_SETTINGS_SUCCESS',
    value: 'settings',
  },
  GET_SETTINGS_FAILURE: {
    type: 'GET_SETTINGS_FAILURE',
    value: 'settings',
  },

  SAVE_SETTINGS_REQUEST: {
    type: 'SAVE_SETTINGS_REQUEST',
    value: 'saveSettings',
  },
  SAVE_SETTINGS_SUCCESS: {
    type: 'SAVE_SETTINGS_SUCCESS',
    value: 'saveSettings',
  },
  SAVE_SETTINGS_FAILURE: {
    type: 'SAVE_SETTINGS_FAILURE',
    value: 'saveSettings',
  },

  MANAGE_FORM_REQUEST: {
    type: 'MANAGE_FORM_REQUEST',
    value: 'manageForm',
  },
  MANAGE_FORM_SUCCESS: {
    type: 'MANAGE_FORM_SUCCESS',
    value: 'manageForm',
  },
  MANAGE_FORM_FAILURE: {
    type: 'MANAGE_FORM_FAILURE',
    value: 'manageForm',
  },

  // GET_INVOICE_DETAILS_REQUEST: {
  //   type: 'GET_INVOICE_DETAILS_REQUEST',
  //   value: 'invoiceDetails',
  // },
  // GET_INVOICE_DETAILS_SUCCESS: {
  //   type: 'GET_INVOICE_DETAILS_SUCCESS',
  //   value: 'invoiceDetails',
  // },
  // GET_INVOICE_DETAILS_FAILURE: {
  //   type: 'GET_INVOICE_DETAILS_FAILURE',
  //   value: 'invoiceDetails',
  // },
};
