import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {Fonts, Icons, Colors} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import Button from '../../components/shared/Button';
import TextInput from '../../components/shared/TextInput';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import Loader from '../../utils/Loader';
import {PROFILE} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import isInternetConnected from '../../utils/NetInfo';
import {updateProfile, getProfile} from '../../redux/action/ProfileAction';
import moment from 'moment';
import MaskInput, {Masks} from 'react-native-mask-input';
import {Formik} from 'formik';
import EditProfileSchema from '../../schema/EditProfileSchema';
import SelectCountryModal from '../../components/shared/SelectCountryModal';
import DeleteConfirmationModal from '../../components/shared/DeleteAccountModal';
export default function EditProfile(props) {
  const [unmasked, setUnmasked] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const formikRef = useRef();

  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const initialValues = {
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    city: '',
    state: '',
    countryCode: '',
    dateOfBirth: '',
  };

  {
    /* useEffect for getting data from reducer and set data */
  }

  useEffect(() => {
    const {setFieldValue} = formikRef.current;

    setFieldValue('fullName', ProfileReducer.profileDetails.fullname);
    setFieldValue('email', ProfileReducer.profileDetails.emailAddress);
    setFieldValue('companyName', ProfileReducer.profileDetails.companyName);
    setFieldValue('phoneNumber', ProfileReducer.profileDetails.phoneNumber);
    setFieldValue('city', ProfileReducer.profileDetails.city);
    setFieldValue('state', ProfileReducer.profileDetails.state);
    setFieldValue('countryCode', ProfileReducer.profileDetails.countryCode);
    setFieldValue('dateOfBirth', ProfileReducer.profileDetails.dateOfBirth);
  }, [ProfileReducer?.profileDetails]);

  {
    /*fun to close the date picker*/
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  {
    /* fun for update user data */
  }

  const updateUserData = values => {
    isInternetConnected()
      .then(() => {
        let obj = {};

        if (!fullName) {
          showErrorAlert('Please enter a full name');
        } else if (!dateOfBirth) {
          showErrorAlert('Please enter a date of birth');
        } else if (
          dateOfBirth &&
          !moment(dateOfBirth).isBefore(moment().subtract(18, 'years'))
        ) {
          showErrorAlert('Age must be 18 years old');
        } else if (unmasked !== '' && unmasked.trim().length < 10) {
          showErrorAlert('Please enter valid phone number');
        } else if (phoneNumber && !countryCode) {
          showErrorAlert('Please select country code');
        } else {
          obj.fullName = fullName;
          obj.companyName = companyName ? companyName : null;
          obj.phoneCountryCode =
            countryCode && phoneNumber ? countryCode : null;
          obj.phoneNumber = countryCode && phoneNumber ? phoneNumber : null;
          obj.dateOfBirth = dateOfBirth;
          obj.city = city ? city : null;
          obj.state = state ? state : null;

          dispatch(updateProfile(obj));
        }
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  };

  {
    /* Checking status of API response SUCCESS and FAILURE */
  }
  Status(
    ProfileReducer.status,
    PROFILE.UPDATE_PROFILE_REQUEST.type,
    () => {
      if (ProfileReducer?.profileDetails) {
        dispatch(getProfile());
        props.navigation.goBack();
      }
    },
    () => {
      showErrorAlert(ProfileReducer?.error?.response?.data?.message);
    },
  );

  Status(
    ProfileReducer.status,
    PROFILE.DELETE_ACCOUNT_REQUEST.type,
    () => {
      showErrorAlert('Account deleted successfully');
    },
    () => {
      showErrorAlert(ProfileReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={ProfileReducer.status === PROFILE.UPDATE_PROFILE_REQUEST.type}
      />
      <Loader
        visible={ProfileReducer.status === PROFILE.DELETE_ACCOUNT_REQUEST.type}
      />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: normalize(25),
          }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={Icons.back_arrow}
              resizeMode="contain"
              style={{
                height: normalize(20),
                width: normalize(20),
                tintColor: Colors.white,
                marginLeft: normalize(15),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: normalize(25),
              color: Colors.white,
              fontFamily: Fonts.DMSans_Bold,
              marginLeft: normalize(15),
            }}>
            Edit Profile
          </Text>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={EditProfileSchema}
          innerRef={formikRef}
          onSubmit={values => updateUserData(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => (
            <>
              <View>
                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: '#F0F0F0',
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Full Name
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  marginTop={normalize(5)}
                  height={normalize(38)}
                  placeholder={'Full Name'}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={() => setFieldTouched('fullName')}
                />
              </View>

              <View>
                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: '#F0F0F0',
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Company Name
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  marginTop={normalize(5)}
                  placeholder={'Company Name'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.companyName}
                  onChangeText={handleChange('companyName')}
                  onBlur={() => setFieldTouched('companyName')}
                />
              </View>

              <View>
                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: '#F0F0F0',
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Email
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  marginTop={normalize(5)}
                  placeholder={'email@example.com'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.email}
                  editable={false}
                  selectTextOnFocus={false}
                  onChangeText={data => handleChange('email')}
                  onBlur={setFieldTouched('email')}
                />
              </View>

              <Text
                style={{
                  marginTop: normalize(20),
                  marginLeft: normalize(16),
                  color: Colors.white,
                  fontFamily: Fonts.DMSans_Regular,
                }}>
                Phone Number
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: normalize(10),
                }}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(!isModalVisible)}
                  style={{
                    width: normalize(60),
                    height: normalize(45),
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#CCCCCC',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: Fonts.DMSans_Regular,
                      alignSelf: 'center',
                      textAlign: 'center',
                    }}>
                    {values.countryCode ? values.countryCode : '+1'}
                  </Text>
                </TouchableOpacity>
                <MaskInput
                  value={values.phoneNumber}
                  cursorColor={Colors.white}
                  placeholder="(801) 555 - 1234"
                  placeholderTextColor={'#CCCCCC'}
                  maxLength={15}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderColor: '#CCCCCC',
                    paddingLeft: normalize(15),
                    width: '65%',
                    color: Colors.white,
                    fontSize: normalize(13),
                    marginLeft: 15,
                  }}
                  onChangeText={(masked, unmasked) => {
                    setPhoneNumber(masked);
                    setUnmasked(unmasked);
                    handleChange('phoneNumber');
                    console.log(masked); // (99) 99999-9999
                    console.log(unmasked); // 99999999999
                  }}
                  mask={Masks.USA_PHONE}
                />
              </View>
              <Text
                style={{
                  marginTop: normalize(20),
                  marginLeft: normalize(16),
                  color: '#F0F0F0',
                  fontFamily: Fonts.DMSans_Regular,
                }}>
                Date Of Birth
              </Text>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                style={{
                  width: '90%',
                  height: normalize(38),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  marginTop: normalize(5),
                  borderColor: '#CCCCCC',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    marginLeft: normalize(10),
                    color: '#CCCCCC',
                    fontFamily: Fonts.DMSans_Regular,
                    alignSelf: 'center',
                  }}>
                  {values.dateOfBirth
                    ? moment(values.dateOfBirth).format('L')
                    : 'mm/dd/yyyy'}
                </Text>
                <Image
                  source={Icons.calendar}
                  resizeMode="contain"
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    alignSelf: 'center',
                    marginRight: normalize(10),
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#F0F0F0',
                  fontFamily: Fonts.DMSans_Regular,
                  marginTop: normalize(20),
                  marginLeft: 20,
                }}>
                Location
              </Text>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  marginTop: normalize(10),
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  width={'45%'}
                  height={normalize(38)}
                  placeholder={'City'}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={setFieldTouched('city')}
                />

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  width={'45%'}
                  placeholder={'State'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={state}
                  onChangeText={data => setState(data)}
                />
              </View>

              <Button
                width={'70%'}
                height={normalize(42)}
                borderRadius={normalize(22)}
                fontSize={normalize(14)}
                marginTop={normalize(40)}
                marginBottom={normalize(15)}
                borderColor={Colors.white}
                textColor={Colors.white}
                title={'Save'}
                alignSelf={'center'}
                backgroundColor={Colors.secondaryColor}
                onPress={handleSubmit}
              />

              <Button
                width={'70%'}
                height={normalize(42)}
                borderRadius={normalize(22)}
                fontSize={normalize(14)}
                marginTop={normalize(15)}
                marginBottom={normalize(15)}
                borderWidth={normalize(2)}
                borderColor={'#E2E8F3'}
                title={'Delete Account'}
                alignSelf={'center'}
                backgroundColor={Colors.primaryColor}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                timePickerModeAndroid={'clock'}
                mode="date"
                onConfirm={date =>
                  setFieldValue('dateOfBirth', moment(date).format('L'))
                }
                onCancel={hideDatePicker}
                minimumDate={new Date(1900, 0, 1)}
                maximumDate={new Date(Date.now() - 86400000)}
              />
              <SelectCountryModal
                modalVisible={isCountryModalVisible}
                closeModal={() =>
                  setisCountryModalVisible(!isCountryModalVisible)
                }
                selectedData={data =>
                  formikRef?.current?.setFieldValue('phoneCountryCode', data)
                }
              />
            </>
          )}
          <DeleteConfirmationModal
            modalVisible={modalVisible}
            closeModal={() => setModalVisible(false)}
          />
        </Formik>
      </ScrollView>
    </View>
  );
}
