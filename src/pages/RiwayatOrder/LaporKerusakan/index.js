import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator, BackHandler,
} from 'react-native';
import {Header, Gap, Button} from '../../../components';
import {colors, fonts} from '../../../utils';
import {DummyTake} from '../../../assets';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {RNCamera} from "react-native-camera";
import Rec from "../../../assets/icon/rec.png";

const {width, height} = Dimensions.get('window');

const LaporKerusakan = ({route}) => {
  const navigation = useNavigation();
  const [border, setBorder] = useState(colors.border);
  const [arrPic, setArrPic] = useState([]);
  const [notes, setNotes] = useState('');
  const id = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const status = route.params.status;
  const en = useSelector((state) => state.language.english);
  const [isCameraOpened, setIsCameraOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }
  }, [isCameraOpened]);

  const handleBackButtonClick = () => {
    if(isCameraOpened){
      setIsCameraOpened(false);
      return true;
    }
    return false;

  }

  const onFocusForm = () => {
    setBorder(colors.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onChangeText = (val) => {
    setNotes(val);
  };

  console.log(arrPic);

  const report = async () => {
    setIsSubmitting(true);
    let formData = new FormData();
    setIsLoading(true);
    arrPic.forEach((item, index) => {
      formData.append(`photos[${index}]`, {
        uri: item.uri,
        name: `picture[${index}]`,
        type: 'image/jpg',
      });
    });
    formData.append('notes', notes);
    console.log(formData);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/report/${id}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(res.data);
        setIsLoading(false);
        setIsSubmitting(false);
        navigation.navigate('SuksesLapor', {id: id, status: status});
      }
    } catch (error) {
      Alert.alert(
          "Error",
          error.response.data.message
      )
      console.log('error', error.response.data);
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const getImage = async () => {
    Alert.alert(
        "Upload Photo",
        "Select image source",
        [
          { text: "Cancel", onPress: () => console.log("OK Pressed") },
          {
            text: "From camera...",
            onPress: () => setIsCameraOpened(true),
          },
          {
            text: "From file...",
            onPress: () => pickSingle(false)
          },

        ]
    );
  };

  const takePicture = async function(camera) {
    if (arrPic.length < 5){
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      console.log('ini foto', data)

      const source = {uri: data.uri};
      setArrPic([...arrPic, source]);
      setIsCameraOpened(false);
    } else {
      Alert.alert('Foto maksimal hanya 5');
    }
  };

  const pickSingle = (cropit, circular = false, mediaType) => {
    if (arrPic.length < 5) {
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: cropit,
        cropperCircleOverlay: circular,
        sortOrder: 'none',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        cropperStatusBarColor: 'white',
        cropperToolbarColor: 'white',
        cropperActiveWidgetColor: 'white',
        cropperToolbarWidgetColor: '#3498DB',
      }).then((data) => {
        console.log('ini galeri', data.path)
        const source = {uri: data.path};
        setArrPic([...arrPic, source]);
      });
    } else {
      Alert.alert('Foto maksimal hanya 5');
    }
  }

  const handleDeleteFoto = (idx) => {
    Alert.alert(
      'Delete This Photo?',
      'Jika iya klik "OK"',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let arrFoto = [...arrPic];
            if (idx !== -1) {
              arrFoto.splice(idx, 1);
              setArrPic(arrFoto);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    isCameraOpened ?
      <RNCamera
        style={s.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        pauseAfterCapture={true}
      >
        {({ camera }) => {
          return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={s.capture}>
                  <Image source={Rec} style={{width: 70, height: 70, alignSelf: 'center'}} resizeMode={'contain'} />
                </TouchableOpacity>
              </View>
          );
        }}
      </RNCamera> :
      <>
        <Header
          label="Laporkan Kerusakan"
          onPress={() => navigation.goBack()}
          type="shadow"
        />
        <View style={s.page}>
          <Gap height={20} />
          <Text style={s.subTitle}>{en ? 'Upload Damage Photos' : 'Upload Foto Kerusakan'}</Text>
          <View style={s.container}>
            {arrPic.map((photo, i) => {
              return (
                <TouchableOpacity
                  style={s.imgBox}
                  key={i}
                  onPress={() => {
                    console.log('ini i: ', i);
                    handleDeleteFoto(i);
                  }}>
                  <Image source={photo} style={s.img} />
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={s.imgBox} onPress={getImage}>
              <Image source={DummyTake} style={s.img} />
            </TouchableOpacity>
          </View>
          <Gap height={20} color={'#EDEDED'} />
          <View style={s.inputArea}>
            <View style={s.txtArea(border)}>
              <TextInput
                placeholder={en ? "Write a crash report" : "Tuliskan laporan kerusakan"}
                onFocus={onFocusForm}
                onBlur={onBlurForm}
                style={s.input}
                numberOfLines={5}
                multiline={true}
                onChangeText={onChangeText}
                value={notes}
              />
            </View>
            <Gap height={15} />
            <Button name={en ? 'Send Report' : "Kirim Laporan"} onPress={report} disable={isSubmitting}/>
          </View>
        </View>
        <Modal visible={isLoading} transparent={true}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size={'large'}
              style={{flex: 1, justifyContent: 'center'}}
            />
          </View>
        </Modal>
      </>
  );
};

export default LaporKerusakan;

const s = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: width / 5,
    height: width / 5,
    borderRadius: 5,
  },
  imgBox: {
    width: width / 5,
    height: width / 5,
    marginHorizontal: width / 5 / 16,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    lineHeight: 23,
    color: colors.text.primary,
  },
  star: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    lineHeight: 18,
    color: colors.text.primary,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  inputArea: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  txtArea: (border) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingHorizontal: 12,
  }),
  input: {
    alignSelf: 'flex-start',
  },
});
