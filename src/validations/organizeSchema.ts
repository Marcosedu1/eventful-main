import { addMonths, addYears } from "date-fns";
import { object, string, date } from "yup";

export const schema = object().shape({
  title: string()
    .min(5, "Este campo é obrigatório")
    .max(100, "Titulo não pode exceder limite de 100 caracteres")
    .required("Este campo é obrigatório"),
  description: string()
    .min(10, "Descrição deve conter pelo menos 10 caracteres")
    .max(2000, "Descrição excede o limite de caracteres")
    .required("Este campo é obrigatório"),
  cep: string().min(8, "CEP Inválido").required("Este campo é obrigatório"),
  address: string().required("Este campo é obrigatório"),
  number: string().required("Este campo é obrigatório"),
  city: string().required("Este campo é obrigatório"),
  uf: string()
    .min(2, "Este campo é obrigatório")
    .max(2, "Ocorreu um erro inesperado")
    .required("Este campo é obrigatório"),
  datetime: date()
    .min(
      addMonths(new Date(), 1),
      "Evento deve ser realizado a pelo menos um mes"
    )
    .max(addYears(new Date(), 1), "Evento deve ser realizado em até um ano")
    .required("Este campo é obrigatório")
    .typeError("Digite uma data válida"),
  banner: string()
    .min(1, "Banner é obrigatório")
    .required("Banner é obrigatório"),
});
