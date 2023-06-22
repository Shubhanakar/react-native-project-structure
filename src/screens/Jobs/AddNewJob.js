import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  createJobAreaReq,
  getJobAreaList,
  getJobAreaById,
} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';

import TextInput from '../../components/shared/TextInput';
import Modal from 'react-native-modal';
export default function AddNewJob(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [jobAreaName, setJobAreaName] = useState(null);

  const dispatch = useDispatch();
  const JobReducer = useSelector(state => state.JobReducer);

  useEffect(() => {
    dispatch(getJobAreaById(JobReducer?.selectedJobArea?.jobAreaId));
  }, [JobReducer?.selectedJobArea?.jobAreaId, dispatch]);

  //fun for create job area //
  const createJob = () => {
    let obj = {
      jobId: JobReducer?.singleJobDetailsReq?.jobId,
      jobAreaName: jobAreaName,
    };

    if (!jobAreaName) {
      showErrorAlert('Please enter job area name');
    } else {
      setModalVisible(!modalVisible);
      dispatch(createJobAreaReq(obj));
      setJobAreaName('');
    }
  };

  //Checking status of API response SUCCESS and FAILURE//
  Status(
    JobReducer.status,
    JOB.CREATE_JOB_AREA_REQUEST.type,
    () => {
      if (JobReducer?.createJobArea) {
        showErrorAlert(JobReducer?.createJobArea?.message);
        dispatch(getJobAreaList(JobReducer?.singleJobDetailsReq?.jobId));
        props.navigation.goBack();
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data);
    },
  );
  //fun for open create job modal
  function openCreateJobModal() {
    return (
      <SafeAreaView>
        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={modalVisible}
          style={{}}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              alignSelf: 'center',
              height: normalize(220),
              width: '80%',
              backgroundColor: Colors.white,
              borderRadius: normalize(20),
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={Icons.cross}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginRight: normalize(15),
                  marginTop: normalize(10),
                  alignSelf: 'flex-end',
                  tintColor: '#1D1E49',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: normalize(16),
                color: Colors.black,
                fontFamily: Fonts.DMSans_Medium,
                marginLeft: normalize(15),
                alignSelf: 'center',
              }}>
              Name Your Area
            </Text>

            <TextInput
              borderRadius={0}
              marginTop={normalize(25)}
              height={normalize(38)}
              placeholder={'Job Area Name'}
              placeholderTextColor={'#454545'}
              value={jobAreaName}
              borderColor={'#454545'}
              borderWidth={1}
              inputTextColor={Colors.black}
              onChangeText={data => setJobAreaName(data)}
            />

            <TouchableOpacity
              onPress={() => {
                createJob();
              }}
              style={{
                height: normalize(38),
                width: normalize(170),
                backgroundColor: Colors.secondaryColor,
                borderRadius: normalize(50),
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                marginLeft: normalize(15),
                marginTop: normalize(35),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.DMSans_Bold,
                  color: Colors.white,
                  fontSize: normalize(16),
                }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={
          JobReducer.status === JOB.CREATE_JOB_AREA_REQUEST.type ||
          JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type
        }
      />
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
        <TouchableOpacity onPress={() => props.navigation.navigate('ViewJob')}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              width: normalize(140),
              fontSize: normalize(25),
              color: Colors.white,
              fontFamily: Fonts.DMSans_Bold,
              marginLeft: normalize(15),
            }}>
            {JobReducer?.singleJobDetailsReq?.jobName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('JobSummary')}
          style={{
            width: normalize(90),
            height: normalize(40),
            backgroundColor: Colors.white,
            borderRadius: normalize(10),
            justifyContent: 'center',
            marginLeft: normalize(25),
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.black,
            }}>
            {JobReducer?.singleJobDetailsReq?.squareFeet} sq ft
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: normalize(12),
          color: Colors.white,
          fontFamily: Fonts.DMSans_Regular,
          marginLeft: normalize(15),
        }}>
        {JobReducer?.singleJobDetailsReq?.location}
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
              dispatch(getJobAreaList(JobReducer?.singleJobDetailsReq?.jobId));
              dispatch(getJobAreaById(JobReducer?.selectedJobArea?.jobAreaId));
            }}
            style={{
              width: normalize(20),
              height: normalize(20),
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: normalize(10),
            }}>
            <Image
              source={Icons.arrow_prev}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
                tintColor: '#ACACAC',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              width: normalize(50),
              height: normalize(50),
              backgroundColor: '#E2E8F3',
              borderRadius: normalize(25),
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: '32%',
            }}>
            <Image
              source={Icons.plus}
              style={{height: 25, width: 25, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: normalize(14),
            fontFamily: Fonts.DMSans_Regular,
            marginTop: normalize(10),
            color: '#E2E8F3',
          }}>
          Add Job Area
        </Text>
      </View>
      {openCreateJobModal()}
    </View>
  );
}
