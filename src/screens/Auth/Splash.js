import React from 'react';
import {View, Text} from 'react-native';
import {Colors, Fonts} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import normalize from '../../utils/Dimen';
export default function Splash(props) {
  return (
    <View style={{flex: 1}}>
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: normalize(32),
            color: Colors.white,
            textAlign: 'center',

            fontFamily: Fonts.DMSans_Bold,
          }}>
          Drywall Genie
        </Text>
      </View>
    </View>
  );
}
