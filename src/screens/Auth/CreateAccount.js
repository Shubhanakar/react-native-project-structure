import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

import {Fonts, Icons, Colors} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';

import TextInput from '../../components/shared/TextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {getSignUp} from '../../redux/action/AuthAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/Loader';
import {AUTH} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';

import MaskInput, {Masks} from 'react-native-mask-input';
import {Formik} from 'formik';
import createAccountSchema from '../../schema/CreateAccountSchema';
import AgeConfirmationModal from '../../components/shared/AgeConfirmationModal';
import SelectCountryModal from '../../components/shared/SelectCountryModal';
import AddSheetSizeModal from '../../components/shared/AddSheetSizeModal';
import DeleteConfirmationModal from '../../components/shared/DeleteAccountModal';
import Button from '../../components/shared/Button';

export default function CreateAccount(props) {
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptAge, setAcceptAge] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCountryModalVisible, setisCountryModalVisible] = useState(false);

  const [isSheetModalVisible, setIsSheetModalVisible] = useState(false);

  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const formikRef = useRef();
  const initialValues = {
    fullName: '',
    emailAddress: '',
    companyName: '',
    phoneNumber: '',
    city: '',
    state: '',
    phoneCountryCode: '',
    dateOfBirth: '',
  };

  //function for hide date picker//
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //useEffect for check reducer and set the data to the state variable//
  useEffect(() => {
    formikRef?.current?.setFieldValue(
      'fullName',
      AuthReducer?.socialData?.name,
    );
    formikRef?.current?.setFieldValue('email', AuthReducer?.socialData?.email);
  }, [AuthReducer?.socialData?.email, AuthReducer?.socialData?.name]);

  //function for request API for create account//

  const createAccount = data => {
    if (!acceptPrivacy) {
      showErrorAlert('Please accept privacy policy');
    } else if (!acceptAge) {
      showErrorAlert('Please accept age confirmation');
    } else {
      let obj = {
        fullName: data.fullName,
        emailAddress: data.emailAddress,
        companyName: data.companyName || null,
        phoneCountryCode: data.phoneCountry || null,
        phoneNumber: data.phoneNumber || null,
        dateOfBirth: data.dateOfBirth || null,
        city: data.city || null,
        state: data.state || null,
        providerName: AuthReducer?.socialData?.provider,
        providerId: AuthReducer?.socialData?.id,
      };
      dispatch(getSignUp(obj));
    }
  };

  //Checking status of API response SUCCESS and FAILURE
  Status(
    AuthReducer.status,
    AUTH.SIGNUP_REQUEST.type,
    () => {
      if (AuthReducer?.signUpResponse) {
        showErrorAlert('Account created successfully');
        props.navigation.navigate('CreateAccount');
      }
    },
    () => {
      showErrorAlert(AuthReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader visible={AuthReducer.status === AUTH.SIGNUP_REQUEST.type} />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            flex: 1,
          }}>
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
                fontFamily: Fonts.DMSans_Medium,
                marginLeft: normalize(15),
              }}>
              Create Account
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={createAccountSchema}
            innerRef={formikRef}
            onSubmit={values => createAccount(values)}>
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              setFieldTouched,
              setFieldValue,
              handleSubmit,
            }) => (
              <View>
                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: Colors.white,
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Full Name *
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  marginTop={normalize(5)}
                  height={normalize(38)}
                  placeholder={'Jhon Doe'}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={() => setFieldTouched('fullName')}
                  borderColor={
                    touched.fullName && errors.fullName
                      ? '#FF0D10'
                      : Colors.borderColor
                  }
                />

                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: Colors.white,
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Company Name (optional)
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

                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: Colors.white,
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Email
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  editable={false}
                  marginTop={normalize(5)}
                  placeholder={'email@example.com'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.emailAddress}
                />

                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: Colors.white,
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Phone Number (optional)
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: normalize(10),
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      setisCountryModalVisible(!isCountryModalVisible)
                    }
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
                        color: '#CCCCCC',
                        fontFamily: Fonts.DMSans_Regular,
                        alignSelf: 'center',
                        textAlign: 'center',
                      }}>
                      {values.phoneCountryCode ? values.phoneCountryCode : '+1'}
                    </Text>
                  </TouchableOpacity>

                  <MaskInput
                    value={values.phoneNumber}
                    placeholder="(801) 555 - 1234"
                    placeholderTextColor={'#CCCCCC'}
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
                      handleChange('phoneNumber');
                    }}
                    mask={Masks.USA_PHONE}
                  />
                </View>

                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: Colors.white,
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Date Of Birth *
                </Text>

                <TouchableOpacity
                  onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
                  style={{
                    width: '90%',
                    height: normalize(38),
                    alignSelf: 'center',
                    borderWidth: 1,
                    marginTop: normalize(5),

                    borderColor:
                      touched.dateOfBirth && errors.dateOfBirth
                        ? '#FF0D10'
                        : Colors.borderColor,

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
                    {values.dateOfBirth ? values.dateOfBirth : 'mm/dd/yyyy'}
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

                <View
                  style={{
                    height: normalize(65),
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: normalize(20),
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: Fonts.DMSans_Regular,
                    }}>
                    Location (optional)
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(15),
                    }}>
                    <TextInput
                      backgroundColor={Colors.primaryColor}
                      borderRadius={0}
                      height={normalize(38)}
                      width={'45%'}
                      placeholder={'City'}
                      placeholderTextColor={'#CCCCCC'}
                      value={values.city}
                      onChangeText={handleChange('city')}
                      // onBlur={() => setFieldTouched('city')}
                    />

                    <TextInput
                      backgroundColor={Colors.primaryColor}
                      borderRadius={0}
                      width={'45%'}
                      placeholder={'State'}
                      placeholderTextColor={'#CCCCCC'}
                      value={values.state}
                      onChangeText={handleChange('state')}
                      // onBlur={() => setFieldTouched('state')}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(18),
                    marginBottom: normalize(15),
                    justifyContent: 'space-between',
                    marginLeft: normalize(18),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => setAcceptPrivacy(!acceptPrivacy)}
                      style={{marginTop: normalize(4.5)}}>
                      {!acceptPrivacy ? (
                        <Image
                          source={Icons.unchecked}
                          resizeMode={'contain'}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: '#CCCCCC',
                          }}
                        />
                      ) : (
                        <Image
                          source={Icons.checked}
                          resizeMode={'contain'}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: '#CCCCCC',
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Text
                        style={{
                          marginLeft: normalize(10),
                          color: '#CCCCCC',
                          fontFamily: Fonts.DMSans_Regular,
                          fontSize: normalize(12),
                        }}>
                        {'I agree with the '}
                      </Text>
                      <Text
                        style={{
                          color: '#CCCCCC',
                          fontFamily: Fonts.DMSans_Bold,
                          fontSize: normalize(12),
                        }}>
                        {'Terms and Conditions '}
                      </Text>
                      <Text
                        style={{
                          color: '#CCCCCC',
                          fontFamily: Fonts.DMSans_Regular,
                          fontSize: normalize(12),
                        }}>
                        {'and '}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      marginLeft: normalize(45),
                      color: '#CCCCCC',
                      fontFamily: Fonts.DMSans_Bold,
                      fontSize: normalize(12),
                      marginTop: -10,
                    }}>
                    {'Privacy Policy'}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: normalize(10),
                      alignSelf: 'center',
                      marginTop: -10,
                    }}>
                    <Image
                      source={Icons.info}
                      resizeMode="contain"
                      style={{height: normalize(20), width: normalize(20)}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: normalize(18)}}>
                  <TouchableOpacity
                    onPress={() => setAcceptAge(!acceptAge)}
                    style={{marginTop: normalize(4.5)}}>
                    {!acceptAge ? (
                      <Image
                        source={Icons.unchecked}
                        resizeMode={'contain'}
                        style={{
                          height: 20,
                          width: 20,
                          tintColor: '#CCCCCC',
                        }}
                      />
                    ) : (
                      <Image
                        source={Icons.checked}
                        resizeMode={'contain'}
                        style={{
                          height: 20,
                          width: 20,
                          tintColor: '#CCCCCC',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text
                      style={{
                        marginLeft: normalize(10),
                        color: '#CCCCCC',
                        fontFamily: Fonts.DMSans_Regular,
                        fontSize: normalize(12),
                      }}>
                      I affirm that I am 18 years of age or older
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                      style={{
                        marginLeft: normalize(10),
                        alignSelf: 'center',
                        marginTop: normalize(-5),
                      }}>
                      <Image
                        source={Icons.info}
                        resizeMode="contain"
                        style={{height: normalize(20), width: normalize(20)}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Button
                  width={'70%'}
                  height={normalize(42)}
                  borderRadius={normalize(22)}
                  fontSize={normalize(14)}
                  marginTop={normalize(25)}
                  marginBottom={normalize(15)}
                  borderColor={Colors.white}
                  textColor={Colors.white}
                  title={'Create Account'}
                  alignSelf={'center'}
                  backgroundColor={Colors.secondaryColor}
                  onPress={handleSubmit}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  timePickerModeAndroid={'clock'}
                  mode="date"
                  onConfirm={date => {
                    setFieldValue('dateOfBirth', moment(date).format('L'));
                    hideDatePicker();
                  }}
                  onCancel={hideDatePicker}
                  minimumDate={new Date(1900, 0, 1)}
                  maximumDate={new Date()}
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
                <AgeConfirmationModal
                  modalVisible={modalVisible}
                  closeModal={() => setModalVisible(!modalVisible)}
                />
              </View>
            )}
          </Formik>
          <AddSheetSizeModal
            modalVisible={isSheetModalVisible}
            closeModal={() => setIsSheetModalVisible(!isSheetModalVisible)}
            createSheetSize={data => console.log(data)}
          />
          <DeleteConfirmationModal
            modalVisible={isSheetModalVisible}
            closeModal={() => setIsSheetModalVisible(!isSheetModalVisible)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
