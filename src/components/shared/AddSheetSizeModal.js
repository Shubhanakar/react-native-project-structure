import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import normalize from '../../utils/Dimen';
import {Colors, Icons, Fonts} from '../../theme/theme';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import showErrorAlert from '../../utils/Toast';
const AddSheetSizeModal = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [lenght, setLenght] = useState(45);
  const [sqFeet, setSqFeet] = useState(10);

  const JobReducer = useSelector(state => state.JobReducer);

  {
    /* useEffect to get sheet types from JobReducer.shteeType reducer */
  }
  useEffect(() => {
    if (JobReducer?.shteeType?.sheet_types?.length > 0) {
      setItems(JobReducer?.shteeType?.sheet_types);
    }
  }, [JobReducer?.shteeType?.sheet_types]);

  function createSheetSize() {
    if (props.createSheetSize) {
      let obj = {
        selectedValue: value,
        title: title,
        sqFeet: parseInt(sqFeet),
        lenght: parseFloat(lenght),
      };
      props.createSheetSize(obj);
    }
  }
  {
    /* fun to calculate sq feet for create sheet  */
  }
  const sqCalculateArea = data => {
    setLenght(data);

    if (!data) {
      setSqFeet('');
    }

    if (!value) {
      showErrorAlert('Please select a type first');
    } else if (value) {
      if (value == 'DryWallSheets' && data) {
        let sqCalculate = parseInt(data) * 4;

        setSqFeet(sqCalculate.toString());
      } else if (value === 'FiftyFourInchSheets' && data) {
        let sqCalculate = parseInt(data) * 4.5;

        setSqFeet(sqCalculate.toString());
      }
    }
  };

  {
    /* fun for calculate sq ft depend on dropdown value change */
  }

  const calculateSqFtWithSelectedType = data => {
    if (data == 'OtherSheets') {
      setOtherSize(''), setDefaultSize('');
    } else if (data == 'DryWallSheets' && defaultSize) {
      let sqCalculate = parseInt(defaultSize) * 4;

      setOtherSize(sqCalculate.toString());
    } else if (data == 'FiftyFourInchSheets' && defaultSize) {
      let sqCalculate = parseInt(defaultSize) * 4.5;
      setOtherSize(sqCalculate.toString());
    }
  };

  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        onBackdropPress={() => {
          props.closeModal();
        }}>
        <View
          style={{
            alignSelf: 'center',
            height: normalize(value !== 'OtherSheets' ? 390 : 300),
            width: '87%',
            backgroundColor: Colors.white,
            borderRadius: normalize(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              props.closeModal(), setLenght('');
              setSqFeet('');
              setValue('');
            }}>
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
            Add Size
          </Text>
          <TextInput
            borderRadius={0}
            height={normalize(40)}
            marginTop={normalize(15)}
            placeholder={'Title'}
            placeholderTextColor={'#454545'}
            value={title}
            borderColor={'#454545'}
            alignSelf={'center'}
            borderWidth={1}
            style={{
              color: Colors.black,
            }}
            inputTextColor={Colors.black}
            width={'70%'}
            onChangeText={data => setTitle(data)}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            schema={{
              label: 'title',
              value: 'id',
            }}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Type"
            dropDownDirection="BOTTOM"
            bottomOffset={100}
            style={{
              borderRadius: 0,
            }}
            containerStyle={{
              width: '70%',
              marginTop: 20,
              alignSelf: 'center',
            }}
            dropDownContainerStyle={{
              backgroundColor: Colors.white,
            }}
          />

          {value !== 'OtherSheets' && (
            <View style={{flexDirection: 'row', zIndex: -1}}>
              <TextInput
                borderRadius={0}
                height={normalize(40)}
                marginTop={normalize(25)}
                placeholder={'# #'}
                placeholderTextColor={'#454545'}
                value={lenght}
                style={{
                  color: Colors.black,
                }}
                borderColor={'#454545'}
                borderWidth={1}
                inputTextColor={Colors.black}
                keyboardType={'numeric'}
                width={'40%'}
                marginLeft={normalize(38)}
                onChangeText={data => {
                  sqCalculateArea(data);
                }}
              />
              <Text
                style={{
                  fontSize: normalize(14),
                  color: Colors.black,
                  fontFamily: Fonts.DMSans_Regular,
                  marginLeft: normalize(20),
                  alignSelf: 'center',
                  marginTop: normalize(20),
                }}>
                Feet
              </Text>
            </View>
          )}

          <View style={{zIndex: -1}}>
            {value !== 'OtherSheets' ? (
              <View
                style={{
                  height: normalize(40),
                  width: '70%',
                  borderWidth: 1,
                  borderColor: Colors.black,
                  alignSelf: 'center',
                  marginTop: normalize(20),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    marginLeft: normalize(10),
                  }}>
                  {sqFeet !== '' ? sqFeet : 'Sq ft per sheet...'}
                </Text>
              </View>
            ) : (
              <TextInput
                borderRadius={0}
                height={normalize(40)}
                marginTop={normalize(15)}
                placeholder={'Sq ft per sheet...'}
                placeholderTextColor={'#454545'}
                value={sqFeet}
                style={{
                  color: Colors.black,
                }}
                alignSelf={'center'}
                borderColor={'#454545'}
                borderWidth={1}
                keyboardType={'numeric'}
                inputTextColor={Colors.black}
                width={'70%'}
                onChangeText={data => setSqFeet(parseInt(data))}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              createSheetSize();
            }}
            style={{
              height: normalize(40),
              width: normalize(180),
              backgroundColor: Colors.secondaryColor,
              borderRadius: normalize(50),
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginLeft: normalize(15),
              marginTop: normalize(25),
              position: 'absolute',
              bottom: 20,
              zIndex: -1,
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

AddSheetSizeModal.propTypes = {
  dataList: PropTypes.array,
  onSelectData: PropTypes.func,
  modalVisible: PropTypes.bool,
  onChangeText: PropTypes.func,
  value: PropTypes.any,
};

AddSheetSizeModal.defaultProps = {
  dataList: [],
  onSelectData: null,
  modalVisible: false,
  onChangeText: null,
  value: null,
};

export default AddSheetSizeModal;
