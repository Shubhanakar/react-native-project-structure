import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useSelector} from 'react-redux';
import SendSMS from 'react-native-sms';
import Loader from '../../utils/Loader';
import Modal from 'react-native-modal';

import email from 'react-native-email';
import JobSummaryComponent from '../../components/featured/JobSummaryComponent';
import {JOB} from '../../redux/store/TypeConstants';
import jsonToPlainText from '../../utils/jsonToPlainText';
export default function JobSummary(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const JobReducer = useSelector(state => state.JobReducer);

  {
    /* fun to share summary via email */
  }

  const shareViaEmail = () => {
    const to = [''];
    email(to, {
      subject: 'Drywall Summary',
      body: jsonToPlainText(JobReducer?.jobSummary),
      checkCanOpen: false,
    }).catch(console.error);
  };
  {
    /* fun to share summary via text message */
  }
  const shareViaTextMessage = () => {
    SendSMS.send(
      {
        body: jsonToPlainText(JobReducer?.jobSummary),
        recipients: [''],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  };

  {
    /* fun to open share modal */
  }
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
              position: 'absolute',
              bottom: 70,
              height: normalize(90),
              width: '90%',
              backgroundColor: '#E2E8F3',
              borderRadius: normalize(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                shareViaTextMessage(), setModalVisible(false);
              }}
              style={{
                borderColor: '#B4B4B4',
                height: normalize(45),
                justifyContent: 'center',
                borderBottomWidth: normalize(1),
              }}>
              <Text
                style={{
                  fontSize: normalize(16),
                  color: '#3E3E3E',
                  fontFamily: Fonts.DMSans_Medium,
                  alignSelf: 'center',
                }}>
                Text Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                shareViaEmail(), setModalVisible(!modalVisible);
              }}
              style={{
                borderColor: '#B4B4B4',
                height: normalize(45),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: normalize(16),
                  color: '#3E3E3E',
                  fontFamily: Fonts.DMSans_Medium,
                  alignSelf: 'center',
                }}>
                Email
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              borderColor: '#B4B4B4',
              height: normalize(45),
              justifyContent: 'center',
              borderBottomWidth: normalize(1),
              backgroundColor: '#E2E8F3',
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              width: '90%',
              borderRadius: normalize(25),
            }}>
            <Text
              style={{
                fontSize: normalize(16),
                color: '#3E3E3E',
                fontFamily: Fonts.DMSans_Medium,
                alignSelf: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    );
  }

  {
    /* fun to filter category in to different array */
  }

  function makeSheetArray(sheets) {
    let mySheets = {
      regular: [],
      other: [],
      fiftyFourInch: [],
    };

    sheets.map(item2 => {
      if (item2.sheetType === 'Regular') {
        mySheets.regular.push(item2); // for regular sheet
      } else if (item2.sheetType === '54 Inch') {
        mySheets.fiftyFourInch.push(item2); // for 54inch sheets
      } else if (item2.sheetType === 'Other') {
        mySheets.other.push(item2); // for other sheets
      }
    });

    return mySheets;
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader visible={JobReducer.status === JOB.JOB_SUMMARY_REQUEST.type} />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
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
              fontFamily: Fonts.DMSans_Medium,
              marginLeft: normalize(15),
              width: normalize(140),
            }}>
            {JobReducer?.jobSummary?.jobName}
          </Text>
          <View
            style={{
              width: normalize(90),
              height: normalize(40),
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
              {JobReducer?.jobSummary?.squareFeet} sq ft
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: normalize(12),
            color: '#F0F0F0',
            fontFamily: Fonts.DMSans_Regular,
            marginLeft: normalize(15),
          }}>
          {JobReducer?.jobSummary?.location}
        </Text>

        <View
          style={{
            width: '100%',
            height: normalize(45),
            marginTop: normalize(20),
            flexDirection: 'row',
            borderBottomWidth: 0,
          }}>
          <TouchableOpacity
            onPress={() => setSelectedIndex(0)}
            style={{
              width: '100%',
              height: normalize(45),
              backgroundColor: selectedIndex == 1 ? '#E2E8F34A' : null,
              flex: 0.5,
              borderTopLeftRadius: normalize(10),
              borderTopRightRadius: normalize(10),
              justifyContent: 'center',
              borderBottomWidth: 0,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderColor: '#6E7073',
            }}>
            <Text
              style={{
                fontSize: normalize(15),
                color: selectedIndex == 1 ? '#C1C1C1' : Colors.white,
                fontFamily: Fonts.DMSans_Bold,
                alignSelf: 'center',
              }}>
              Client Summary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedIndex(1)}
            style={{
              width: '100%',
              height: normalize(45),
              backgroundColor: selectedIndex == 0 ? '#E2E8F34A' : null,
              flex: 0.5,
              borderTopLeftRadius: normalize(10),
              borderTopRightRadius: normalize(10),
              justifyContent: 'center',
              borderBottomWidth: 0,
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderColor: '#6E7073',
            }}>
            <Text
              style={{
                fontSize: normalize(15),
                color: selectedIndex == 0 ? '#C1C1C1' : Colors.white,
                fontFamily: Fonts.DMSans_Bold,
                alignSelf: 'center',
              }}>
              Supplier Summary
            </Text>
          </TouchableOpacity>
        </View>

        {JobReducer?.jobSummary?.jobAreas?.length > 0
          ? JobReducer?.jobSummary?.jobAreas.map((item, index) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: index == 0 ? normalize(15) : normalize(40),
                    }}
                    key={index}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        marginTop: normalize(15),
                        fontSize: normalize(25),
                        fontFamily: Fonts.DMSans_Regular,
                        color: Colors.white,
                        marginLeft: normalize(25),
                        width: '42%',
                      }}>
                      {item.jobAreaName}
                    </Text>
                    <View
                      style={{
                        width: normalize(80),
                        height: normalize(40),
                        justifyContent: 'center',
                        marginLeft: normalize(60),
                        marginTop: normalize(8),
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: normalize(14),
                          fontFamily: Fonts.DMSans_Regular,
                          color: '#D9D9D9',
                        }}>
                        {item.squareFeet ? item.squareFeet : '---'} sq ft
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginTop: normalize(12),
                      fontSize: normalize(16),
                      fontFamily: Fonts.DMSans_Medium,
                      color: Colors.white,
                      marginLeft: normalize(25),
                    }}>
                    {item.sheetThickness} Inch Sheets
                  </Text>
                  <JobSummaryComponent
                    data={makeSheetArray(item.sheets)}
                    supplies={item.supplies}
                  />

                  {item.supplies.length > 0 &&
                    item.supplies.map(item => {
                      return (
                        <View>
                          <Text
                            style={{
                              marginTop: normalize(30),
                              fontSize: normalize(14),
                              fontFamily: Fonts.DMSans_Regular,
                              color: Colors.white,
                              marginLeft: normalize(30),
                            }}>
                            Other Supplies (specific to this area)
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{
                                fontSize: normalize(13),
                                fontFamily: Fonts.DMSans_Regular,
                                color: Colors.white,
                                marginTop: normalize(10),
                                marginLeft: normalize(30),
                                width: normalize(80),
                              }}>
                              {item.supplyTitle}
                            </Text>
                            <View
                              style={{
                                height: normalize(20),
                                width: normalize(1),
                                borderColor: Colors.white,
                                backgroundColor: Colors.white,
                                marginLeft: 20,
                                borderWidth: 0.5,
                                marginTop: 10,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: normalize(12),
                                fontFamily: Fonts.DMSans_Regular,
                                color: Colors.white,
                                marginTop: normalize(10),
                                marginLeft: normalize(25),
                              }}>
                              {item.quantity} supply
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
              );
            })
          : null}

        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            backgroundColor: '#E2E8F3',
            height: normalize(45),
            width: normalize(45),
            borderRadius: normalize(23),
            position: 'absolute',
            top: 600,
            right: 20,
            justifyContent: 'center',
          }}>
          <Image
            source={Icons.share}
            resizeMode="contain"
            style={{
              height: normalize(20),
              width: normalize(20),
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>

        <View style={{marginBottom: 20, marginTop: 20}}>
          <Text
            style={{
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.white,
              marginLeft: normalize(20),
            }}>
            Notes
          </Text>

          <Text
            style={{
              fontSize: normalize(12),
              fontFamily: Fonts.DMSans_Regular,
              color: '#CCCCCC',
              marginTop: normalize(10),
              marginLeft: normalize(20),
              paddingRight: 10,
            }}>
            {JobReducer?.jobSummary?.notes
              ? JobReducer?.jobSummary?.notes
              : 'NA'}
          </Text>
        </View>
      </ScrollView>
      {openModal()}
    </View>
  );
}
