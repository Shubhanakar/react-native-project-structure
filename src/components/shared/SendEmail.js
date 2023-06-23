import email from 'react-native-email';
import jsonToPlainText from '../../utils/jsonToPlainText';

export function SendEmail(subject, data) {
  const to = [''];
  email(to, {
    subject: subject,
    body: jsonToPlainText(data),
    checkCanOpen: false,
  }).catch(console.error);
}
