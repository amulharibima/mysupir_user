import {fonts, colors} from '../../utils';

export default {
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  bgContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#A0A0A0',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 100,
    paddingBottom: 20,
  },

  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  userImage: {
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
  },

  userData: {
    marginVertical: 10,
  },

  userName: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.white,
    marginRight: 100
  },

  userGender: {
    textAlign: 'center',
    fontSize: 11,
    color: '#e9e9e9',
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginVertical: 15,
  },

  prof: {
    marginTop: -20,
    width: '85%',
    padding: 13,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },

  list: {
    paddingTop: 20,
  },
};
