import React from 'react';
import {Text, TouchableOpacity, FlatList, View} from 'react-native';
import {Colors, Fonts} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';

export default function FiftyFourInchSheetList(props) {
  function onPress(incrementData, itemIndex, actionType) {
    if (props.onPress) {
      props.onPress(incrementData, itemIndex, actionType);
    }
  }

  return (
    <FlatList
      data={props.dryWall54InchSheets}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      renderItem={({item, index}) => (
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(10),
            alignSelf: 'center',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.white,
              alignSelf: 'center',
              width: normalize(60),
            }}>
            {item?.title || item?.sheetTitle}
          </Text>

          <View
            style={{
              height: normalize(40),
              borderRadius: normalize(10),
              borderWidth: normalize(1),
              borderColor: '#CCCCCC',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              disabled={item.quantity === 0}
              onPress={() => onPress(1, index, 'delete')}
              style={{
                height: '100%',
                width: normalize(55),
                backgroundColor: '#E2E8F3',
                justifyContent: 'center',
                borderTopLeftRadius: normalize(8),
                borderBottomLeftRadius: normalize(8),
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
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
                width: normalize(80),
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  color: '#CCCCCC',
                }}>
                {item.quantity}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onPress(1, index, 'add')}
              style={{
                height: '100%',
                width: normalize(55),
                backgroundColor: '#E2E8F3',
                borderTopRightRadius: normalize(8),
                borderBottomRightRadius: normalize(8),
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
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
      )}
      keyExtractor={(item, index) => {
        return item.sheetId;
      }}
    />
  );
}

FiftyFourInchSheetList.propTypes = {
  dryWall54InchSheets: PropTypes.array,
};

FiftyFourInchSheetList.defaultProps = {
  dryWall54InchSheets: [],
};
