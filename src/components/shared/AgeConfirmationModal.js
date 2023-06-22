import React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';
import {Colors, Icons, Fonts} from '../../theme/theme';
const AgeConfirmationModal = props => {
  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        onBackdropPress={() => props.closeModal()}>
        <View
          style={{
            alignSelf: 'center',
            height: normalize(440),
            width: '85%',
            backgroundColor: Colors.white,
            borderRadius: normalize(20),
          }}>
          <TouchableOpacity onPress={() => props.closeModal()}>
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
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            {'Why do we ask for your\nage?'}
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.black,
              fontFamily: Fonts.DMSans_Regular,
              alignSelf: 'center',
              marginTop: normalize(15),
              width: '90%',
            }}>
            {
              'We recognize that age is a personal and sensitive aspect of identity, and we take privacy and confidentiality very seriously.\n\nWe ask for your date of birth solely for the purpose of ensuring that you meet the minimum age requirement to use our app, as well as to help us later tailor our content and services to your age group.\n\nThis information is used solely for these purposes and is not shared or used for any other purpose.'
            }
          </Text>

          <TouchableOpacity
            onPress={() => props.closeModal()}
            style={{
              height: normalize(30),
              width: normalize(100),
              backgroundColor: Colors.secondaryColor,
              borderRadius: normalize(50),
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: normalize(15),
              marginTop: normalize(25),
            }}>
            <Text
              style={{
                fontFamily: Fonts.DMSans_Bold,
                color: Colors.white,
                fontSize: normalize(12),
              }}>
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

AgeConfirmationModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
};

AgeConfirmationModal.defaultProps = {
  modalVisible: false,
  closeModal: null,
};

export default AgeConfirmationModal;
