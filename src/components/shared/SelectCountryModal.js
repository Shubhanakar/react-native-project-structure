import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import countryList from '../../utils/CountryList';
import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';
import {Colors, Icons, Fonts} from '../../theme/theme';
const SelectCountryModal = props => {
  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        style={{margin: 0}}
        onBackdropPress={() => props.closeModal()}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            height: normalize(400),
            width: '100%',
            alignSelf: 'center',
            borderRadius: normalize(20),
            position: 'absolute',
            bottom: normalize(-20),
          }}>
          <FlatList
            data={countryList}
            horizontal={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  props.selectedData(item.dial_code);
                  props.closeModal();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: normalize(3),
                    marginHorizontal: normalize(10),
                    height: normalize(30),
                    alignItems: 'center',
                    padding: normalize(5),
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      marginRight: normalize(5),
                      fontSize: normalize(15),
                      fontFamily: Fonts.DMSans_Medium,
                      color: '#CCCCCC',
                    }}>
                    {item.dial_code}
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '90%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(15),
                        fontFamily: Fonts.DMSans_Medium,
                        color: '#CCCCCC',
                        marginLeft: 10,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

SelectCountryModal.propTypes = {
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
};

SelectCountryModal.defaultProps = {
  modalVisible: false,
  closeModal: null,
};

export default SelectCountryModal;
