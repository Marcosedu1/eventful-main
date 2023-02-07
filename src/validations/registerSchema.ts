import { subYears } from 'date-fns';
import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "Este campo é obrigatório")
    .max(20, "Nome não pode exceder limite de 20 caracteres")
    .required("Este campo é obrigatório"),
  lastName: yup
    .string()
    .min(3, "Este campo é obrigatório")
    .max(20, "Sobrenome não pode exceder limite de 20 caracteres")
    .required("Este campo é obrigatório"),
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("Este campo é obrigatório"),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref("email"), null], "E-mail não corresponde")
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve conter pelo menos 8 caracteres")
    .max(32, "Senha excede o limite")
    .required("Este campo é obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senha não corresponde")
    .required("Este campo é obrigatório"),
  cpf: yup
    .string()
    .min(11, "CPF deve conter 11 caracteres")
    .max(11, "CPF inválido")
    .required("Este campo é obrigatório"),
  birthdate: yup
    .date()
    .min(subYears(new Date(), 100), "Digite uma data válida")
    .max(subYears(new Date(), 13), "Você deve ter pelo menos 13 anos")
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida"),
  genre: yup.string().required("Este campo é obrigatório"),
  acceptedTerms: yup.boolean().required("Termos são obrigatórios"),
});