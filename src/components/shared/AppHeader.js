import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from '../../utils/Dimen';
import {Icons, Colors, Fonts} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function AppHeader(props) {
  const navigation = useNavigation();
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  return (
    <View
      style={{
        width: '100%',
        height: normalize(50),
        flexDirection: 'row',
        marginTop: props.marginTop,
      }}>
      <View
        style={{
          width: '100%',
          height: normalize(50),
          flexDirection: 'row',
          flex: 0.5,
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image
            source={Icons.menu}
            resizeMode="contain"
            style={{
              height: normalize(25),
              width: normalize(25),

              marginLeft: normalize(15),
              marginTop: normalize(12),
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: normalize(26),
            marginTop: normalize(6),
            color: Colors.white,
            fontFamily: Fonts.DMSans_Medium,
            marginLeft: normalize(20),
          }}>
          {props.title}
        </Text>
      </View>
      {props.isAddJob && (
        <View
          style={{
            width: '100%',
            height: normalize(50),
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 0.5,
          }}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}
            style={{
              height: normalize(30),
              width: normalize(90),
              backgroundColor: Colors.secondaryColor,
              justifyContent: 'center',
              marginRight: normalize(10),
              borderRadius: normalize(25),
              flexDirection: 'row',
              marginTop: normalize(8),
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
                fontSize: normalize(12),
                marginLeft: normalize(10),
                fontFamily: Fonts.DMSans_Bold,
                color: Colors.white,
              }}>
              Add Job
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
AppHeader.propTypes = {
  marginTop: PropTypes.number,
};

AppHeader.defaultProps = {
  marginTop: 0,
};
