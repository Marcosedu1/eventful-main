import { subYears } from "date-fns";
import {
  addMethod,
  boolean,
  date,
  object,
  ref,
  string,
  StringSchema
} from "yup";
import { validateCpf } from "../utils/validateCpf";

addMethod<StringSchema>(string, "cpf", function (message) {
  return this.test("test-cpf-valid", message, function (value) {
    const { path, createError } = this;
    return validateCpf(value) || createError({ path, message });
  });
});

export const schema = object().shape({
  firstName: string()
    .min(3, "Este campo é obrigatório")
    .max(20, "Nome não pode exceder limite de 20 caracteres")
    .required("Este campo é obrigatório"),
  lastName: string()
    .min(3, "Este campo é obrigatório")
    .max(20, "Sobrenome não pode exceder limite de 20 caracteres")
    .required("Este campo é obrigatório"),
  email: string()
    .email("Digite um e-mail válido")
    .required("Este campo é obrigatório"),
  confirmEmail: string()
    .oneOf([ref("email"), null], "E-mail não corresponde")
    .required("Este campo é obrigatório"),
  password: string()
    .min(8, "Senha deve conter pelo menos 8 caracteres")
    .max(32, "Senha excede o limite")
    .required("Este campo é obrigatório"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Senha não corresponde")
    .required("Este campo é obrigatório"),
  cpf: string()
    .min(11, "CPF deve conter 11 caracteres")
    .max(11, "CPF inválido")
    .cpf("CPF Inválido")
    .required("Este campo é obrigatório"),
  birthdate: date()
    .min(subYears(new Date(), 100), "Digite uma data válida")
    .max(subYears(new Date(), 13), "Você deve ter pelo menos 13 anos")
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida"),
  genre: string().required("Este campo é obrigatório"),
  acceptedTerms: boolean().required("Termos são obrigatórios"),
});

declare module "yup" {
  interface StringSchema {
    cpf(messageError: string): StringSchema;
  }
}
