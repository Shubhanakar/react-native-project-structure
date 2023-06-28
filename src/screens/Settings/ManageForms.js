import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';

import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSheetType,
  deleteSheetReq,
  createSheet,
  createSupplier,
  deleteSupplyReq,
} from '../../redux/action/JobAction';
import Loader from '../../utils/Loader';
import {JOB} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import AddSheetSizeModal from '../../components/shared/AddSheetSizeModal';
import AddSupplyModal from '../../components/shared/AddSupplyModal';

export default function ManageForms(props) {
  const [defaultSize, setDefaultSize] = useState(0);
  const [otherSize, setOtherSize] = useState('');
  const [title, setTitle] = useState('');
  const [isSheetModalVisible, setIsSheetModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const JobReducer = useSelector(state => state.JobReducer);

  //fun for get sheet tyes ie. Drywall sheet, 54 Inch sheets and other sheets//
  useEffect(() => {
    dispatch(getSheetType());
  }, [dispatch]);

  //fun for pull to refresh//
  const onRefreshList = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getSheetType());
      setRefreshing(false);
    }, 500);
  }, [dispatch]);

  //fun for create sheet size//
  const createSheetSize = () => {
    let obj = {};
    if (!value) {
      showErrorAlert('Please select a value');
    } else if (title.length === 0) {
      showErrorAlert('Please enter title');
    } else if (value !== 'OtherSheets' && defaultSize !== 0) {
      showErrorAlert('Please enter a size');
    } else {
      obj.type = value;
      obj.title = title;
      obj.squareFeet = parseFloat(otherSize);
      obj.length = value !== 'OtherSheets' ? parseInt(defaultSize, 10) : null;
      dispatch(createSheet(obj));
      setIsSheetModalVisible(!isSheetModalVisible);
      setDefaultSize('');
      setOtherSize('');
      setValue('');
      setTitle('');
    }
  };

  //fun for create supply//
  const createSupply = data => {
    let obj = {};
    if (data.length === 0) {
      showErrorAlert('Please enter supply name');
    } else {
      obj.title = data;
      dispatch(createSupplier(obj));
      setModalVisible(!modalVisible);
    }
  };
  // Checking status of API response SUCCESS and FAILURE//
  Status(
    JobReducer.status,
    JOB.DELETE_SHEET_REQUEST.type,
    () => {
      if (JobReducer?.deleteSheet) {
        showErrorAlert(JobReducer?.deleteSheet?.message);
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
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  Status(
    JobReducer.status,
    JOB.CREATE_SUPPLIER_REQUEST.type,
    () => {
      if (JobReducer?.createSupplier) {
        showErrorAlert(JobReducer?.createSupplier?.message);
      }
    },
    () => {
      showErrorAlert(JobReducer?.error?.response?.data?.message);
    },
  );

  //fun for delete sheets//
  const deleteSheet = sheetId => {
    dispatch(deleteSheetReq(sheetId));
  };
  //fun for delete supplies//
  const deleteSupply = supplierId => {
    dispatch(deleteSupplyReq(supplierId));
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={
          JobReducer.status === JOB.SHEET_TYPE_REQUEST.type ||
          JobReducer.status === JOB.DELETE_SHEET_REQUEST.type ||
          JobReducer.status === JOB.CREATE_SHEET_REQUEST.type ||
          JobReducer.status === JOB.CREATE_SUPPLIER_REQUEST.type ||
          JobReducer.status === JOB.DELETE_SUPPLIER_REQUEST.type
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
          marginTop: normalize(10),
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
          Manage Forms
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshList} />
        }
        showsVerticalScrollIndicator={false}>
        <Text
          style={{
            marginTop: normalize(20),
            marginLeft: normalize(20),
            fontSize: normalize(14),
            color: '#F3F3F3',
            fontFamily: Fonts.DMSans_Medium,
          }}>
          Regular Drywall Sheet Sizes
        </Text>
        <Text
          style={{
            marginTop: normalize(20),
            marginLeft: normalize(20),
            fontSize: normalize(14),
            color: '#F3F3F3',
            fontFamily: Fonts.DMSans_Medium,
          }}>
          Default Sizes
        </Text>
        {JobReducer?.sheetList?.sheets?.DryWallSheets?.length > 0 ? (
          <View>
            <FlatList
              data={JobReducer?.sheetList?.sheets?.DryWallSheets}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: normalize(45),
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#F3F3F3',
                    borderBottomWidth: normalize(1),
                    borderTopWidth: index === 0 ? normalize(1) : 0,
                    marginTop: index === 0 ? normalize(20) : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontFamily: Fonts.DMSans_Regular,
                      alignSelf: 'center',
                      color: Colors.white,
                      marginLeft: normalize(10),
                    }}>
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteSheet(item.sheetId)}
                    style={{
                      marginTop: normalize(10),
                      marginRight: normalize(10),
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontFamily: Fonts.DMSans_Regular,
                        alignSelf: 'center',
                        color: Colors.white,
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => {
                return item.sheetId;
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              marginTop: normalize(30),
              fontSize: normalize(12),
              alignSelf: 'center',
              color: '#F3F3F3',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            You don't have any Default Sizes
          </Text>
        )}

        <Text
          style={{
            marginTop: normalize(20),
            marginLeft: normalize(20),
            fontSize: normalize(14),
            color: '#F3F3F3',
            fontFamily: Fonts.DMSans_Medium,
          }}>
          54 Inch Drywall Sheet Sizes
        </Text>
        {JobReducer?.sheetList?.sheets?.FiftyFourInchSheets?.length > 0 ? (
          <View>
            <FlatList
              data={JobReducer?.sheetList?.sheets?.FiftyFourInchSheets}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: normalize(45),
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#F3F3F3',
                    borderBottomWidth: normalize(1),
                    borderTopWidth: index === 0 ? normalize(1) : 0,
                    marginTop: index === 0 ? normalize(20) : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontFamily: Fonts.DMSans_Regular,
                      alignSelf: 'center',
                      color: '#F3F3F3',
                      marginLeft: normalize(10),
                    }}>
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteSheet(item.sheetId)}
                    style={{
                      marginTop: normalize(10),
                      marginRight: normalize(10),
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontFamily: Fonts.DMSans_Regular,
                        alignSelf: 'center',
                        color: '#F3F3F3',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => {
                return item.sheetId;
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              marginTop: normalize(30),
              fontSize: normalize(12),
              alignSelf: 'center',
              color: '#F3F3F3',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            You don't have any 54 inch Drywall sheet sizes
          </Text>
        )}

        <Text
          style={{
            marginTop: normalize(30),
            marginLeft: normalize(20),
            fontSize: normalize(14),
            color: '#F3F3F3',
            fontFamily: Fonts.DMSans_Medium,
          }}>
          Other Sizes
        </Text>

        {JobReducer?.sheetList?.sheets?.OtherSheets?.length > 0 ? (
          <View>
            <FlatList
              data={JobReducer?.sheetList?.sheets?.OtherSheets}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: normalize(45),
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#F3F3F3',
                    borderBottomWidth: normalize(1),
                    borderTopWidth: index === 0 ? normalize(1) : 0,
                    marginTop: index === 0 ? normalize(20) : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontFamily: Fonts.DMSans_Regular,
                      alignSelf: 'center',
                      color: '#F3F3F3',
                      marginLeft: normalize(10),
                    }}>
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteSheet(item.sheetId)}
                    style={{
                      marginTop: normalize(10),
                      marginRight: normalize(10),
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontFamily: Fonts.DMSans_Regular,
                        alignSelf: 'center',
                        color: '#F3F3F3',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => {
                return item.sheetId;
              }}
            />
          </View>
        ) : (
          <Text
            style={{
              marginTop: normalize(30),
              fontSize: normalize(12),
              alignSelf: 'center',
              color: '#F3F3F3',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            You don't have any other size
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setIsSheetModalVisible(!isSheetModalVisible);
          }}
          style={{
            height: normalize(40),
            width: '60%',
            backgroundColor: Colors.secondaryColor,
            justifyContent: 'center',
            alignSelf: 'center',
            marginRight: normalize(10),
            borderRadius: normalize(25),
            flexDirection: 'row',
            marginTop: normalize(28),
          }}>
          <Image
            source={Icons.plus}
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: Colors.white,
            }}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: normalize(14),
              marginLeft: normalize(10),
              fontFamily: Fonts.DMSans_Bold,
              color: Colors.white,
            }}>
            Add Default Size
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: normalize(20)}}>
          <Text
            style={{
              marginTop: normalize(20),
              marginLeft: normalize(20),
              fontSize: normalize(14),
              color: '#F3F3F3',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            Other Supplies
          </Text>

          <Text
            style={{
              marginTop: normalize(20),
              marginLeft: normalize(20),
              fontSize: normalize(12),
              color: '#F3F3F3',
              fontFamily: Fonts.DMSans_Medium,
            }}>
            Default Supplies
          </Text>
          <View>
            <FlatList
              data={JobReducer?.supplierList?.supplies}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: normalize(45),
                    width: '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#F3F3F3',
                    borderBottomWidth: normalize(1),
                    borderTopWidth: index === 0 ? normalize(1) : 0,
                    marginTop: index === 0 ? normalize(20) : 0,
                  }}>
                  <Text
                    style={{
                      fontSize: normalize(14),
                      fontFamily: Fonts.DMSans_Regular,
                      alignSelf: 'center',
                      color: '#F3F3F3',
                      marginLeft: normalize(10),
                    }}>
                    {item.title}
                  </Text>

                  <TouchableOpacity
                    onPress={() => deleteSupply(item.supplyId)}
                    style={{
                      marginTop: normalize(10),
                      marginRight: normalize(10),
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(20),
                        fontFamily: Fonts.DMSans_Regular,
                        alignSelf: 'center',
                        color: '#F3F3F3',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => {
                return item.sheetId;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              height: normalize(40),
              width: '60%',
              backgroundColor: Colors.secondaryColor,
              justifyContent: 'center',
              alignSelf: 'center',
              marginRight: normalize(10),
              borderRadius: normalize(25),
              flexDirection: 'row',
              marginTop: normalize(25),
              marginBottom: 30,
            }}>
            <Image
              source={Icons.plus}
              style={{
                height: normalize(15),
                width: normalize(15),
                alignSelf: 'center',
                tintColor: Colors.white,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontSize: normalize(14),
                marginLeft: normalize(10),
                fontFamily: Fonts.DMSans_Bold,
                color: Colors.white,
              }}>
              Add Other Supplies
            </Text>
          </TouchableOpacity>
        </View>
        <AddSheetSizeModal
          modalVisible={isSheetModalVisible}
          closeModal={() => setIsSheetModalVisible(!isSheetModalVisible)}
          createSheetSize={data => createSheetSize(data)}
        />
        <AddSupplyModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(!modalVisible)}
          createSupply={data => createSupply(data)}
        />
      </ScrollView>
    </View>
  );
}
