import { addMonths, addYears } from 'date-fns';
import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Este campo é obrigatório")
    .max(100, "Titulo não pode exceder limite de 100 caracteres")
    .required("Este campo é obrigatório"),
  description: yup
    .string()
    .min(10, "Descrição deve conter pelo menos 10 caracteres")
    .max(2000, "Descrição excede o limite de caracteres")
    .required("Este campo é obrigatório"),
  cep: yup
    .string()
    .min(8, "CEP Inválido")
    .required("Este campo é obrigatório"),
  address: yup.string().required("Este campo é obrigatório"),
  number: yup.string().required("Este campo é obrigatório"),
  city: yup.string().required("Este campo é obrigatório"),
  uf: yup
    .string()
    .min(2, "Este campo é obrigatório")
    .max(2, "Ocorreu um erro inesperado")
    .required("Este campo é obrigatório"),
  datetime: yup
    .date()
    .min(
      addMonths(new Date(), 1),
      "Evento deve ser realizado a pelo menos um mes"
    )
    .max(addYears(new Date(), 1), "Evento deve ser realizado em até um ano")
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida"),
  banner: yup
    .string()
    .min(1, "Banner é obrigatório")
    .required("Banner é obrigatório"),
});