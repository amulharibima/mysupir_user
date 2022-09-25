const mainColors = {
  dark1: '#17273F',
  dark2: '#333333',
  blue1: '#52658D',
  grey1: '#BDBDBD',
  grey2: '#80807E',
  grey3: '#E1E1E1',
  grey4: '#959595',
  grey5: '#CFCFCF',
  grey6: '#F1F4F9',
  grey7: '#E0E0E0',
  grey8: '#6C6C6C',
  grey9: '#E9E9E9',
  grey10: '#F4F4F4',
};

export const colors = {
  primary: mainColors.dark1,
  dotInactive: mainColors.grey1,
  white: '#FFFFFF',
  black: '#000000',
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.grey8,
    tertiery: mainColors.blue1,
    grey: mainColors.grey4,
    darker: mainColors.grey2,
  },
  button: {
    primary: {
      background: mainColors.dark1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.dark1,
    },
    disable: {
      background: mainColors.grey3,
      text: mainColors.grey5,
    },
  },
  border: mainColors.grey5,
  boxotp: mainColors.grey6,
  divider: mainColors.grey7,
  divider2: mainColors.grey9,
  bgInput: mainColors.grey10,
};
