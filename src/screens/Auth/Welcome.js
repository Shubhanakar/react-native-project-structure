import React from 'react';
import {Text, View} from 'react-native';
import Button from '../../components/shared/Button';
import normalize from '../../utils/Dimen';
import {Fonts, Colors} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';

export default function Welcome(props) {
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
            fontSize: normalize(40),
            color: Colors.white,
            textAlign: 'center',
            fontFamily: Fonts.DMSans_Bold,
          }}>
          Welcome
        </Text>

        <View style={{marginTop: normalize(35)}}>
          <Button
            width={'60%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(14)}
            marginTop={normalize(50)}
            marginBottom={normalize(15)}
            title={'Log In'}
            alignSelf={'center'}
            backgroundColor={Colors.secondaryColor}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />

          <Button
            width={'60%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(14)}
            marginTop={normalize(20)}
            marginBottom={normalize(15)}
            borderWidth={normalize(2)}
            borderColor={'#E2E8F3'}
            title={'Sign Up'}
            alignSelf={'center'}
            backgroundColor={Colors.primaryColor}
            onPress={() => {
              props.navigation.navigate('Signup');
            }}
          />
        </View>
      </View>
    </View>
  );
}
