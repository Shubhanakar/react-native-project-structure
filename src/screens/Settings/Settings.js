import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import Button from '../../components/shared/Button';
import normalize from '../../utils/Dimen';
import {Fonts, Colors, Icons} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import AppHeader from '../../components/shared/AppHeader';
import {PROFILE} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import Loader from '../../utils/Loader';
import constants from '../../constants';
import {useSelector} from 'react-redux';
import DeleteConfirmationModal from '../../components/shared/DeleteAccountModal';

export default function Settings(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const ProfileReducer = useSelector(state => state.ProfileReducer);

  //Checking status of API response SUCCESS and FAILURE//
  Status(
    ProfileReducer.status,
    PROFILE.DELETE_ACCOUNT_REQUEST.type,
    () => {
      showErrorAlert('Account deleted successfully');
    },
    () => {
      showErrorAlert(ProfileReducer?.error?.response?.data?.message);
    },
  );

  const openURL = url => {
    Linking.openURL(url);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryColor}}>
      <Loader
        visible={ProfileReducer.status === PROFILE.DELETE_ACCOUNT_REQUEST.type}
      />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />

      <AppHeader title={'Settings'} />
      <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: 20}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ManageForms')}
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            borderTopWidth: normalize(1),
            borderColor: '#F3F3F3',
            borderBottomWidth: normalize(1),
          }}>
          <Text
            style={{
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              alignSelf: 'center',
              color: '#F3F3F3',
              marginLeft: normalize(10),
            }}>
            Manage Forms
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('KeepJobs')}
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
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
              marginLeft: normalize(10),
            }}>
            Keep Jobs
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              fontFamily: Fonts.DMSans_Regular,
              alignSelf: 'center',
              color: '#BDBDBD',
              marginLeft: normalize(140),
            }}>
            {ProfileReducer?.profileDetails?.userSettings?.jobLifespan === 365
              ? '1 year'
              : ProfileReducer?.profileDetails?.userSettings?.jobLifespan === 30
              ? '30 days'
              : ProfileReducer?.profileDetails?.userSettings == null
              ? ''
              : 'Forever'}
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openURL(constants.TERMS_AND_CONDITIONS)}
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
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
              marginLeft: normalize(10),
            }}>
            Terms and Conditions
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openURL(constants.PRIVACY_POLICY)}
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
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
              marginLeft: normalize(10),
            }}>
            Privacy Policy
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
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
              marginLeft: normalize(10),
            }}>
            Contact Us
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: normalize(55),
            width: '90%',
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
              marginLeft: normalize(10),
            }}>
            Rate App
          </Text>
          <Image
            source={Icons.arrow_right}
            resizeMode="contain"
            style={{
              height: normalize(15),
              width: normalize(15),
              alignSelf: 'center',
              tintColor: '#F3F3F3',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
          }}>
          <Button
            width={'80%'}
            height={normalize(42)}
            borderRadius={normalize(22)}
            fontSize={normalize(14)}
            borderColor={Colors.white}
            textColor={Colors.white}
            title={'Delete Account'}
            marginBottom={normalize(10)}
            alignSelf={'center'}
            backgroundColor={Colors.secondaryColor}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
        <DeleteConfirmationModal
          modalVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
}
