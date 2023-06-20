import * as yup from 'yup';
import {phoneRegExp} from '../constants/index';

const createAccountSchema = yup.object().shape({
  fullName: yup.string().required('Please, provide your name!'),
  emailAddress: yup
    .string()
    .email()
    .required('Please, provide your email address'),
  companyName: yup.string(),
  city: yup.string(),
  state: yup.string(),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Phone number must be 10 characters')
    .max(10, 'Phone number must be 10 characters'),
  phoneCountryCode: yup.string().when('phoneNumber', {
    is: phoneNumber => phoneNumber && phoneNumber.length > 0,
    then: yup
      .string()
      .matches(/^\+[1-9]\d{1,3}$/, 'Please enter a valid country code')
      .required('Country code is required'),
  }),
  dateOfBirth: yup.string().required('Date of birth is required'),
});

export default createAccountSchema;
