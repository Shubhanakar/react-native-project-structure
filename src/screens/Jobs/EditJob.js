import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import Button from '../../components/shared/Button';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import TextInput from '../../components/shared/TextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import isInternetConnected from '../../utils/NetInfo';
import {updateJob, getSingleJobDetails} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import MaskInput, {Masks} from 'react-native-mask-input';
import {Formik} from 'formik';
import EditJobSchema from '../../schema/EditJobSchema';

export default function EditJob(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const JobReducer = useSelector(state => state.JobReducer);
  const dispatch = useDispatch();
  const formikRef = useRef();

  const initialValues = {
    jobname: '',
    email: '',
    contractorName: '',
    phoneNumber: '',
    location: '',
    countryCode: '',
    date: '',
    lotNumberOrSubDivision: '',
  };

  {
    /* fun for hide date picker */
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  {
    /* useEffect for getting the job data  */
  }

  useEffect(() => {
    setFieldValue('jobname', JobReducer.singleJobDetailsReq.jobname);
    setFieldValue(
      'emailAddress',
      JobReducer.singleJobDetailsReq.contactInformation.emailAddress,
    );
    setFieldValue(
      'phoneNumber',
      JobReducer.singleJobDetailsReq.contactInformation.phoneNumber,
    );
    setFieldValue(
      'contractorName',
      JobReducer.singleJobDetailsReq.contractorName,
    );
    setFieldValue('location', JobReducer.singleJobDetailsReq.location);
    setFieldValue(
      'lotNumberOrSubDivision',
      JobReducer.singleJobDetailsReq.lotNumberOrSubDivision,
    );
    setFieldValue(
      'countryCode',
      JobReducer.singleJobDetailsReq.contactInformation.phoneCountryCode,
    );
    setFieldValue('date', JobReducer.singleJobDetailsReq.date);
  }, [JobReducer?.singleJobDetailsReq]);

  const editJobDetails = data => {
    isInternetConnected()
      .then(() => {
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
          date: data.date || null,
        };

        dispatch(updateJob(obj));
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  };

  {
    /* Checking status of API response SUCCESS and FAILURE */
  }

  Status(
    JobReducer.status,
    JOB.EDIT_JOB_REQUEST.type,
    () => {
      if (JobReducer?.editJob) {
        dispatch(getSingleJobDetails(JobReducer?.singleJobDetailsReq?.jobId));
        props.navigation.goBack();
        showErrorAlert(JobReducer?.editJob?.message);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader visible={JobReducer.status === JOB.EDIT_JOB_REQUEST.type} />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: normalize(20),
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
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: normalize(25),
            color: Colors.white,
            fontFamily: Fonts.DMSans_Bold,
            marginLeft: normalize(15),
          }}>
          {JobReducer?.singleJobDetailsReq?.jobName}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={EditJobSchema}
          innerRef={formikRef}
          onSubmit={values => editJobDetails(values)}>
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
                  Job Name
                </Text>

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  marginTop={normalize(5)}
                  height={normalize(38)}
                  placeholder={'Job Name'}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.jobname}
                  onChangeText={handleChange('jobname')}
                  onBlur={() => setFieldTouched('jobname')}
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
                  placeholder={'Contractor’s Name or Company'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.contractorName}
                  onChangeText={handleChange('contractorName')}
                  onBlur={() => setFieldTouched('contractorName')}
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
                  placeholder={'Location'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.location}
                  onChangeText={handleChange('location')}
                  onBlur={() => setFieldTouched('location')}
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
                  onBlur={() => setFieldTouched('lotNumberOrSubDivision')}
                />
              </View>

              <Text
                style={{
                  marginTop: normalize(20),
                  marginLeft: normalize(16),
                  color: '#F0F0F0',
                  fontFamily: Fonts.DMSans_Regular,
                }}>
                Date
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

              <Text
                style={{
                  color: '#F0F0F0',
                  fontFamily: Fonts.DMSans_Regular,
                  marginTop: normalize(20),
                  marginLeft: 20,
                }}>
                Contact Information
              </Text>

              <View
                style={{
                  width: '90%',
                  marginTop: normalize(10),
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <MaskInput
                  value={values.phoneNumber}
                  placeholder="(801) 555 - 1234"
                  placeholderTextColor={'#CCCCCC'}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderColor: '#CCCCCC',
                    paddingLeft: normalize(15),
                    width: '100%',
                    color: Colors.white,
                    fontSize: normalize(13),
                    alignSelf: 'center',
                    marginTop: 15,
                    height: normalize(38),
                  }}
                  onChangeText={(masked, unmasked) => {
                    setPhoneNumber(masked); // you can use the unmasked value as well

                    handleChange('phoneNumber');
                    // assuming you typed "9" all the way:
                    console.log(masked); // (99) 99999-9999
                    console.log(unmasked); // 99999999999
                  }}
                  mask={Masks.USA_PHONE}
                />

                <TextInput
                  backgroundColor={Colors.primaryColor}
                  borderRadius={0}
                  width={'100%'}
                  placeholder={'email@example.com'}
                  height={normalize(38)}
                  placeholderTextColor={'#CCCCCC'}
                  value={values.email}
                  marginTop={normalize(20)}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
              </View>

              <Button
                width={'70%'}
                height={normalize(42)}
                borderRadius={normalize(22)}
                fontSize={normalize(15)}
                marginTop={normalize(40)}
                marginBottom={normalize(15)}
                borderColor={Colors.white}
                textColor={Colors.white}
                title={'Done'}
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
                minimumDate={new Date()}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
