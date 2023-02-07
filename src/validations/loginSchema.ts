import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Este campo é obrigatório"),
  password: yup.string().required("Este campo é obrigatório"),
});
