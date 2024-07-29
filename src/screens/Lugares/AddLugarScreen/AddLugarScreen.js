import React from "react";
import { View } from "react-native";
import { styles } from "./AddLugarScreen.styles";
import { InfoForm } from "../../../components/Lugares/AddLugar";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLugarScreen.data";

export function AddLugarScreen() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });
  return (
    <View>
      <InfoForm formik={formik} />

      <Button
        title="Crear Lugar"
        buttonStyle={styles.addLugar}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
