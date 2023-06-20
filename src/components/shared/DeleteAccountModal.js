import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';
import Button from '../../components/shared/Button';
import {Colors, Icons, Fonts} from '../../theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccountReq} from '../../redux/action/ProfileAction';
const DeleteConfirmationModal = props => {
  const dispatch = useDispatch();
  const deleteAccount = () => {
    setModalVisible(false);
    dispatch(deleteAccountReq());
  };
  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        style={{}}
        onBackdropPress={() => props.closeModal()}>
        <View
          style={{
            alignSelf: 'center',
            height: normalize(220),
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
              fontFamily: Fonts.DMSans_Medium,
              marginLeft: normalize(15),
              alignSelf: 'center',
            }}>
            Delete Account
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              color: Colors.black,
              fontFamily: Fonts.DMSans_Regular,

              alignSelf: 'center',
              textAlign: 'center',
              marginTop: normalize(15),
            }}>
            {
              'Are you sure you want to delete\nyour account? This is irreversible.'
            }
          </Text>
          <Button
            width={'60%'}
            height={normalize(40)}
            borderRadius={normalize(22)}
            fontSize={normalize(14)}
            marginTop={normalize(40)}
            marginBottom={normalize(15)}
            borderWidth={normalize(2.5)}
            borderColor={Colors.white}
            title={'Delete Account'}
            alignSelf={'center'}
            backgroundColor={Colors.secondaryColor}
            onPress={() => {
              deleteAccount();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

DeleteConfirmationModal.propTypes = {
  modalVisible: PropTypes.bool,
};

DeleteConfirmationModal.defaultProps = {
  modalVisible: false,
};

export default DeleteConfirmationModal;
