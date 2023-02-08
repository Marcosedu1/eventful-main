import { object, string } from "yup";

export const schema = object().shape({
  email: string()
    .email("Digite um e-mail válido")
    .required("Este campo é obrigatório"),
  password: string().required("Este campo é obrigatório"),
});
