// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {useSelector} from 'react-redux';

// const CounterDown = () => {
//   const states = useSelector((state) => state.TripReducer);
//   console.log(states.tanggalMulai);

//   const calculateTimeLeft = () => {
//     let year = new Date().getFullYear();
//     const different = +new Date('2020-08-23') - +new Date();
//     let timeLeft = {};

//     if (different > 0) {
//       timeLeft = {
//         days: Math.floor(different / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((different / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((different / 1000 / 60) % 60),
//         seconds: Math.floor((different / 1000) % 60),
//       };
//     }
//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
//   const [year] = useState(new Date().getFullYear());

//   useEffect(() => {
//     setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);
//   }, [timeLeft]);

//   const timerComponents = [];

//   Object.keys(timeLeft).forEach((interval) => {
//     if (!timeLeft[interval]) {
//       return;
//     }
//     timerComponents.push(
//       <Text>
//         {timeLeft[interval]}
//         {interval}{' '}
//       </Text>,
//     );
//   });

//   return (
//     <View>
//       <Text> {timerComponents.length ? timerComponents : 'Times Up'} </Text>
//     </View>
//   );
// };

// export default CounterDown;

// const styles = StyleSheet.create({});

import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fonts} from '../../../utils';
import {useSelector, useDispatch} from 'react-redux';
import Gap from '../Gap';
import moment from 'moment';

const CountDownTimer = ({setTimeLeft, setIsEndedOnTime}) => {
  const states = useSelector((state) => state.TripReducer);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  // const different = +new Date(String(states.tanggalSelesai)) - +new Date();
  // const different = moment(String(states.tanggalSelesai)).diff(
  //   moment(new Date()),
  //   'millisecond',
  // );
  const different = moment(order.end_dateTime).diff(
    moment(order.start_dateTime),
    'second',
  );
  console.log('ini diff', different);

  const days = Math.floor(different / (1000 * 60 * 60 * 24));
  const hours = Math.floor((different / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((different / 1000 / 60) % 60);
  const second = Math.floor((different / 1000) % 60);
  console.log('ini days', days, hours, minute, second);

  const [day, setDay] = useState(days);
  const [hour, setHour] = useState(hours);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  useMemo(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (day === 0 && hour === 0 && minutes === 0 && seconds === 0) {
        clearInterval(myInterval);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (hour === 0) {
            clearInterval(myInterval);
            if (day === 0) {
              clearInterval(myInterval);
            } else {
              setDay(day - 1);
            }
          } else {
            setHour(hour - 1);
            setMinutes(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    if (day === 0 && hour === 0 && minutes === 15 && seconds === 0) {
      setTimeLeft(true);
    }
    if (day === 0 && hour === 0 && minutes === 0 && seconds === 0) {
      setIsEndedOnTime(true);
      dispatch({type: 'SET_STARTTIME', payload: null});
      dispatch({type: 'SET_ENDTIME', payload: null});
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds, hour, day, different]);

  const pad = (n) => {
    return n < 10 ? '0' + n : n;
  };

  return (
    <>
      <View style={s.container}>
        <Text
          style={{
            ...s.text,
            fontWeight: 'normal',
            fontSize: 10,
            paddingTop: 5,
          }}>
          Batas Waktu
        </Text>
        <Gap height={3} />
        <View style={s.boxContainer}>
          <View style={s.cntContainer}>
            <Text style={s.angka}>{day}</Text>
            <Text style={s.text}>HARI</Text>
          </View>
          <View style={s.cntContainer}>
            <Text style={s.angka}>{pad(hour)}</Text>
            <Text style={s.text}>JAM</Text>
          </View>
          <View style={s.cntContainer}>
            <Text style={s.angka}>{pad(minutes)}</Text>
            <Text style={s.text}>MENIT</Text>
          </View>
          <View style={s.cntContainer}>
            <Text style={s.angka}>{pad(seconds)}</Text>
            <Text style={s.text}>DETIK</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CountDownTimer;

const s = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    top: 70,
    borderRadius: 6.5,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 8,
  },
  boxContainer: {
    flexDirection: 'row',
  },
  angka: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    lineHeight: 22,
    textAlign: 'center',
    color: '#17273F',
  },
  text: {
    fontSize: 5,
    lineHeight: 6,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    color: '#17273F',
    fontWeight: 'bold',
  },
  cntContainer: {
    backgroundColor: '#F1F4F9',
    marginHorizontal: 4,
    height: 34,
    width: 32.5,
    borderRadius: 5.5,
    paddingTop: 3,
  },
});
