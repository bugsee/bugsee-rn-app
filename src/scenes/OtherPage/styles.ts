import theme from '@theme';
import { palette } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: 15,
  },
  mainText: {
    fontSize: 14,
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    paddingVertical: 10,
  },
  listItemContainer: {
    marginBottom: 12,
  },
  listItemTitle: {
    fontSize: 14,
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    paddingVertical: 5,
  },
  listItemSubtitle: {
    fontSize: 10,
    color: palette.CLOUDS,
    fontFamily: fonts.regular,
    opacity: 0.7
  },
  languangeContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 8,
  },
  buttonText: {
    fontFamily: fonts.regular,
  },
});

export default styles;