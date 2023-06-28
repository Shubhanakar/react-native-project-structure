import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';

import {Fonts, Colors} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import Button from '../../components/shared/Button';
import AppHeader from '../../components/shared/AppHeader';
import {useSelector} from 'react-redux';
import moment from 'moment';
export default function Profile(props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [stateLocation, setState] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const ProfileReducer = useSelector(state => state.ProfileReducer); // collecting user profile data from ProfileReducer

  //useEffect use for set profile data to the state variable//

  useEffect(() => {
    if (ProfileReducer?.profileDetails) {
      setFullName(ProfileReducer.profileDetails.fullName);
      setEmail(ProfileReducer.profileDetails.emailAddress);
      setCompanyName(ProfileReducer.profileDetails.companyName);
      setPhoneNumber(ProfileReducer.profileDetails.phoneNumber);
      setDateOfBirth(ProfileReducer.profileDetails.dateOfBirth);
      setState(ProfileReducer.profileDetails.stateLocation);
      setCity(ProfileReducer.profileDetails.city);
      setCountryCode(ProfileReducer.profileDetails.phoneCountryCode);
    }
  }, [ProfileReducer?.profileDetails]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />

      <AppHeader title={'My Profile'} marginTop={normalize(20)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: '90%',
          }}>
          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Full Name
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {fullName}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Company Name
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {companyName ? companyName : 'NA'}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Email
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {email}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Phone Number
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {countryCode && phoneNumber
                  ? `${countryCode} ${phoneNumber}`
                  : 'NA'}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Date Of Birth
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {moment(dateOfBirth).format('L')}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                marginTop: normalize(20),
                marginLeft: normalize(16),
                color: '#F0F0F0',
                fontFamily: Fonts.DMSans_Regular,
                fontSize: normalize(13),
              }}>
              Location
            </Text>

            <View
              style={{
                width: '90%',
                height: normalize(40),
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#AEAEAE',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: '#CCCCCC',
                  fontFamily: Fonts.DMSans_Regular,
                  paddingLeft: 12,
                }}>
                {city ? city : 'NA'}
                {', '}
                {stateLocation ? stateLocation : 'NA'}
              </Text>
            </View>
          </View>
          <Button
            width={'70%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(14)}
            marginTop={normalize(45)}
            marginBottom={normalize(15)}
            borderColor={Colors.white}
            textColor={Colors.white}
            title={'Edit Profile'}
            alignSelf={'center'}
            backgroundColor={Colors.secondaryColor}
            onPress={() => {
              props.navigation.navigate('EditProfile');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
