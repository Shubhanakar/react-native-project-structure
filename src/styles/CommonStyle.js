import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../theme/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommonStyles = StyleSheet.create({
  shadowAndroid: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadowIos: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  appHeadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  errorText: {
    color: Colors.DeepRed,
    fontFamily: Fonts.Regular,
    marginBottom: hp(1),
  },
  noListItem: {
    width: wp(100),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  noListItemText: {
    color: Colors.grey,
    fontFamily: Fonts.Regular,
    fontSize: wp(4),
    marginBottom: hp(2),
  },
});

export default CommonStyles;
