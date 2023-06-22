import React from 'react';
import {Text, FlatList, View} from 'react-native';
import {Colors, Fonts} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';

export default function JobSummaryComponent(props) {
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}>
      {props?.data?.regular && props?.data?.regular?.length > 0 && (
        <View>
          <Text
            style={{
              marginTop: normalize(15),
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.white,
              marginLeft: normalize(10),
            }}>
            Drywall Sheets
          </Text>
          <FlatList
            data={props?.data?.regular}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  height: normalize(40),
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginTop: normalize(10),
                    marginLeft: normalize(10),
                    width: normalize(50),
                  }}>
                  {item.sheetTitle}
                </Text>
                <View
                  style={{
                    height: normalize(30),
                    width: normalize(0),
                    backgroundColor: 'white',
                    borderColor: Colors.white,
                    borderWidth: 1,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginLeft: normalize(50),
                  }}>
                  {item.quantity} sheets
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      )}

      {props?.data?.fiftyFourInch && props?.data?.fiftyFourInch?.length > 0 && (
        <View>
          <Text
            style={{
              marginTop: normalize(15),
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.white,
              marginLeft: normalize(15),
            }}>
            54 Inch Sheets
          </Text>
          <FlatList
            data={props?.data?.fiftyFourInch}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  height: normalize(40),
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginTop: normalize(10),
                    marginLeft: normalize(10),
                    width: normalize(50),
                  }}>
                  {item.sheetTitle}
                </Text>
                <View
                  style={{
                    height: normalize(30),
                    width: normalize(0),
                    backgroundColor: 'white',
                    borderColor: Colors.white,
                    borderWidth: 1,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginLeft: normalize(50),
                  }}>
                  {item.quantity} sheets
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      )}

      {props?.data?.other && props?.data?.other?.length > 0 && (
        <View>
          <Text
            style={{
              marginTop: normalize(15),
              fontSize: normalize(14),
              fontFamily: Fonts.DMSans_Regular,
              color: Colors.white,
              marginLeft: normalize(15),
            }}>
            Other Sheets
          </Text>
          <FlatList
            data={props?.data?.other}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  height: normalize(40),
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: normalize(15),
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginTop: normalize(10),
                    marginLeft: normalize(10),
                    width: normalize(50),
                  }}>
                  {item.sheetTitle}
                </Text>
                <View
                  style={{
                    height: normalize(30),
                    width: normalize(0),
                    backgroundColor: 'white',
                    borderColor: Colors.white,
                    borderWidth: 1,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: normalize(14),
                    fontFamily: Fonts.DMSans_Regular,
                    color: Colors.white,
                    marginLeft: normalize(50),
                  }}>
                  {item.quantity} sheets
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      )}
    </View>
  );
}

JobSummaryComponent.propTypes = {
  data: PropTypes.array,
};

JobSummaryComponent.defaultProps = {
  data: [],
};
