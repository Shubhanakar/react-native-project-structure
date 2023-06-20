import * as yup from 'yup';
import {phoneRegExp} from '../constants';

const AddJobSchema = yup.object().shape({
  jobName: yup.string().required('Please, provide job name!'),
  email: yup.string().email(),
  contractorName: yup.string(),
  location: yup.string(),
  lotNumberOrSubDivision: yup.string(),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Phone number must be 10 characters')
    .max(10, 'Phone number must be 10 characters'),
  date: yup.string().required('Date is required'),
});

export default AddJobSchema;
