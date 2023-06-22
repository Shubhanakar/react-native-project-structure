import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../theme/theme';
import normalise from '../../utils/Dimen';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        marginLeft: props.marginLeft,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      onPress={props.onPress}>
      {props.img !== null && (
        <Image
          source={props.img}
          resizeMode={'contain'}
          style={{
            height: normalise(15),
            width: normalise(15),
            alignSelf: 'center',
            tintColor: Colors.white,
          }}
        />
      )}
      <Text
        style={{
          fontFamily: Fonts.DMSans_Bold,
          color: props.textColor,
          fontSize: props.fontSize,
          marginTop: props.textMarginTop,
          alignSelf: 'center',
          textAlign: 'center',
        }}
        numberOfLines={2}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  height: PropTypes.any,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.any,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  marginLeft: PropTypes.number,
  img: PropTypes.any,
};

Button.defaultProps = {
  height: normalise(40),
  backgroundColor: Colors.tealBlue,
  borderRadius: normalise(20),
  textColor: Colors.white,
  fontSize: null,
  title: '',
  onPress: null,
  alignSelf: null,
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  borderWidth: 0,
  borderColor: null,
  marginLeft: 0,
  img: null,
};
