import * as Yup from "yup";
export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    phone: Yup.string().optional(),
    email: Yup.string().email("no es un email valido").optional(),
    description: Yup.string().required("Campo obligatorio"),
    location: Yup.object().required("la localización es requerida"),
    images: Yup.array().min(1, "Se requiere al menos una imagen").required("La imagen es requerida"),
  });
}
