import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  createJobAreaReq,
  getJobAreaList,
  saveSelectedJobAreaDetails,
  updateJobAreaReq,
  getSheetType,
  createSheet,
  createSupplier,
  getJobAreaById,
  getSingleJobDetails,
  getJobSummary,
} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import AddSupplyComponent from '../../components/featured/AddSupplyComponent';
import TextInputComponent from '../../components/shared/TextInput';
import Modal from 'react-native-modal';
import {
  resetSupplyData,
  saveSupplyData,
} from '../../redux/action/AddSupplyAction';
import RegularSheetList from '../../components/featured/RegularSheetList';
import FiftyFourInchSheetList from '../../components/featured/FiftyFourInchSheetList';
import OtherSheetList from '../../components/featured/OtherSheetList';
import AddSheetSizeModal from '../../components/shared/AddSheetSizeModal';
import AddSupplyModal from '../../components/shared/AddSupplyModal';
export default function AddJobArea(props) {
  const [notes, setNotes] = useState('');
  const [jobAreaName, setJobAreaName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [halfInch, setHalfInch] = useState(true);
  const [fiveEightInch, setFiveEightInch] = useState(false);
  const [editJobArea, isEditJobArea] = useState(false);
  const [supplyModalVisible, setSupplyModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [openAddSizeModal, setOpenAddSizeModal] = useState(false);
  const [dryWallSheets, setDryWallSheets] = useState([]);
  const [dryWall54InchSheets, setDryWall54InchSheets] = useState([]);
  const [dryWallOtherSheets, setDryWallOtherSheets] = useState([]);
  const [calculateTotalSqareFeet, setCalculateTotalSquareFeet] = useState(0);

  const dispatch = useDispatch();
  const AddSupplyReducer = useSelector(state => state.AddSupplyReducer);
  const JobReducer = useSelector(state => state.JobReducer);

  const handleAddComponent = () => {
    dispatch(
      saveSupplyData([
        {
          supplyId: '',
          title: '',
          quantity: 0,
        },
      ]),
    );
  };

  //useEffect to get sheet list ie. DryWallSheets,FiftyFourInchSheets,OtherSheets //
  useEffect(() => {
    const sheetArrays = [
      JobReducer?.sheetList?.sheets?.DryWallSheets,
      JobReducer?.sheetList?.sheets?.FiftyFourInchSheets,
      JobReducer?.sheetList?.sheets?.OtherSheets,
    ];
    const quantityArrays = sheetArrays.map(arr => {
      if (arr && arr.length > 0) {
        return arr.map(object => {
          return {...object, quantity: 0};
        });
      }
      return [];
    });

    const [regularSheets, fiftyFourInchSheets, otherSheets] = quantityArrays;

    setDryWallSheets(regularSheets);
    setDryWall54InchSheets(fiftyFourInchSheets);
    setDryWallOtherSheets(otherSheets);

    return () => {
      setDryWall54InchSheets([]);
      setDryWallOtherSheets([]);
      setDryWallSheets([]);
    };
  }, [JobReducer?.sheetList?.sheets]);

  // useEffect to get supplies list from JobReducer.getJobAreaByID reducer //

  useEffect(() => {
    dispatch(resetSupplyData());
    if (JobReducer?.getJobAreaByID?.supplies?.length > 0) {
      const updatedObj = JobReducer?.getJobAreaByID?.supplies?.map(item => {
        return {
          quantity: item.quantity,
          supplyId: item.supplyId,
          title: item.supplyTitle,
        };
      });

      dispatch(saveSupplyData(updatedObj));
    } else {
      dispatch(
        saveSupplyData([
          {
            supplyId: '',
            title: '',
            quantity: 0,
          },
        ]),
      );
    }
  }, [JobReducer?.getJobAreaByID?.supplies, dispatch]);

  // useEffect to check dependecy on edit and add job area.//
  useEffect(() => {
    if (editJobArea === true) {
      setJobAreaName(JobReducer?.selectedJobArea?.jobAreaName);
    } else {
      setJobAreaName('');
    }
  }, [JobReducer?.selectedJobArea?.jobAreaName, editJobArea]);

  // useEffect to fetch job area of the selected job //
  useEffect(() => {
    if (JobReducer?.selectedJobArea?.jobAreaId) {
      dispatch(getJobAreaById(JobReducer?.selectedJobArea?.jobAreaId));
    }
  }, [JobReducer?.selectedJobArea?.jobAreaId, dispatch]);

  //useEffect to fetch job area detalis of the selected area by job area id//
  useEffect(() => {
    let JobAreaDetails = JobReducer?.getJobAreaByID;

    setCalculateTotalSquareFeet(JobAreaDetails?.squareFeet);

    if (JobAreaDetails?.sheetThickness === '"1/2\'\'"') {
      setHalfInch(true);
      setFiveEightInch(false);
    } else if (JobAreaDetails?.sheetThickness === '"5/8\'\'"') {
      setHalfInch(false);
      setFiveEightInch(true);
    }

    let masterSheet = JobReducer?.sheetList?.sheets;
    let updatedSheet = JobAreaDetails?.sheets;

    let arrayWithDrywallShets = [];
    let arrayWith54InchShets = [];
    let arrayWithOtherShets = [];

    if (JobAreaDetails?.sheets?.length > 0) {
      arrayWithDrywallShets = updateArrayWithQuantity(
        masterSheet?.DryWallSheets,
        updatedSheet,
      );

      arrayWith54InchShets = updateArrayWithQuantity(
        masterSheet?.FiftyFourInchSheets,
        updatedSheet,
      );

      arrayWithOtherShets = updateArrayWithQuantity(
        masterSheet?.OtherSheets,
        updatedSheet,
      );

      if (arrayWithDrywallShets.length > 0) {
        setDryWallSheets(arrayWithDrywallShets);
      }

      if (arrayWith54InchShets.length > 0) {
        setDryWall54InchSheets(arrayWith54InchShets);
      }

      if (arrayWithOtherShets.length > 0) {
        setDryWallOtherSheets(arrayWithOtherShets);
      }
    } else {
      const sheetArrays = [
        JobReducer?.sheetList?.sheets?.DryWallSheets,
        JobReducer?.sheetList?.sheets?.FiftyFourInchSheets,
        JobReducer?.sheetList?.sheets?.OtherSheets,
      ];
      const quantityArrays = sheetArrays.map(arr => {
        if (arr && arr.length > 0) {
          return arr.map(object => {
            return {...object, quantity: 0};
          });
        }
        return [];
      });

      const [regularSheets, fiftyFourInchSheets, otherSheets] = quantityArrays;

      setDryWallSheets(regularSheets);
      setDryWall54InchSheets(fiftyFourInchSheets);
      setDryWallOtherSheets(otherSheets);
    }

    return () => {
      setDryWall54InchSheets([]);
      setDryWallOtherSheets([]);
      setDryWallSheets([]);
    };
  }, [JobReducer?.getJobAreaByID, JobReducer?.sheetList?.sheets]);

  //useEffect to check current selected index for screening job area//
  useEffect(() => {
    if (JobReducer?.jobAreaList && JobReducer?.jobAreaList?.length > 0) {
      dispatch(
        saveSelectedJobAreaDetails(JobReducer?.jobAreaList[selectedIndex]),
      );
    }
  }, [JobReducer?.jobAreaList, dispatch, selectedIndex]);

  //fun to take the master sheet list and update the master sheet with new array having quantity to making new array and render that array
  function updateArrayWithQuantity(originalArray, quantityArray) {
    const sheetsWithQuantity = originalArray.map(sheet => {
      const quantity =
        quantityArray.find(item => item.sheetId === sheet.sheetId)?.quantity ||
        0;
      return {
        ...sheet,
        quantity,
      };
    });
    return sheetsWithQuantity;
  }

  //fun to create job area//
  const createJobArea = () => {
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
  //fun to create job area//
  const updateJobArea = () => {
    let sheets = [
      ...dryWallSheets,
      ...dryWall54InchSheets,
      ...dryWallOtherSheets,
    ];

    let filteredSheets = sheets.filter(item => {
      return item.quantity !== 0;
    });

    let filteredSupply = AddSupplyReducer.filter(item => {
      return item.quantity !== 0 && item.supplyId !== '';
    }).map(item => {
      return {supplyId: item.supplyId, quantity: item.quantity};
    });

    let obj = {};

    obj.jobId = JobReducer?.singleJobDetailsReq?.jobId;
    obj.job_area_id = JobReducer?.selectedJobArea?.jobAreaId;
    obj.jobAreaName =
      jobAreaName !== ''
        ? jobAreaName
        : JobReducer?.selectedJobArea?.jobAreaName;
    obj.sheetThickness = halfInch === true ? "1/2''" : "5/8''";
    obj.jobNotes = notes ? notes : null;
    obj.sheets = filteredSheets ? filteredSheets : [];
    obj.supplies = filteredSupply ? filteredSupply : [];

    dispatch(updateJobAreaReq(obj));
    setModalVisible(false);
    setJobAreaName('');

    isEditJobArea(false);
    dispatch(resetSupplyData());
  };
  //fun to calculate the total sq ft of the 3 diffetent types of sheet//
  const calculateTotalSqFeet = () => {
    let totalsq = 0;
    dryWallSheets.map(item => {
      totalsq += parseFloat(item?.totalSqFeet || 0);
    });
    dryWall54InchSheets.map(item => {
      totalsq += parseFloat(item?.totalSqFeet || 0);
    });
    dryWallOtherSheets.map(item => {
      totalsq += parseFloat(item?.totalSqFeet || 0);
    });

    setCalculateTotalSquareFeet(totalsq);
  };

  //fun to increment and decrement quantity//
  const addDrywallSheets = (incrementData, itemIndex, actionType) => {
    let sheets = [];

    if (actionType === 'add') {
      let tempData = dryWallSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity + incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });

      tempData.map(item => {
        sheets.push(item);
      });

      setDryWallSheets(sheets);
    } else if (actionType === 'delete') {
      let tempData = dryWallSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity - incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });

      tempData.map(item => {
        sheets.push(item);
      });

      setDryWallSheets(sheets);
    }

    calculateTotalSqFeet();
  };

  const addDryWall54InchSheets = (incrementData, itemIndex, actionType) => {
    let sheets54Inch = [];

    if (actionType === 'add') {
      let tempData = dryWall54InchSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity + incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });

      tempData.map(item => {
        sheets54Inch.push(item);
      });

      setDryWall54InchSheets(sheets54Inch);
    } else if (actionType === 'delete') {
      let tempData = dryWall54InchSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity - incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });

      tempData.map(item => {
        sheets54Inch.push(item);
      });

      setDryWall54InchSheets(sheets54Inch);
    }
    calculateTotalSqFeet();
  };

  const addDryWallOtherSheets = (incrementData, itemIndex, actionType) => {
    let sheetsOther = [];
    if (actionType === 'add') {
      let tempData = dryWallOtherSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity + incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });
      tempData.map(item => {
        sheetsOther.push(item);
      });
      setDryWallOtherSheets(sheetsOther);
    } else if (actionType === 'delete') {
      let tempData = dryWallOtherSheets;
      tempData.map((item, index) => {
        if (index === itemIndex) {
          item.quantity = item.quantity - incrementData;
          item.totalSqFeet = item.squareFeet * item.quantity;
        }
      });
      tempData.map(item => {
        sheetsOther.push(item);
      });
      setDryWallOtherSheets(sheetsOther);
    }
    calculateTotalSqFeet();
  };

  //fun to create sheet size//
  const createSheetSize = (value, title, otherSize, defaultSize) => {
    let obj = {};
    if (!value) {
      showErrorAlert('Please select a value');
    } else {
      obj.type = value;
      obj.title = title;
      obj.squareFeet = parseInt(otherSize, 10);
      obj.length = parseInt(defaultSize, 10);

      dispatch(createSheet(obj));
      setOpenAddSizeModal(!openAddSizeModal);
    }
  };
  //fun to create supply//
  const createSupply = data => {
    let obj = {};
    if (data.length === 0) {
      showErrorAlert('Please enter supply name');
    } else {
      obj.title = data;
      dispatch(createSupplier(obj));
      setSupplyModalVisible(!supplyModalVisible);
    }
  };

  function openCreateAreaModal() {
    return (
      <SafeAreaView>
        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={modalVisible}
          style={{}}
          onBackdropPress={() => {
            setModalVisible(false);
            isEditJobArea(!editJobArea);
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: normalize(220),
              width: '87%',
              backgroundColor: Colors.white,
              borderRadius: normalize(30),
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setJobAreaName('');
              }}>
              <Image
                source={Icons.cross}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  marginRight: normalize(18),
                  marginTop: normalize(12),
                  alignSelf: 'flex-end',
                  tintColor: '#1D1E49',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: normalize(20),
                color: '#3E3E3E',
                fontFamily: Fonts.DMSans_Medium,
                marginTop: normalize(10),
                alignSelf: 'center',
              }}>
              {editJobArea === true ? 'Edit Your Area' : 'Name Your Area'}
            </Text>

            {editJobArea === true ? (
              <TextInputComponent
                borderRadius={0}
                marginTop={normalize(18)}
                height={normalize(38)}
                width={'78%'}
                placeholderTextColor={'#454545'}
                value={jobAreaName}
                borderColor={'#454545'}
                borderWidth={1}
                inputTextColor={Colors.black}
                onChangeText={data => setJobAreaName(data)}
              />
            ) : (
              <TextInputComponent
                borderRadius={0}
                marginTop={normalize(18)}
                height={normalize(38)}
                width={'78%'}
                placeholder={'Job Area Name'}
                placeholderTextColor={'#454545'}
                value={jobAreaName}
                borderColor={'#454545'}
                borderWidth={1}
                inputTextColor={Colors.black}
                onChangeText={data => setJobAreaName(data)}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                if (editJobArea === true) {
                  updateJobArea();
                } else {
                  createJobArea();
                }
              }}
              style={{
                height: normalize(40),
                width: '80%',
                backgroundColor: Colors.secondaryColor,
                borderRadius: normalize(50),
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: normalize(35),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.DMSans_Bold,
                  color: Colors.white,
                  fontSize: normalize(16),
                }}>
                {editJobArea === true ? 'Edit' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  //fun to switch to previous area//
  const goToPreviousArea = () => {
    if (selectedIndex !== -1) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex);
    }
  };
  //fun to switch to next area//
  const goToNextArea = () => {
    if (selectedIndex !== JobReducer?.jobAreaList?.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      updateJobArea();

      if (JobReducer?.sheetList?.sheets?.DryWallSheets?.length > 0) {
        const arr = JobReducer?.sheetList?.sheets?.DryWallSheets;
        const arrWithValue = arr.map(object => {
          return {...object, quantity: 0};
        });

        setDryWallSheets(arrWithValue);
      }

      if (JobReducer?.sheetList?.sheets?.FiftyFourInchSheets?.length > 0) {
        const arr = JobReducer?.sheetList?.sheets?.FiftyFourInchSheets;
        const arrWithFiftyFourInchSheets = arr.map(object => {
          return {...object, quantity: 0};
        });

        setDryWall54InchSheets(arrWithFiftyFourInchSheets);
      }

      if (JobReducer?.sheetList?.sheets?.OtherSheets?.length > 0) {
        const arr = JobReducer?.sheetList?.sheets?.OtherSheets;
        const arrWithOtherSheets = arr.map(object => {
          return {...object, quantity: 0};
        });

        setDryWallOtherSheets(arrWithOtherSheets);
      }
    } else {
      setSelectedIndex(selectedIndex);
      updateJobArea();
      props.navigation.navigate('AddNewJob', {
        jobName: JobReducer?.singleJobDetailsReq?.jobName,
        address: JobReducer?.singleJobDetailsReq?.location,
      });
    }
  };
  // Checking status of API response SUCCESS and FAILURE//
  Status(
    JobReducer.status,
    JOB.CREATE_JOB_AREA_REQUEST.type,
    () => {
      if (JobReducer?.createJobArea) {
        showErrorAlert('Job area created successfully');
        dispatch(getJobAreaList(JobReducer?.singleJobDetailsReq?.jobId));
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data);
      setJobAreaName('');
    },
  );

  Status(
    JobReducer.status,
    JOB.GET_JOB_AREA_REQUEST.type,
    () => {
      if (Object.keys(JobReducer?.jobAreaList).length > 0) {
        dispatch(
          saveSelectedJobAreaDetails(JobReducer?.jobAreaList[selectedIndex]),
        );
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.UPDATE_JOB_AREA_REQUEST.type,
    () => {
      if (JobReducer?.updateJobArea) {
        dispatch(getJobAreaList(JobReducer?.singleJobDetailsReq?.jobId));
        dispatch(getJobAreaById(JobReducer?.selectedJobArea?.jobAreaId));
        dispatch(getSingleJobDetails(JobReducer?.singleJobDetailsReq?.jobId));
        isEditJobArea(false);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.CREATE_SHEET_REQUEST.type,
    () => {
      if (JobReducer?.createSheet) {
        showErrorAlert(JobReducer?.createSheet?.message);
        dispatch(getSheetType());
        dispatch(getJobAreaList(JobReducer?.singleJobDetailsReq?.jobId));
        dispatch(getJobAreaById(JobReducer?.selectedJobArea?.jobAreaId));
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={
          JobReducer.status === JOB.CREATE_JOB_AREA_REQUEST.type ||
          JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type ||
          JobReducer.status === JOB.UPDATE_JOB_AREA_REQUEST.type ||
          JobReducer.status === JOB.GET_JOB_AREA_BY_ID_REQUEST.type ||
          JobReducer.status === JOB.GET_SINGLE_JOB_DETAILS_REQUEST.type
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
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('DrawerNavigator');
            dispatch(resetSupplyData());
            setDryWall54InchSheets([]);
            setDryWallOtherSheets([]);
            setDryWallSheets([]);
            setCalculateTotalSquareFeet(0);
          }}>
          <Image
            source={Icons.back_arrow}
            resizeMode="contain"
            style={{
              height: normalize(20),
              width: normalize(20),
              tintColor: Colors.white,
              marginLeft: normalize(17),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ViewJob', {
              jobName: JobReducer?.singleJobDetailsReq?.jobName,
            })
          }>
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
            {JobReducer.status === JOB.GET_JOB_AREA_BY_ID_REQUEST.type ||
            JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type
              ? '  '
              : JobReducer?.singleJobDetailsReq?.jobName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(getJobSummary(JobReducer?.singleJobDetailsReq?.jobId));
            props.navigation.navigate('JobSummary');
          }}
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
            {JobReducer.status === JOB.GET_JOB_AREA_BY_ID_REQUEST.type ||
            JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type
              ? '  '
              : JobReducer?.singleJobDetailsReq?.squareFeet}{' '}
            sq ft
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: normalize(14),
          color: Colors.white,
          fontFamily: Fonts.DMSans_Regular,
          marginLeft: normalize(22),
        }}>
        {JobReducer?.singleJobDetailsReq?.location}
      </Text>

      {JobReducer.status === JOB.GET_JOB_AREA_BY_ID_REQUEST.type ||
      JobReducer.status === JOB.GET_JOB_AREA_REQUEST.type ? (
        <View
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      ) : JobReducer?.jobAreaList?.length > 0 ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '80%',
                marginTop: normalize(20),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  isEditJobArea(!editJobArea);
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: normalize(24),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    width: normalize(150),
                  }}>
                  {JobReducer?.getJobAreaByID?.jobAreaName}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: normalize(90),
                  height: normalize(35),
                  borderWidth: normalize(1.5),
                  justifyContent: 'center',
                  marginLeft: normalize(12),
                  borderColor: '#E2E8F3',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    alignSelf: 'center',
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                  }}>
                  {calculateTotalSqareFeet} sq ft
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(12),
                marginLeft: normalize(32),
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setFiveEightInch(false);
                    setHalfInch(!halfInch);
                  }}
                  style={{marginTop: normalize(4.5)}}>
                  {halfInch ? (
                    <Image
                      source={Icons.checked}
                      resizeMode={'contain'}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#CCCCCC',
                      }}
                    />
                  ) : (
                    <Image
                      source={Icons.unchecked}
                      resizeMode={'contain'}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#CCCCCC',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: normalize(2),
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginLeft: normalize(15),
                  }}>
                  1/2’’ Sheets
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: normalize(30),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setFiveEightInch(!fiveEightInch);
                    setHalfInch(false);
                  }}
                  style={{marginTop: normalize(4.5)}}>
                  {fiveEightInch ? (
                    <Image
                      source={Icons.checked}
                      resizeMode={'contain'}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#CCCCCC',
                      }}
                    />
                  ) : (
                    <Image
                      source={Icons.unchecked}
                      resizeMode={'contain'}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#CCCCCC',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: normalize(2),
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginLeft: normalize(15),
                  }}>
                  5/8‘’ Sheets
                </Text>
              </View>
            </View>

            <Text
              style={{
                marginLeft: normalize(32),
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.white,
                marginTop: normalize(20),
              }}>
              Drywall Sheets
            </Text>

            <View style={{flexDirection: 'row'}}>
              {selectedIndex !== 0 ? (
                <TouchableOpacity
                  style={{justifyContent: 'center', marginTop: normalize(2)}}
                  onPress={() => {
                    goToPreviousArea();
                  }}>
                  <Image
                    source={Icons.arrow_prev}
                    resizeMode="contain"
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{height: normalize(25), width: normalize(25)}} />
              )}

              <RegularSheetList
                dryWallSheets={dryWallSheets}
                onPress={(incrementData, itemIndex, actionType) =>
                  addDrywallSheets(incrementData, itemIndex, actionType)
                }
              />

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                }}
                onPress={() => {
                  goToNextArea();
                }}>
                <Image
                  source={Icons.arrow_next}
                  resizeMode="contain"
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    marginRight: normalize(5),
                  }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.white,
                marginTop: normalize(20),
                marginLeft: normalize(32),
              }}>
              54 Inch
            </Text>

            <FiftyFourInchSheetList
              dryWall54InchSheets={dryWall54InchSheets}
              onPress={(incrementData, itemIndex, actionType) =>
                addDryWall54InchSheets(incrementData, itemIndex, actionType)
              }
            />
            <Text
              style={{
                fontSize: normalize(14),
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.white,
                marginTop: normalize(20),
                marginLeft: normalize(32),
              }}>
              Other Sizes
            </Text>

            <OtherSheetList
              dryWallOtherSheets={dryWallOtherSheets}
              onPress={(incrementData, itemIndex, actionType) =>
                addDryWallOtherSheets(incrementData, itemIndex, actionType)
              }
            />
            <TouchableOpacity
              onPress={() => {
                setOpenAddSizeModal(!openAddSizeModal);
              }}
              style={{
                height: normalize(35),
                width: normalize(170),
                backgroundColor: Colors.secondaryColor,
                alignSelf: 'center',
                borderRadius: normalize(50),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: normalize(15),
                marginTop: normalize(40),
              }}>
              <Image
                source={Icons.plus_white}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(15),
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.DMSans_Bold,
                  color: Colors.white,
                  fontSize: normalize(14),
                  marginLeft: 15,
                }}>
                Add a Sheet Size
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                marginTop: normalize(20),
                fontSize: normalize(12),
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.white,
                marginLeft: normalize(32),
              }}>
              Other Supplies
            </Text>

            <FlatList
              data={AddSupplyReducer}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              renderItem={({item, index}) => (
                <AddSupplyComponent
                  index={index}
                  title={item.title}
                  quantity={item.quantity}
                />
              )}
              keyExtractor={item => {
                return item.supplyId || Math.random().toString();
              }}
            />

            <TouchableOpacity
              onPress={() => {
                handleAddComponent();
              }}
              style={{
                height: normalize(35),
                width: normalize(170),
                backgroundColor: Colors.secondaryColor,
                alignSelf: 'center',
                borderRadius: normalize(50),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: normalize(15),
                marginTop: normalize(40),
              }}>
              <Image
                source={Icons.plus_white}
                resizeMode="contain"
                style={{
                  height: normalize(15),
                  width: normalize(15),
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.DMSans_Bold,
                  color: Colors.white,
                  fontSize: normalize(14),
                  marginLeft: 15,
                }}>
                Add Supplies
              </Text>
            </TouchableOpacity>

            <View style={{width: '85%', alignSelf: 'center'}}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.DMSans_Regular,
                }}>
                Notes
              </Text>

              <View
                style={{
                  width: '95%',
                  height: normalize(150),
                  alignSelf: 'center',
                  borderColor: '#CCCCCC',
                  borderWidth: 1,
                  marginTop: normalize(20),
                  backgroundColor: '#1B2D37',
                }}>
                <TextInput
                  backgroundColor={Colors.primaryColor}
                  multiline={true}
                  placeholder={'Add notes here...'}
                  placeholderTextColor={'#CCCCCC'}
                  width={'100%'}
                  value={notes}
                  style={{height: '100%', padding: 10, color: Colors.white}}
                  textAlignVertical={'top'}
                  onChangeText={data => setNotes(data)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                height: normalize(20),
                justifyContent: 'center',
                marginBottom: normalize(20),
                alignSelf: 'center',
                marginTop: normalize(15),
              }}>
              {JobReducer?.jobAreaList &&
                JobReducer?.jobAreaList?.length > 0 &&
                JobReducer?.jobAreaList &&
                JobReducer?.jobAreaList.map((item, index) => {
                  return (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        backgroundColor:
                          selectedIndex === index ? Colors.white : '#B0B0B0',
                        marginLeft: 10,
                      }}
                    />
                  );
                })}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            disabled={JobReducer?.jobAreaList?.length > 0}
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              width: normalize(50),
              height: normalize(50),
              backgroundColor: '#E2E8F3',
              borderRadius: normalize(25),
              justifyContent: 'center',
            }}>
            <Image
              source={Icons.plus}
              style={{height: 25, width: 25, alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              marginTop: normalize(10),
              color: Colors.white,
            }}>
            Add Job Area
          </Text>
        </View>
      )}
      {openCreateAreaModal()}

      <AddSheetSizeModal
        modalVisible={openAddSizeModal}
        closeModal={() => setOpenAddSizeModal(!openAddSizeModal)}
        createSheetSize={data => createSheetSize(data)}
      />
      <AddSupplyModal
        modalVisible={supplyModalVisible}
        closeModal={() => setSupplyModalVisible(!supplyModalVisible)}
        createSupply={data => createSupply(data)}
      />
    </View>
  );
}
