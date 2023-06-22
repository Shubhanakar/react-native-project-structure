import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';
import {Colors, Icons, Fonts} from '../../theme/theme';
const AddSupplyModal = props => {
  const [supplyName, setSupplyName] = useState('');

  function createSupply() {
    props.createSupply(supplyName);
  }

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
                height: normalize(20),
                width: normalize(20),
                marginRight: normalize(18),
                marginTop: normalize(12),
                alignSelf: 'flex-end',
                tintColor: '#1D1E49',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: normalize(16),
              color: '#3E3E3E',
              fontFamily: Fonts.DMSans_Bold,
              alignSelf: 'center',
            }}>
            Add Supplies
          </Text>

          <TextInput
            borderRadius={0}
            marginTop={normalize(25)}
            width={normalize(190)}
            placeholder={'Supply Name'}
            placeholderTextColor={'#454545'}
            value={supplyName}
            borderColor={'#454545'}
            borderWidth={1}
            inputTextColor={Colors.black}
            onChangeText={data => setSupplyName(data)}
          />

          <TouchableOpacity
            onPress={() => {
              createSupply();
            }}
            style={{
              height: normalize(40),
              width: normalize(200),
              backgroundColor: Colors.secondaryColor,
              borderRadius: normalize(50),
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: normalize(35),
            }}>
            <Text
              style={{
                fontFamily: Fonts.DMSans_Bold,
                color: Colors.white,
                fontSize: normalize(16),
              }}>
              Add to Default
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

AddSupplyModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
};

AddSupplyModal.defaultProps = {
  modalVisible: false,
  closeModal: null,
};

export default AddSupplyModal;
