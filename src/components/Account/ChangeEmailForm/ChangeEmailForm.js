import { View } from 'react-native';
import React, {useState} from 'react';
import { styles } from "./ChangeEmailForm.styles";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from "firebase/auth";
import Toast from 'react-native-toast-message';

export function ChangeEmailForm(props) {
  const {onClose, onReload} = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue)=>{
        try {
            const currentUser = getAuth().currentUser;
            const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password);
            reauthenticateWithCredential(currentUser, credentials);
            await updateEmail(currentUser, formValue.email);
            await sendEmailVerification(currentUser);
            Toast.show({
              type: "success",
              position: "bottom",
              text1: "Verificación enviada",
              text2: "Por favor, verifica tu nuevo correo electrónico.",
          });

            onReload();
            onClose();
        } catch (error) {
          console.log(error);
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Error al cambiar el email",
            });
        }
    },
});
  return (
    <View style={styles.content} >
      <Input placeholder='Nuevo email' containerStyle={styles.input} rightIcon={{type: "material-community", name: "at", color: "#c2c2c2"}} onChangeText={(text)=>formik.setFieldValue("email", text)} errorMessage={formik.errors.email} />
      <Input placeholder='contraseña' containerStyle={styles.input} secureTextEntry={showPassword ? false : true} rightIcon={{type: "material-community", name: showPassword ? "eye-off" : "eye-outline", color: "#c2c2c2", onPress: onShowPassword,}} onChangeText={(text)=>formik.setFieldValue("password", text)} errorMessage={formik.errors.password} />
      <Button title="Cambiar email" containerStyle={styles.btnContainer} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
    </View>
  )
}