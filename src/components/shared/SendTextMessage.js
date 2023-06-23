import SendSMS from 'react-native-sms';
import jsonToPlainText from '../../utils/jsonToPlainText';

export function SendTextMessage(data) {
  SendSMS.send(
    {
      body: jsonToPlainText(data),
      recipients: [''],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    },
    (completed, cancelled, error) => {
      console.log(
        'SMS Callback: completed: ' +
          completed +
          ' cancelled: ' +
          cancelled +
          'error: ' +
          error,
      );
    },
  );
}
