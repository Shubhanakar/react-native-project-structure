import React, {useRef, useEffect} from 'react';
import {Text, Image, TouchableOpacity, FlatList, View} from 'react-native';
import {Colors, Fonts, Icons} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';
import {Swipeable} from 'react-native-gesture-handler';

export default function JobCardComponent(props) {
  const swipeableRef = useRef();
  function onRefreshList() {
    if (props.onRefreshList) {
      props.onRefreshList();
    }
  }
  function onPress(item) {
    if (props.onPress) {
      props.onPress(item);
    }
  }
  function onDelete(item) {
    if (props.onPress) {
      props.onDelete(item);
    }
  }

  const rightAction = data => {
    return (
      <TouchableOpacity
        onPress={() => onDelete(data)}
        style={{
          height: '100%',
          width: normalize(80),
          justifyContent: 'center',
          backgroundColor: '#E2E8F3',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: normalize(12),
            fontFamily: Fonts.DMSans_Regular,
            color: '#000000',
          }}>
          Delete
        </Text>
      </TouchableOpacity>
    );
  };

  return props.data && props.data.length > 0 ? (
    <View
      style={{
        height: '100%',
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20,
      }}>
      <FlatList
        data={props.data}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        onRefresh={() => onRefreshList()}
        refreshing={props.refreshing}
        renderItem={({item, index}) => (
          <Swipeable
            renderRightActions={() => rightAction(item)}
            ref={swipeableRef}>
            <TouchableOpacity
              onPress={() => {
                onPress(item);
              }}
              style={{
                width: '100%',
                height: normalize(50),
                marginTop: normalize(15),
                borderColor: '#F3F3F3',
                alignSelf: 'center',
                borderBottomWidth: normalize(1),
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: Fonts.DMSans_Medium,
                      color: '#F3F3F3',
                      fontSize: normalize(15),
                      width: normalize(90),
                    }}>
                    {item.jobName}
                  </Text>
                  <View
                    style={{
                      height: 18,
                      backgroundColor: Colors.white,
                      width: 1,
                      marginLeft: 15,
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: Fonts.DMSans_Medium,
                      color: '#F3F3F3',
                      fontSize: normalize(15),
                      marginLeft: 15,
                      width: normalize(160),
                    }}>
                    {item.contractorName}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: Fonts.DMSans_Regular,
                    color: '#F3F3F3',
                    fontSize: normalize(13),
                    marginTop: 5,
                    width: '100%',
                  }}>
                  {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  ) : (
    <View
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        height: normalize(100),
        width: normalize(150),
        marginTop: normalize(20),
      }}>
      <Text
        style={{
          fontSize: normalize(16),
          color: Colors.black,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {'You have not created any jobs yet.\nTap the plus to get started.'}
      </Text>
    </View>
  );
}

JobCardComponent.propTypes = {
  data: PropTypes.array,
  refreshing: PropTypes.bool,
};

JobCardComponent.defaultProps = {
  data: [],
  refreshing: false,
};
