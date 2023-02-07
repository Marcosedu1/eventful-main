import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem
} from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import BaseHeader from "../../src/components/BaseHeader";
import InputText from "../../src/components/InputField";
import SelectField from "../../src/components/SelectField";
import { IUser } from "../../src/interfaces/User";
import { schema } from "../../src/validations/registerSchema";

export default function Cadastro() {
  const [error, setError] = useState(null);

  const router = useRouter();  

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: (data: IUser) => axios.post("/api/user/signup", data),
    onError: (error: any) => {
      setError(error?.response?.data?.msg);
    },
    onSuccess: () => {
      setError(null);
      router.push("/usuario/login");
    },
  });
console.log(isError);


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(null);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: IUser) => {
    delete data.confirmEmail;
    delete data.confirmPassword;

    await mutateAsync(data);
  };

  return (
    <>
      <BaseHeader title="Cadastro" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Cadastro</h1>

        {isError && error && (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "50%", marginBottom: "10px" }}
          >
            {error}
          </Alert>
        )}

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
          <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="end"
            color="primary"
            variant="contained"
            className="rounded-3xl w-1/6"
            component="label"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Cadastrar
          </LoadingButton>
        </FormControl>
      </Box>
    </>
  );
}
