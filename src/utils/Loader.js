import React from 'react';
import {ActivityIndicator, SafeAreaView, Dimensions, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, Icons} from '../theme/theme';

export default function Loader(props) {
  return props.visible ? (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(61, 61, 61, 1)',
        zIndex: 10,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: false,
};
