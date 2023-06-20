import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import normalize from '../../utils/Dimen';
import {icons, Colors, Fonts} from '../../theme/theme';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementCounter,
  incrementCounter,
  updateSupplyData,
} from '../../redux/action/JobAction';

export default function AddSupplyComponent({index, title, quantity}) {
  const [open, setOpen] = useState(false);
  const [filteredSupplies, setFilteredSupplies] = useState(supplies || []);
  const [searchInput, setSearchInput] = useState(title);
  const dispatch = useDispatch();

  const AddSupplyReducer = useSelector(state => state.AddSupplyReducer);
  const supplies = useSelector(
    state => state.JobReducer?.supplierList?.supplies,
  );

  const sendDataToParent = (supplyId, title) => {
    const payload = {supplyId, title, quantity};
    dispatch(updateSupplyData({payload, index}));
    setSearchInput(title);
  };

  const searchFilterFunction = text => {
    setSearchInput(text);
    if (!text !== '') {
      setOpen(true);
      const newData = supplies.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredSupplies(newData);
    } else {
      setOpen(false);
      setFilteredSupplies(supplies);
      const payload = {supplyId: '', title: '', quantity};
      dispatch(updateSupplyData({payload, index}));
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(10),
          width: '82%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: normalize(40),
            borderRadius: normalize(5),
            borderWidth: normalize(1),
            borderColor: '#CCCCCC',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            value={searchInput}
            placeholder="Supply Name"
            placeholderTextColor={'#CCCCCC'}
            style={{
              color: Colors.white,
            }}
          />
          {/* <TextInputComponent
        height={46}
        width={'44%'}
        alignSelf={'center'}
        placeholder={'Supply Name'}
        placeholderTextColor={'#CCCCCC'}
        borderWidth={0}
        borderEndWidth={0}
        value={supplyName}
        onChangeText={data => onChangeText(data)}
      /> */}

          {/* <View
      style={{
        height: '100%',
        width: normalize(80),
        justifyContent: 'center',
      }}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          color: '#CCCCCC',
        }}>
        {item?.title || item?.supplyTitle}
      </Text>
    </View> */}

          <TouchableOpacity
            disabled={quantity <= 0}
            onPress={() => {
              dispatch(decrementCounter(index));
            }}
            style={{
              height: '100%',
              width: normalize(50),
              backgroundColor: '#E2E8F3',
              borderTopLeftRadius: normalize(4),
              borderBottomLeftRadius: normalize(4),
              color: Colors.black,
            }}>
            <Text
              style={{
                marginTop: normalize(2),
                fontSize: normalize(24),
                fontFamily: Fonts.DMSans_Bold,
                alignSelf: 'center',
                color: Colors.black,
              }}>
              -
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: '100%',
              width: normalize(45),
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                color: '#CCCCCC',
              }}>
              {quantity}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(incrementCounter(index));
            }}
            style={{
              height: '100%',
              width: normalize(50),
              backgroundColor: '#E2E8F3',
              borderTopRightRadius: normalize(4),
              borderBottomRightRadius: normalize(4),
              marginLeft: 1,
              alignSelf: 'flex-end',
            }}>
            <Text
              style={{
                marginTop: normalize(2),
                fontSize: normalize(24),
                fontFamily: Fonts.DMSans_Bold,
                alignSelf: 'center',
                color: Colors.black,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {open && filteredSupplies.length > 0 && (
        <View
          style={{
            width: '84%',
            maxHeight: normalize(100),
            alignSelf: 'center',
            borderColor: '#CCCCCC',
            borderWidth: 1,
            backgroundColor: '#1B2D37',
            borderTopLeftRadius: normalize(5),
            borderTopRightRadius: normalize(5),
          }}>
          <ScrollView>
            {filteredSupplies.map(item => (
              <TouchableOpacity
                key={item.supplyId}
                onPress={() => {
                  setOpen(false);
                  sendDataToParent(item.supplyId, item.title);
                }}
                style={{
                  height: normalize(35),
                  width: '100%',
                  borderBottomWidth: 1,
                  borderColor: '#CCCCCC',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#CCCCCC', marginLeft: normalize(20)}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
AddSupplyComponent.propTypes = {
  marginTop: PropTypes.number,
};

AddSupplyComponent.defaultProps = {
  marginTop: 0,
};
