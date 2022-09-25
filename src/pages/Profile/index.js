import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import {Header, ProfileList} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary, launchCamera} from "react-native-image-picker";
import API from '../../api';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera';
import Rec from '../../assets/icon/rec.png';

const Profile = ({navigation}) => {
  const cameraRef = useRef(null);
  const [userDatas, setUserDatas] = useState({
    phone_number: '',
    name: '',
    email: '',
    foto: '',
  });
  const en = useSelector((state) => state.language.english);

  const profile = useSelector((state) => state.TripReducer.user);

  useEffect(() => {
    setName(profile.name);
  }, []);

  console.log(profile);

  const [state, setState] = useState({
    name: '',
    email: '',
  });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpened, setIsCameraOpened] = useState(false);

  const [fotoDB, setFotoDB] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // getUser();
    // const getUser = () => {
    //   axios
    //     .get('http://mysupir.com/api/user/', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       console.log('res', res.data.user);
    //       setUserDatas(res.data.user);
    //       storeData('user', res.data.user);
    //     })
    //     .catch((e) => console.log(e));
    // };
    getData('user').then((res) => {
      const data = res;
      setUserDatas(data);
    });
    getData('token').then((res) => {
      const data = res;
      setToken(data);
    });
  }, []);

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

  const [txtEdit, setTxtEdit] = useState(false);

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    cameraType: 'front',
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

  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then((data) => SimpanFoto(data));
  }

  const pickSingle = (cropit, circular = false, mediaType) => {
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
    }).then((data) => SimpanFoto(data, 'file'));
  }

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    SimpanFoto(data.uri);
    setIsCameraOpened(false);
//    console.log(data.uri);
  };

  const SimpanFoto = async (foto, type = 'takePhoto') => {
    const formData = new FormData();

    if(type === 'takePhoto'){
      setFotoDB(foto);
      formData.append('foto', {
        name: 'ghostImage',
        type: 'image/jpg',
        uri: foto,
      });
      dispatch({type: 'SET_USER_PICT', user_pict: foto});
    }
    else {
      setFotoDB(foto.path);
      formData.append('foto', {
        name: 'ghostImage',
        type: foto.mime,
        uri: foto.path,
      });
      dispatch({type: 'SET_USER_PICT', user_pict: foto.path});
    }

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token)
      const res = await Axios.post(
        'http://mysupir.com/api/user/update/foto',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res !== null) {
        console.log(res.data);
      }
    } catch (error) {
      console.log('error foto', error);
    }

  };

  const btnEdit = () => {
    setTxtEdit(true);
    if (txtEdit) {
      update();
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    let formData = new FormData();
    if (email !== '') {
      formData.append('email', email);
    } else {
      formData.append('email', profile.email);
    }
    if (name !== '') {
      formData.append('name', name);
    } else {
      formData.append('name', profile.name);
    }
    try {
      const tokens = await AsyncStorage.getItem('token');
      const res = await Axios.put(
        'http://mysupir.com/api/user/update',
        {
          name: name !== '' ? name : profile.name,
          email: email !== '' ? email : profile.email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + tokens,
          },
        },
      );
      if (res) {
        console.log(res.data);
        dispatch({
          type: 'SET_USER',
          payload: {
            name: name !== '' ? name : profile.name,
            email: email !== '' ? email : profile.email,
            foto: fotoDB !== '' ? fotoDB : profile.foto,
            phone_number: profile.phone_number,
          },
          username: name !== '' ? name : profile.name,
          user_pict: fotoDB !== '' ? fotoDB : profile.foto
        });
        setTxtEdit(false);
        setIsLoading(false);
        alert('Ganti Profile Berhasil');
      }
    } catch (error) {
      console.log(error, 'error');
      setTxtEdit(false);
      setIsLoading(false);
    }
  };

  const updatePhoto = async () => {
    let data = new FormData();
    data.append('foto', {
      uri: fotoDB.path,
      type: 'image/png',
      name: fotoDB.fileName,
    });
    // data.append('foto', userDatas.foto);

    console.log(`Bearer ${token}`);
    axios
      .post('http://mysupir.com/api/user/update/foto', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((json) => console.log('respon update Photo', json))
      .catch((e) => console.log('error update Photo', e));
  };

  const update = () => {
    if (name !== '' || email !== '') {
      updateProfile();
    } else {
      setTxtEdit(false);
    }
  };

  return (
      isCameraOpened ?
          <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              pauseAfterCapture={true}
          >
            {({ camera }) => {
              return (
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                      <Image source={Rec} style={{width: 70, height: 70, alignSelf: 'center'}} resizeMode={'contain'} />
                    </TouchableOpacity>
                  </View>
              );
            }}
          </RNCamera> :
          <>
            <Header
              label="Profile"
              type="shadow"
              edit={txtEdit ? 'Selesai' : 'Edit'}
              btnEdit={btnEdit}
              onPress={() => {
                navigation.goBack();
                setTxtEdit(false);
              }}
            />

            <Modal visible={isLoading}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={'#000'} />
              </View>
            </Modal>

            <View style={styles.page}>
              <ScrollView>
                <TouchableOpacity style={styles.imgContainer} onPress={() => txtEdit && getImage()}>
                  <View style={styles.img}>
                    <Image
                      source={fotoDB !== '' ? {uri: fotoDB} : {uri: profile.foto}}
                      style={styles.img}
                    />
                  </View>
                  <TouchableOpacity onPress={() => txtEdit && getImage()}>
                    <Text style={styles.change}>{en ? 'Change Picture' : 'Ganti Foto'}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.list}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.txtLabel}>{en ? 'Name' : 'Nama'}</Text>
                      <TextInput
                        style={styles.txtDesc}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        editable={txtEdit}
                      />
                    </View>
                  </View>
                </View>
                <ProfileList
                  label="Nomor Handphone"
                  name={`0${profile.phone_number}`}
                  ubah
                  onPress={() => navigation.navigate('GantiNomor')}
                />
                <View style={styles.list}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.txtLabel}>Email</Text>
                      <TextInput
                        style={styles.txtDesc}
                        placeholder={profile.email}
                        // defaultValue={profile.email}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        editable={txtEdit}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
  );
};

export default Profile;

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  img: {
    width: 92,
    height: 92,
    borderRadius: 92 / 2,
  },
  change: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F6',
    paddingVertical: 10,
  },
  txtLabel: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
  },
  txtDesc: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
