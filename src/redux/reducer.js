import {combineReducers} from 'redux';
import {ILNullPhoto} from '../assets';

const initialStateTrip = {
  isLogin: false,
  perjalanan: 'onetrip',
  based: 'onTrip',
  time: 'sekarang',
  start: {
    desc: '',
    coord: [],
  },
  trip1: {
    desc: '',
    coord: [],
  },
  trip2: {
    desc: '',
    coord: null,
  },
  finish: {
    desc: '',
    coord: [],
  },
  notes: '',
  tanggalMulai: null,
  jamMulai: null,
  tanggalSelesai: null,
  jamSelesai: null,
  carType: 1,
  user: {
    name: '',
    email: '',
    phone_number: '',
    foto: ILNullPhoto,
  },
  isOngoing: false,
  totPrice: 0,
  user_id: null,
  username: null,
  user_pict: ILNullPhoto,
};

const TripReducer = (state = initialStateTrip, action) => {
  switch (action.type) {
    case 'MULTITRIP':
      return {
        ...state,
        perjalanan: 'multitrip',
      };
    case 'ONETRIP':
      return {
        ...state,
        perjalanan: 'onetrip',
      };
    case 'SET_START':
      return {
        ...state,
        start: {...action.payload},
      };
    case 'SET_TRIP1':
      return {
        ...state,
        trip1: {...action.payload},
      };
    case 'SET_TRIP2':
      return {
        ...state,
        trip2: {...action.payload},
      };
    case 'SET_FINISH': {
      return {
        ...state,
        finish: {...action.payload},
      };
    }
    case 'SET_TIME':
      return {
        ...state,
        time: action.payload,
      };
    case 'SET_BASED':
      return {
        ...state,
        based: action.payload,
      };
    case 'SET_STARTDATE':
      return {
        ...state,
        tanggalMulai: action.payload,
      };
    case 'SET_STARTTIME':
      return {
        ...state,
        jamMulai: action.payload,
      };
    case 'SET_ENDDATE':
      return {
        ...state,
        tanggalSelesai: action.payload,
      };
    case 'SET_ENDTIME':
      return {
        ...state,
        jamSelesai: action.payload,
      };
    case 'SET_MOBIL':
      return {
        ...state,
        carType: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: {...action.payload},
        username: action.username,
        user_pict: action.user_pict,
      };
    case 'SET_USER_PICT':
      return {
        ...state,
        user_pict: action.user_pict,
      };
    case 'SET_ONGOING':
      return {
        ...state,
        isOngoing: action.payload,
      };
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.notes,
      };
    case 'SET_PRICE':
      return {
        ...state,
        totPrice: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        start: '',
        trip1: '',
        trip2: '',
        tanggalMulai: null,
        jamMulai: null,
        tanggalSelesai: null,
        jamSelesai: null,
      };
    case 'ID':
      return {
        ...state,
        user_id: action.user_id,
      };
    case 'SET_PICTURE':
      return {
        ...state,
        user: {
          ...state.user,
          foto: action.foto,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  order_id: null,
  driver_id: null,
  driver_name: null,
  car_type: null,
  identifier_id: null,
  notes: null,
  total_distance: null,
  payment_status: null,
  price: null,
  start_lat: null,
  start_long: null,
  driver_pict: null,
  driver_phone: null,
  conver_id: null,
  end_lat: null,
  eng_long: null,
  start_loc: null,
  end_loc: null,
  order_trip: false,
  order_type: null,
  order_time: false,
  start_dateTime: null,
  end_dateTime: null,
  later_datetime: null,
  later_order: null,
  later: false,
  trip: null,
  done: false,
  chat_id: null,
  rating: null,
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDER':
      return {
        ...state,
        order_id: action.order_id,
        start_dateTime: action.start_dateTime,
        end_dateTime: action.end_dateTime,
        driver_id: action.driver_id,
        driver_name: action.driver_name,
        car_type: action.car_type,
        identifier_id: action.identifier_id,
        notes: action.notes,
        total_distance: action.total_distance,
        payment_status: action.payment_status,
        price: action.price,
        start_lat: action.start_lat,
        start_long: action.start_long,
        start_loc: action.start_loc,
        end_lat: action.end_lat,
        end_long: action.end_long,
        end_loc: action.end_loc,
        driver_pict: action.driver_pict,
        driver_phone: action.driver_phone,
        order_type: action.order_type,
        later_datetime: action.later_datetime,
        chat_id: action.chat_id,
        rating: action.rating,
      };
    default:
      return state;
  }
};

const initialLanguage = {
  english: false,
};

const LanguageReducer = (state = initialLanguage, action) => {
  switch (action.type) {
    case 'ENGLISH':
      return {
        ...state,
        english: true,
      };
    case 'INDONESIA':
      return {
        ...state,
        english: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  TripReducer,
  order: OrderReducer,
  language: LanguageReducer,
});

export default reducer;
