import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Button from '../../components/shared/Button';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import {deleteJobReq} from '../../redux/action/JobAction';
import Status from '../../utils/Status';
import {JOB, PROFILE} from '../../redux/store/TypeConstants';
import showErrorAlert from '../../utils/Toast';
import isInternetConnected from '../../utils/NetInfo';
import DeleteJobModal from '../../components/shared/DeleteJobModal';
export default function ViewJob(props) {
  const dispatch = useDispatch();
  const JobReducer = useSelector(state => state.JobReducer);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  {
    /* fun to delete job  */
  }
  const deleteJob = () => {
    isInternetConnected()
      .then(() => {
        dispatch(deleteJobReq(JobReducer?.singleJobDetailsReq?.jobId));
        setDeleteModalVisible(false);
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
    JOB.DELETE_JOB_REQUEST.type,
    () => {
      if (JobReducer?.deleteJobRes) {
        showErrorAlert('Job deleted successfully');

        setTimeout(() => {
          props.navigation.navigate('DrawerNavigator');
        }, 1200);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <View style={{width: '88%', alignSelf: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
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

          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 5,
              marginTop: 20,
              fontSize: normalize(15),
            }}>
            Contractor
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginTop: 10,
              marginLeft: normalize(16),
              fontSize: normalize(15),
            }}>
            {JobReducer?.singleJobDetailsReq?.contractorName || 'NA'}
          </Text>

          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 5,
              marginTop: 25,
              fontSize: normalize(15),
            }}>
            Location
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginTop: normalize(10),
              fontSize: normalize(15),
              marginLeft: normalize(16),
            }}>
            {JobReducer?.singleJobDetailsReq?.location || 'NA'}
          </Text>

          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 5,
              marginTop: 25,
              fontSize: normalize(15),
            }}>
            Lot Number/Subdivision
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginTop: 10,
              marginLeft: normalize(16),
              fontSize: normalize(15),
            }}>
            {JobReducer?.singleJobDetailsReq?.lotNumberOrSubDivision || 'NA'}
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 5,
              marginTop: 25,
              fontSize: normalize(15),
            }}>
            Date
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: normalize(16),
              marginTop: 10,
              fontSize: normalize(15),
            }}>
            {moment(JobReducer?.singleJobDetailsReq?.date).format('L')}
          </Text>

          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 5,
              marginTop: 25,
              fontSize: normalize(15),
            }}>
            Contact Information
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 16,
              marginTop: 10,
              fontSize: normalize(15),
            }}>
            Phone Number:{' '}
            {JobReducer?.singleJobDetailsReq?.contactInformation?.phoneNumber ||
              'NA'}
          </Text>
          <Text
            style={{
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Regular,
              marginLeft: 16,
              marginTop: 10,
              fontSize: normalize(15),
            }}>
            Email:{' '}
            {JobReducer?.singleJobDetailsReq?.contactInformation
              ?.emailAddress || 'NA'}
          </Text>

          <Button
            width={'65%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(15)}
            marginTop={normalize(50)}
            borderWidth={normalize(2.5)}
            borderColor={'#E2E8F3'}
            title={'Edit Job'}
            alignSelf={'center'}
            backgroundColor={Colors.primaryColor}
            onPress={() => {
              props.navigation.navigate('EditJob');
            }}
          />

          <Button
            width={'65%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(15)}
            marginTop={normalize(20)}
            marginBottom={normalize(15)}
            borderColor={Colors.white}
            textColor={Colors.white}
            title={'Delete Job'}
            alignSelf={'center'}
            backgroundColor={Colors.secondaryColor}
            onPress={() => {
              setDeleteModalVisible(!deleteModalVisible);
            }}
          />
          <DeleteJobModal
            modalVisible={deleteModalVisible}
            closeModal={() => setDeleteModalVisible(!deleteModalVisible)}
            deleteJob={() => deleteJob()}
          />
        </ScrollView>
      </View>
    </View>
  );
}
