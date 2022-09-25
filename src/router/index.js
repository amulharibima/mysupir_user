import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {Button, View, Text, TouchableOpacity, Image} from 'react-native';

import {
  Splash,
  GetStarted,
  Wellcome,
  Daftar,
  Verification,
  Home,
  PilihLokasi,
  PilihTujuan,
  Profile,
  GantiNomor,
  VerifGantiNomor,
  Bahasa,
  Riwayat,
  About,
  Bantuan,
  CreateTrack,
  Multitrip,
  DetailPerjalanan,
  Pembayaran,
  Notifikasi,
  DetailPembayaran,
  PembayaranScreen,
  HomeTrip,
  Pembatalan,
  PilihTujuanLagi,
  BeriNilai,
  DetailFoto,
  Panic,
  PilihTujuanNanti,
  CallScreen,
  ChatScreen,
  ChooseLocation,
  DetailPanic,
} from '../pages';
import {Menu} from '../components';
import {AboutMysupir, AboutSnk, AboutKebijakan} from '../pages/AboutUs';
import {
  RiwayatOrder,
  DetailRiwayat,
  SuksesLapor,
  LaporKerusakan,
} from '../pages/RiwayatOrder';

const Profil = createStackNavigator();
const ProfileStack = () => {
  return (
    <Profil.Navigator>
      <Profil.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Profil.Screen
        name="GantiNomor"
        component={GantiNomor}
        options={{headerShown: false}}
      />
      <Profil.Screen
        name="VerifGanti"
        component={VerifGantiNomor}
        options={{headerShown: false}}
      />
      <Profil.Screen
        name="AboutMysupir"
        component={AboutMysupir}
        options={{headerShown: false}}
      />
      <Profil.Screen
        name="AboutSnk"
        component={AboutSnk}
        options={{headerShown: false}}
      />
      <Profil.Screen
        name="AboutKebijakan"
        component={AboutKebijakan}
        options={{headerShown: false}}
      />
    </Profil.Navigator>
  );
};

const Abt = createStackNavigator();
const AboutStack = () => {
  return (
    <Abt.Navigator>
      <Abt.Screen
        name="Tentang Kami"
        component={About}
        options={{headerShown: false}}
      />
      <Abt.Screen
        name="AboutMysupir"
        component={AboutMysupir}
        options={{headerShown: false}}
      />
      <Abt.Screen
        name="AboutKebijakan"
        component={AboutKebijakan}
        options={{headerShown: false}}
      />
    </Abt.Navigator>
  );
};

const History = createStackNavigator();
const HistoryStack = () => {
  return (
    <History.Navigator>
      <History.Screen
        name="Riwayat Order"
        component={Riwayat}
        options={{headerShown: false}}
      />
      <History.Screen
        name="PesananSelesai"
        component={RiwayatOrder}
        options={{headerShown: false}}
      />
      <History.Screen
        name="DetailRiwayat"
        component={DetailRiwayat}
        options={{headerShown: false}}
      />
      <History.Screen
        name="LaporKerusakan"
        component={LaporKerusakan}
        options={{headerShown: false}}
      />
      <History.Screen
        name="SuksesLapor"
        component={SuksesLapor}
        options={{headerShown: false}}
      />
    </History.Navigator>
  );
};

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Wellcome"
        component={Wellcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Daftar"
        component={Daftar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verifikasi"
        component={Verification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifikasi"
        component={Notifikasi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Lokasimu"
        component={PilihLokasi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tujuanmu"
        component={PilihTujuan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateTrack"
        component={CreateTrack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Multitrip"
        component={Multitrip}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPerjalanan"
        component={DetailPerjalanan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pembayaran"
        component={Pembayaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPembayaran"
        component={DetailPembayaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScreenPembayaran"
        component={PembayaranScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTrip"
        component={HomeTrip}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pembatalan"
        component={Pembatalan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PilihTujuanLagi"
        component={PilihTujuanLagi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BeriNilai"
        component={BeriNilai}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailFoto"
        component={DetailFoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Panic"
        component={Panic}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PilihTujuanNanti"
        component={PilihTujuanNanti}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPanic"
        component={DetailPanic}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerApp = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Menu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Router}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Ubah Bahasa"
        component={Bahasa}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Riwayat Order"
        component={HistoryStack}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Tentang Kami"
        component={AboutStack}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Bantuan"
        component={Bantuan}
        options={{swipeEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerApp;
