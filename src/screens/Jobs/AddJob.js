import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import Button from '../../components/shared/Button';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import TextInput from '../../components/shared/TextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {createJob} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import MaskInput, {Masks} from 'react-native-mask-input';
import {Formik} from 'formik';
import AddJobSchema from '../../schema/AddJobSchema';

export default function AddJob(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const JobReducer = useSelector(state => state.JobReducer);

  const initialValues = {
    jobName: '',
    email: '',
    contractorName: '',
    phoneNumber: '',
    location: '',
    lotNumberOrSubDivision: '',
    date: '',
  };

  //fun for hide date picker//
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  //fun for API call for save job data//
  const addJob = data => {
    let contactInfo = {
      phoneNumber: data.phoneNumber || null,
      emailAddress: data.email || null,
    };

    let obj = {
      jobName: data.jobName,
      contractorName: data.contractorName || null,
      contactInfo: contactInfo,
      location: data.location || null,
      lotNumberOrSubDivision: data.lotNumberOrSubDivision || null,
      date: data.date,
    };

    dispatch(createJob(obj));
  };
  //Checking status of API response SUCCESS and FAILURE//
  Status(
    JobReducer.status,
    JOB.CREATE_JOB_REQUEST.type,
    () => {
      if (JobReducer?.createJob) {
        props.navigation.goBack();
        showErrorAlert(JobReducer?.createJob?.message);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader visible={JobReducer.status === JOB.CREATE_JOB_REQUEST.type} />
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
                fontFamily: Fonts.DMSans_Bold,
                marginLeft: normalize(15),
              }}>
              Create New Job
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={AddJobSchema}
            innerRef={formikRef}
            onSubmit={values => addJob(values)}>
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
              <>
                <View>
                  <Text
                    style={{
                      marginTop: normalize(20),
                      marginLeft: normalize(16),
                      color: '#F0F0F0',
                      fontFamily: Fonts.DMSans_Regular,
                    }}>
                    Job Name*
                  </Text>

                  <TextInput
                    backgroundColor={Colors.primaryColor}
                    borderRadius={0}
                    marginTop={normalize(5)}
                    placeholder={'Job Name'}
                    height={normalize(38)}
                    placeholderTextColor={'#CCCCCC'}
                    value={values.jobName}
                    onChangeText={handleChange('jobName')}
                    onBlur={() => setFieldTouched('jobName')}
                    borderColor={
                      touched.jobName && errors.jobName
                        ? '#FF0D10'
                        : Colors.borderColor
                    }
                    returnKeyType={'next'}
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
                    Contractor
                  </Text>

                  <TextInput
                    backgroundColor={Colors.primaryColor}
                    borderRadius={0}
                    marginTop={normalize(5)}
                    height={normalize(38)}
                    placeholder={'Contractor’s Name or Company'}
                    placeholderTextColor={'#CCCCCC'}
                    value={values.contractorName}
                    onChangeText={handleChange('contractorName')}
                    onBlur={() => setFieldTouched('contractorName')}
                    borderColor={'#CCCCCC'}
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
                    Location
                  </Text>

                  <TextInput
                    backgroundColor={Colors.primaryColor}
                    borderRadius={0}
                    marginTop={normalize(5)}
                    height={normalize(38)}
                    placeholder={'Job Location'}
                    placeholderTextColor={'#CCCCCC'}
                    value={values.location}
                    onChangeText={handleChange('location')}
                    onBlur={() => setFieldTouched('location')}
                    borderColor={'#CCCCCC'}
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
                    Lot Number/Subdivision
                  </Text>

                  <TextInput
                    backgroundColor={Colors.primaryColor}
                    borderRadius={0}
                    marginTop={normalize(5)}
                    height={normalize(38)}
                    placeholder={'Lot Number/Subdivision'}
                    placeholderTextColor={'#CCCCCC'}
                    value={values.lotNumberOrSubDivision}
                    onChangeText={handleChange('lotNumberOrSubDivision')}
                    borderColor={'#CCCCCC'}
                  />
                </View>

                <Text
                  style={{
                    marginTop: normalize(20),
                    marginLeft: normalize(16),
                    color: '#F0F0F0',
                    fontFamily: Fonts.DMSans_Regular,
                  }}>
                  Date*
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
                      touched.date && errors.date
                        ? '#FF0D10'
                        : Colors.textInputBorderColor,
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
                    {values.date ? values.date : 'mm/dd/yyyy'}
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

                <View>
                  <Text
                    style={{
                      marginTop: normalize(20),
                      marginLeft: normalize(16),
                      color: '#F0F0F0',
                      fontFamily: Fonts.DMSans_Regular,
                    }}>
                    Contact Information
                  </Text>

                  <MaskInput
                    value={values.phoneNumber}
                    placeholder="(801) 555 - 1234"
                    placeholderTextColor={'#CCCCCC'}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: '#CCCCCC',
                      paddingLeft: normalize(15),
                      width: '90%',
                      color: Colors.white,
                      fontSize: normalize(13),
                      alignSelf: 'center',
                      marginTop: 15,
                      height: normalize(38),
                    }}
                    onChangeText={handleChange('phoneNumber')}
                    mask={Masks.USA_PHONE}
                  />
                  <TextInput
                    backgroundColor={Colors.primaryColor}
                    borderRadius={0}
                    marginTop={normalize(15)}
                    placeholder={'email@example.com'}
                    placeholderTextColor={'#CCCCCC'}
                    height={normalize(38)}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    borderColor={'#CCCCCC'}
                  />
                </View>

                <Button
                  width={'70%'}
                  height={normalize(42)}
                  borderRadius={normalize(22)}
                  fontSize={normalize(15)}
                  marginTop={normalize(40)}
                  marginBottom={normalize(25)}
                  borderColor={Colors.white}
                  textColor={Colors.white}
                  title={'Create New Job'}
                  alignSelf={'center'}
                  backgroundColor={Colors.secondaryColor}
                  onPress={handleSubmit}
                />

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  timePickerModeAndroid={'clock'}
                  mode="date"
                  onConfirm={date =>
                    setFieldValue('date', moment(date).format('L'))
                  }
                  onCancel={hideDatePicker}
                  minimumDate={new Date(1900, 0, 1)}
                  maximumDate={new Date(Date.now() - 86400000)}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}
