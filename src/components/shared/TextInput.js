import React from 'react';
import {View, Image, TextInput, Platform} from 'react-native';
import {Colors} from '../../theme/theme';
import normalise from '../../utils/Dimen';
import PropTypes from 'prop-types';

export default function TextInputComponent(props) {
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onFocus() {
    if (props.onFocus) {
      props.onFocus();
    }
  }

  function onSubmitEditing() {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  }

  return (
    <View
      style={{
        marginTop: props.marginTop,
        flexDirection: 'row',
        alignItems: props.alignItems,
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        borderRadius: props.borderRadius,
        width: props.width,
        height: props.height,
        alignSelf: props.alignSelf,
        marginLeft: props.marginLeft,
        backgroundColor: props.backgroundColor,
        marginBottom: props.marginBottom,
        borderBottomLeftRadius: props.borderBottomLeftRadius,
        borderTopLeftRadius: props.borderTopLeftRadius,
        borderEndWidth: props.borderEndWidth,
        justifyContent: props.justifyContent,
      }}>
      {props.sideimage && (
        <Image
          source={props.sideimage}
          style={{
            marginTop: normalise(16),
            marginHorizontal: normalise(5),
            marginLeft: normalise(15),
            height: normalise(15),
            width: normalise(20),
          }}
          resizeMode="contain"
        />
      )}
      <View
        style={{
          width: '100%',
          height: normalise(40),
          marginLeft: normalise(10),
          marginTop: Platform.OS === 'android' ? normalise(1) : 0,
          alignSelf: 'center',
        }}>
        <TextInput
          style={{
            width: '94%',
            height: '100%',
            color: props.inputTextColor,
            fontSize: normalise(12),
            alignSelf: props.alignSelfInput,
            marginLeft: props.marginLeftInput,
          }}
          ref={props.ref}
          maxLength={props.maxLength}
          selectTextOnFocus={props.selectTextOnFocus}
          textAlignVertical={props.textAlignVertical}
          onFocus={() => {
            onFocus();
          }}
          onBlur={props.onBlur}
          onSubmitEditing={() => {
            onSubmitEditing();
          }}
          blurOnSubmit={props.blurOnSubmit}
          multiline={props.multiline}
          autoCapitalize={props.autoCapitalize}
          placeholder={props.placeholder}
          editable={props.editable}
          placeholderTextColor={props.placeholderTextColor}
          keyboardType={props.keyboardType}
          value={props.value}
          returnKeyType={props.returnKeyType}
          onChangeText={text => {
            onChangeText(text);
          }}
        />
      </View>
      {props.rightSideimage && (
        <Image
          source={props.rightSideimage}
          style={{
            marginHorizontal: normalise(5),
            marginLeft: normalise(45),
            height: normalise(15),
            width: normalise(15),
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

TextInputComponent.propTypes = {
  marginTop: PropTypes.number,
  image: PropTypes.string,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.any,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  tagText: PropTypes.string,
  tagTextColor: PropTypes.string,
  height: PropTypes.any,
  width: PropTypes.any,
  marginLeft: PropTypes.number,
  borderWidth: PropTypes.number,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  color: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  sideimage: PropTypes.any,
  eye: PropTypes.bool,
  location: PropTypes.bool,
  onChangeLocation: PropTypes.func,
  showCardType: PropTypes.bool,
  cardType: PropTypes.string,
  returnKeyType: PropTypes.any,
  alignSelf: PropTypes.string,
  inputTextColor: PropTypes.string,
  marginBottom: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderEndWidth: PropTypes.number,
  justifyContent: PropTypes.string,
  marginLeftInput: PropTypes.number,
  alignSelfInput: PropTypes.string,
  selectTextOnFocus: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  ref: PropTypes.any,
};

TextInputComponent.defaultProps = {
  marginTop: 0,
  image: '',
  maxLength: 140,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  placeholderTextColor: Colors.darkgrey,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  onChangeLocation: null,
  color: Colors.darkgrey,
  imageHeight: normalise(12),
  imageWidth: normalise(12),
  editable: true,
  borderColor: Colors.borderColor,
  onFocus: null,
  onBlur: null,
  eye: false,
  tagText: '',
  tagTextColor: Colors.darkgrey,
  height: normalise(45),
  width: '90%',
  marginLeft: 0,
  location: false,
  borderRadius: 0,
  borderWidth: 1,
  showCardType: false,
  cardType: '',
  returnKeyType: 'route',
  alignSelf: 'center',
  inputTextColor: Colors.white,
  marginBottom: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderEndWidth: 1,
  justifyContent: 'flex-start',
  marginLeftInput: 0,
  alignSelfInput: 'flex-start',
  selectTextOnFocus: true,
  textAlignVertical: 'top',
  blurOnSubmit: false,
};
