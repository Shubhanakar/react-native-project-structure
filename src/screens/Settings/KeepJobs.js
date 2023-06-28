import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {keepJobReq} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import {getProfile} from '../../redux/action/ProfileAction';
export default function KeepJobs(props) {
  const [days, set30Days] = useState(false);
  const [year, setYear] = useState(false);
  const [forever, setForever] = useState(false);

  const dispatch = useDispatch();
  const JobReducer = useSelector(state => state.JobReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  //useEffect fetching data from reducer//
  useEffect(() => {
    if (ProfileReducer?.profileDetails?.userSettings?.jobLifespan === 365) {
      setYear(true);
      setForever(false);
      set30Days(false);
    } else if (
      ProfileReducer?.profileDetails?.userSettings?.jobLifespan === 0
    ) {
      setForever(true);
      setYear(false);
      set30Days(false);
    } else if (ProfileReducer?.profileDetails?.userSettings == null) {
      set30Days(false);
      setYear(false);
      setForever(false);
    } else {
      set30Days(true);
      setYear(false);
      setForever(false);
    }
  }, [ProfileReducer?.profileDetails?.userSettings]);

  //Checking status of API response SUCCESS and FAILURE//
  Status(
    JobReducer.status,
    JOB.KEEP_JOB_REQUEST.type,
    () => {
      if (JobReducer?.keepJobs) {
        dispatch(getProfile());
        showErrorAlert(JobReducer?.keepJobs?.message);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  //fun for call the API to save the data//
  const saveJobSettings = type => {
    dispatch(keepJobReq({jobLifespan: type}));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader visible={JobReducer.status === JOB.KEEP_JOB_REQUEST.type} />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />

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
          Keep Jobs
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            height: normalize(135),
            width: normalize(290),
            backgroundColor: '#6E7073',
            alignSelf: 'center',
            marginTop: normalize(25),
            borderRadius: normalize(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              set30Days(true);
              setYear(false);
              setForever(false);
              saveJobSettings(30);
            }}
            style={{
              flexDirection: 'row',
              height: normalize(45),
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              borderColor: '#F3F3F3',
              borderBottomWidth: normalize(1),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                alignSelf: 'center',
                color: '#F3F3F3',
                marginLeft: normalize(25),
              }}>
              30 days
            </Text>
            {days && (
              <Image
                source={Icons.tick}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  alignSelf: 'center',
                  marginRight: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              set30Days(false);
              setYear(true);
              setForever(false);
              saveJobSettings(365);
            }}
            style={{
              flexDirection: 'row',
              height: normalize(45),
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              borderColor: '#F3F3F3',
              borderBottomWidth: normalize(1),
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                alignSelf: 'center',
                color: '#F3F3F3',
                marginLeft: normalize(25),
              }}>
              1 year
            </Text>
            {year && (
              <Image
                source={Icons.tick}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  alignSelf: 'center',
                  marginRight: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              set30Days(false);
              setYear(false);
              setForever(true);
              saveJobSettings(0);
            }}
            style={{
              flexDirection: 'row',
              height: normalize(45),
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              borderColor: '#F3F3F3',
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                alignSelf: 'center',
                color: '#F3F3F3',
                marginLeft: normalize(10),
              }}>
              Forever
            </Text>
            {forever && (
              <Image
                source={Icons.tick}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  alignSelf: 'center',
                  marginRight: normalize(-5),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
