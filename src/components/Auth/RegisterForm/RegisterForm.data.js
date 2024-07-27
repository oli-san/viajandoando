import * as Yup from "yup";

export function initialValues(){
    return{
        email: "",
        password: "",
        confirmPassword: "",

    };
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("El email no es correcto")
            .required("El email es obligatorio"),
        password: Yup.string()
            .required("La contraseña es obligatoria"),
        confirmPassword: Yup.string()
            .required("La contraseña es obligatoria")
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    })
}