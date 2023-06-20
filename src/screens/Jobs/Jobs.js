import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import showErrorAlert from '../../utils/Toast';
import isInternetConnected from '../../utils/NetInfo';
import Loader from '../../utils/Loader';
import Status from '../../utils/Status';
import {Fonts, Colors, Icons} from '../../theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/shared/AppHeader';
import JobCardComponent from '../../components/featured/JobCardComponent';
import {
  getJobList,
  deleteJobReq,
  getSingleJobDetails,
  filterJobs,
  searchJobs,
  getSheetType,
  getJobAreaList,
} from '../../redux/action/JobAction';
import Modal from 'react-native-modal';
import {getProfile} from '../../redux/action/ProfileAction';
import {JOB, PROFILE} from '../../redux/store/TypeConstants';
import DeleteJobModal from '../../components/shared/DeleteJobModal';

export default function Jobs(props) {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [lastEdited, setLastEdited] = useState(false);
  const [jobDate, setJobDate] = useState(false);
  const [aToz, setAtoZ] = useState(false);
  const [zToa, setZtoA] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [isSearch, setIsSearch] = useState(false);

  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const JobReducer = useSelector(state => state.JobReducer);

  {
    /* useEffect API call */
  }
  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getProfile()); // fetch profile details
        dispatch(getJobList()); // fetch job list
        dispatch(getSheetType()); // fetch sheet type
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  }, []);

  {
    /* fun to store delete job data */
  }
  const deleteJob = data => {
    setDeleteModalVisible(!deleteModalVisible);
    setJobDetails(data);
  };
  {
    /* fun to delete job */
  }
  const deleteJobData = () => {
    dispatch(deleteJobReq(jobDetails?.jobId)); //  API call to delete job req
    setDeleteModalVisible(false);
  };

  // API call to filter jo list in chronological order
  const chronologicalOrder = order => {
    setJobDate(false), setLastEdited(!lastEdited);
    isInternetConnected()
      .then(() => {
        dispatch(filterJobs({order: order, search}));
        setModalVisible(false);
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  };
  // API call to filter jo list in alphabetical order
  const alphabeticalOrder = order => {
    setZtoA(false), setAtoZ(!aToz);
    isInternetConnected()
      .then(() => {
        dispatch(filterJobs({order: order, search}));
        setModalVisible(false);
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  };
  // open filter modal
  function openModal() {
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
              height: normalize(230),
              width: '85%',
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
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: normalize(16),
                color: Colors.black,
                fontFamily: Fonts.DMSans_Bold,
                marginLeft: normalize(15),
                alignSelf: 'center',
              }}>
              Sort By
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                color: Colors.black,
                fontFamily: Fonts.DMSans_Regular,
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: normalize(15),
              }}>
              {'Chronological'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  chronologicalOrder('LastEdited');
                }}
                style={{
                  height: normalize(35),
                  width: normalize(100),
                  backgroundColor: lastEdited
                    ? Colors.secondaryColor
                    : Colors.white,
                  borderRadius: normalize(50),
                  justifyContent: 'center',

                  alignItems: 'center',
                  marginLeft: normalize(15),
                  marginTop: normalize(15),
                  justifyContent: 'center',
                  borderColor: '#656565',
                  borderWidth: lastEdited ? 0 : 1.5,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.DMSans_Bold,
                    color: lastEdited ? Colors.white : '#656565',
                    fontSize: normalize(12),
                  }}>
                  Last Edited
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  chronologicalOrder('JobDate');
                }}
                style={{
                  height: normalize(35),
                  width: normalize(100),
                  backgroundColor: jobDate
                    ? Colors.secondaryColor
                    : Colors.white,
                  borderRadius: normalize(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: normalize(15),
                  marginTop: normalize(15),
                  justifyContent: 'center',
                  borderColor: '#656565',
                  borderWidth: jobDate ? 0 : 1.5,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.DMSans_Bold,
                    color: jobDate ? Colors.white : '#656565',
                    fontSize: normalize(12),
                  }}>
                  Job Date
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: normalize(12),
                color: Colors.black,
                fontFamily: Fonts.DMSans_Regular,
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: normalize(15),
              }}>
              {'Alphabetically'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  alphabeticalOrder('NameAsc');
                }}
                style={{
                  height: normalize(35),
                  width: normalize(100),
                  backgroundColor: aToz ? Colors.secondaryColor : Colors.white,
                  borderRadius: normalize(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: normalize(15),
                  marginTop: normalize(15),
                  justifyContent: 'center',
                  borderColor: '#656565',
                  borderWidth: aToz ? 0 : 1.5,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.DMSans_Bold,
                    color: aToz ? Colors.white : '#656565',
                    fontSize: normalize(12),
                  }}>
                  A-Z
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  alphabeticalOrder('NameDsc');
                }}
                style={{
                  height: normalize(35),
                  width: normalize(100),
                  backgroundColor: zToa ? Colors.secondaryColor : Colors.white,
                  borderRadius: normalize(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: normalize(15),
                  marginTop: normalize(15),
                  justifyContent: 'center',
                  borderColor: '#656565',
                  borderWidth: zToa ? 0 : 1.5,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.DMSans_Bold,
                    color: zToa ? Colors.white : '#656565',
                    fontSize: normalize(12),
                  }}>
                  Z-A
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
  // function for go to job details page
  const goToJobDetail = data => {
    dispatch(getSingleJobDetails(data.jobId));
    dispatch(getJobAreaList(data.jobId));
  };
  // function for search job
  const searchJob = data => {
    setSearch(data);
    if (data != '') {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
    isInternetConnected()
      .then(() => {
        dispatch(searchJobs(data));
      })
      .catch(err => {
        showErrorAlert('Please check your internet connection');
      });
  };
  // function for remove search data
  const removeSearchData = () => {
    setIsSearch(false);
    setSearch('');
    dispatch(getJobList());
  };

  // Checking status of API request
  Status(
    JobReducer.status,
    JOB.DELETE_JOB_REQUEST.type,
    () => {
      if (JobReducer?.deleteJobRes) {
        showErrorAlert(JobReducer?.deleteJobRes?.message);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.GET_JOB_AREA_REQUEST.type,
    () => {
      props.navigation.navigate('AddJobArea');
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.FILTER_JOB_REQUEST.type,
    () => {
      if (JobReducer?.jobList) {
        showErrorAlert('Filter applied successfully');
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.JOB_LIST_REQUEST.type,
    () => {
      if (JobReducer?.jobList) {
        showErrorAlert('Job list fetched successfully');
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );
  // function for pull to refresh
  const onRefreshList = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      isInternetConnected()
        .then(() => {
          dispatch(getProfile());
          dispatch(getJobList());
          setRefreshing(false);
        })
        .catch(err => {
          showErrorAlert('Please check your internet connection');
        });
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={
          ProfileReducer.status === PROFILE.GET_PROFILE_REQUEST.type ||
          JobReducer.status === JOB.JOB_LIST_REQUEST.type ||
          JobReducer.status === JOB.DELETE_JOB_REQUEST.type ||
          JobReducer.status === JOB.FILTER_JOB_REQUEST.type ||
          JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type
        }
      />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <AppHeader
        title={'Jobs'}
        isAddJob={true}
        onPress={() => {
          props.navigation.navigate('AddJob');
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(25),
          marginLeft: normalize(15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '75%',
            height: normalize(40),
            borderColor: '#CCCCCC',
            borderWidth: 1,
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#CCCCCC'}
            value={search}
            style={{marginLeft: 10, width: '80%', color: Colors.white}}
            onChangeText={data => {
              searchJob(data);
            }}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              removeSearchData();
            }}>
            {isSearch == false ? (
              <Image
                source={Icons.search}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 10,
                }}
              />
            ) : (
              <Image
                source={Icons.cross}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={Icons.filter}
            style={{
              height: normalize(20),
              width: normalize(20),
              marginRight: normalize(15),
              marginTop: normalize(5),
              marginLeft: normalize(25),
            }}
          />
        </TouchableOpacity>
      </View>

      {JobReducer?.jobList?.length > 0 ? (
        <ScrollView>
          <JobCardComponent
            data={JobReducer?.jobList}
            onPress={data => goToJobDetail(data)}
            onDelete={data => deleteJob(data)}
            refreshing={refreshing}
            onRefreshList={() => onRefreshList()}
          />
        </ScrollView>
      ) : JobReducer.status === JOB.JOB_LIST_REQUEST.type ? null : (
        <View
          style={{
            marginTop: normalize(250),
            width: '80%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#F0F0F0',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            {isSearch == true
              ? 'No data found'
              : 'You have not created any jobs yet. Tap the plus to get started.'}
          </Text>
        </View>
      )}
      <DeleteJobModal
        modalVisible={deleteModalVisible}
        closeModal={() => setDeleteModalVisible(!deleteModalVisible)}
        deleteJob={() => deleteJobData()}
      />
      {openModal()}
    </View>
  );
}
