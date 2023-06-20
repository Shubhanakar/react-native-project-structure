import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../utils/Dimen';
import Button from '../components/shared/Button';
import Profile from '../screens/Profile/Profile';
import {Colors, Fonts, Icons} from '../theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import Jobs from '../screens/Jobs/Jobs';
import Settings from '../screens/Settings/Settings';
import {getLogout} from '../redux/action/AuthAction';
import {useDoubleBackPressExit} from '../hooks/useBackHandlerHooks';

const Drawer = createDrawerNavigator();

var userName = '';

const DrawerContent = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginTop: Platform.OS == 'android' ? normalize(40) : 0,
        }}
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image
          source={Icons.cross}
          style={{
            height: normalize(15),
            width: normalize(15),
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: normalize(170),
          width: normalize(280),
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: normalize(15),
            fontFamily: Fonts.DMSans_Medium,
            color: Colors.white,
            marginTop: 150,
          }}>
          {userName}
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button
        width={'70%'}
        height={normalize(42)}
        borderRadius={normalize(22)}
        fontSize={normalize(14)}
        marginTop={normalize(20)}
        marginBottom={normalize(15)}
        borderColor={Colors.white}
        textColor={Colors.white}
        title={'Log Out'}
        alignSelf={'center'}
        backgroundColor={Colors.secondaryColor}
        onPress={() => {
          dispatch(getLogout());
        }}
      />
    </SafeAreaView>
  );
};

const DrawerNavigator = () => {
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  dispatch = useDispatch();

  userName = ProfileReducer?.profileDetails?.fullName;

  useDoubleBackPressExit(() => {
    console.log('Button pressed');
  });

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        drawerStatusBarAnimation: 'fade',
        gestureEnabled: true,
        drawerStyle: {
          backgroundColor: Colors.drawerBackgroundColor,
          width: normalize(280),
        },

        drawerLabelStyle: {
          fontFamily: Fonts.Roboto_Regular,
          color: Colors.black,
          fontSize: normalize(14),
        },
      }}>
      <Drawer.Screen
        name={'Jobs'}
        headerShown={false}
        component={Jobs}
        options={{
          drawerActiveBackgroundColor: '#3C91E6',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{
                fontSize: normalize(14),
                color: Colors.white,
                fontFamily: Fonts.DMSans_Regular,
              }}>
              Jobs
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={Icons.jobs}
              style={{height: 20, width: 20, alignSelf: 'center'}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Profile'}
        headerShown={false}
        component={Profile}
        options={{
          drawerActiveBackgroundColor: '#3C91E6',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{
                fontSize: normalize(14),
                color: Colors.white,
                fontFamily: Fonts.DMSans_Regular,
              }}>
              Profile
            </Text>
          ),
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={Icons.profile}
              style={{height: 20, width: 20, alignSelf: 'center'}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'Settings'}
        headerShown={false}
        component={Settings}
        options={{
          drawerActiveBackgroundColor: '#3C91E6',
          drawerLabel: ({focused, color}) => (
            <Text
              style={{
                fontSize: normalize(14),
                color: Colors.white,
                fontFamily: Fonts.DMSans_Regular,
              }}>
              Settings
            </Text>
          ),
          title: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={Icons.settings}
              style={{height: 20, width: 20, alignSelf: 'center'}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
