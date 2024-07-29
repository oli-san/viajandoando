import { Alert, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { Icon, Avatar, Text } from "react-native-elements";
import { styles } from "./UploadImagesForm.styles";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../../Shared";
import { map, filter } from "lodash";

export function UploadImagesForm(props) {
    const {formik} = props;
    const [isLoading, setIsLoading] = useState(false)

    const openGallery = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled){
        setIsLoading(true);
        uploadImage(result.assets[0].uri);
      }
    };

    const uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, `lugares/${uuid()}`);

      uploadBytes(storageRef, blob).then((snapshot) => {
        updatePhotosLugares(snapshot.metadata.fullPath);
      });
    };

    const updatePhotosLugares = async (imagePath) => {
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);

      const imageUrl = await getDownloadURL(imageRef);
      
      formik.setFieldValue("images", [...formik.values.images, imageUrl]);
      setIsLoading(false);
    };

    const removeImage = (img) => {
      Alert.alert(
          "Eliminar imagen",
          "¿Estás seguro de eliminar esta imagen?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Eliminar",
              onPress: ()=>{
                const result = filter(formik.values.images, (image) => image !==img);
                formik.setFieldValue("images", result);
              },
            },
          ],
          {cancelable: false}
      );
    };

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false} >
        <Icon type='material-community' name='camera' color="#a7a7a7" containerStyle={styles.containerIcon} onPress={openGallery} />

        {map(formik.values.images, (image) =>(
          <Avatar key={image} source={{uri: image}} containerStyle={styles.imageStyle} onPress={() => removeImage(image)} />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>

      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  )
}