import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("Este campo es obligatoria"),
    newPassword: Yup.string().required("Este campo es obligatoria"),
    confirmNewPassword: Yup.string()
      .required("Este campo es obligatoria")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las nuevas contraseñas tienen que ser iguales"
      ),
  });
}
