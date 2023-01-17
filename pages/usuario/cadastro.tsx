import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem
} from "@mui/material";
import { Box } from "@mui/system";
import { createHmac } from "crypto";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import BaseHeader from "../../src/components/BaseHeader";
import Button from "../../src/components/Button";
import InputText from "../../src/components/InputField";
import SelectField from "../../src/components/SelectField";
import { api } from "../../src/config/api-client";
import { IUser } from "../../src/interfaces/User";

export default function Cadastro() {
  const router = useRouter();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(1, "Este campo é obrigatório")
      .max(20, "Nome não pode exceder limite de 20 caracteres")
      .required("Este campo é obrigatório"),
    lastName: yup
      .string()
      .min(1, "Este campo é obrigatório")
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
      //..transform((value, originalValue) => originalValue ? parse(originalValue, "yyyy-MM-dd", new Date()) : value)
      .max(new Date(), "Digite uma data válida")
      .required("Este campo é obrigatório")
      .typeError("Digite uma data válida"),
    genre: yup.string().required("Este campo é obrigatório"),
    acceptedTerms: yup.boolean().required("Termos são obrigatórios"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: IUser) => {
    data.password = createHmac(
      "sha256",
      process.env.NEXT_PUBLIC_HASH_KEY!
    )
      .update(data.password)
      .digest("hex");

    delete data.confirmEmail;
    delete data.confirmPassword;
      
    const response = await api.post<IUser>("/user", data);

    if (response?.status === 201) {
      router.push("/usuario/login");
    }
  };

  return (
    <>
      <BaseHeader title="Cadastro" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Cadastro</h1>
        <FormControl
          variant="standard"
          fullWidth
          className="flex gap-1 items-center"
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowGap={1}
          >
            <Grid item xs={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="text"
                    rounded
                    label="Nome"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="text"
                    rounded
                    label="Sobrenome"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="email"
                    rounded
                    label="E-mail"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="confirmEmail"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="email"
                    rounded
                    label="Confirme o e-mail"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.confirmEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="password"
                    rounded
                    label="Senha"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="password"
                    rounded
                    label="Confirme a Senha"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="cpf"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    mask="99999999999"
                    onChange={onChange}
                    value={value}
                  >
                    <InputText
                      required
                      type="text"
                      rounded
                      label="CPF"
                      fullWidth
                      helperText={errors.cpf?.message}
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="birthdate"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="date"
                    rounded
                    label="Data de Nascimento"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.birthdate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-genre">Gênero *</InputLabel>
                <Controller
                  name="genre"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <SelectField
                      required
                      rounded
                      labelId="select-genre"
                      id="select-genre"
                      value={value}
                      onChange={onChange}
                      label="Gênero"
                    >
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Feminino</MenuItem>
                    </SelectField>
                  )}
                />
                <FormHelperText>{errors.genre?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name="acceptedTerms"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox required onChange={onChange} value={value} />
                      }
                      label="Concordo com os Termos de Uso e Política de Privacidade"
                    />
                  )}
                />
                <FormHelperText>{errors.acceptedTerms?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            size="sm"
            color="secondary"
            title="Cadastrar"
            onClick={handleSubmit(onSubmitHandler)}
          />
        </FormControl>
      </Box>
    </>
  );
}
