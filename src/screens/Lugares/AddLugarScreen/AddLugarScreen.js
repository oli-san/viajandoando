import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./AddLugarScreen.styles";
import {
  InfoForm,
  UploadImagesForm,
  ImageLugar,
} from "../../../components/Lugares/AddLugar";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLugarScreen.data";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function AddLugarScreen() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();

        const myDb = doc(db, "lugares", newData.id);
        await setDoc(myDb, newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <KeyboardAwareScrollView>
      <ImageLugar formik={formik} />
      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />

      <Button
        title="Crear Lugar"
        buttonStyle={styles.addLugar}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}
