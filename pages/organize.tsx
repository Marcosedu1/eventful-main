import { yupResolver } from "@hookform/resolvers/yup";
import UploadIcon from "@mui/icons-material/Upload";
import { FormControl, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import BaseHeader from "../src/components/BaseHeader";
import InputText from "../src/components/InputField";
import { api } from "../src/config/api-client";
import { useApp } from "../src/context/AppContext";
import useDebounce from "../src/hooks/useDebounce";
import { IEvent } from "../src/interfaces/Event";

export default function Organize() {
  const { isLogged, checkUser } = useApp();
  const router = useRouter();

  const [selectedBanner, setSelectedBanner] = useState<File | undefined>(
    undefined
  );
  const [previewBanner, setPreviewBanner] = useState<string | undefined>(
    undefined
  );
  const [cep, setCep] = useState("");

  const debouncedCep = useDebounce(cep, 1000);

  const schema = yup.object().shape({
    title: yup
      .string()
      .min(5, "Este campo é obrigatório")
      .max(100, "Titulo não pode exceder limite de 100 caracteres")
      .required("Este campo é obrigatório"),
    description: yup
      .string()
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
      .required("Este campo é obrigatório"),
    datetime: yup
      .date()
      .min(new Date(), "Digite uma data válida")
      .required("Este campo é obrigatório")
      .typeError("Digite uma data válida"),
    banner: yup.mixed().required("Banner é obrigatório"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!selectedBanner) {
      setPreviewBanner(undefined);

      return;
    }

    const previewUrl = URL.createObjectURL(selectedBanner);
    setPreviewBanner(previewUrl);
  }, [selectedBanner]);

  const onSelectedBanner = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedBanner(undefined);

      return;
    }

    setSelectedBanner(e.target.files[0]);
  };

  useEffect(() => {
    if (debouncedCep) {
      getAddressByCep(debouncedCep)
        .then((results) => {
          setValue("address", results.logradouro);
          setValue("city", results.localidade);
          setValue("uf", results.uf);
        })
        .catch((error) => {
          console.log(error);

          setValue("address", "");
          setValue("city", "");
          setValue("uf", "");
        });
    }
  }, [debouncedCep, setValue]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const getAddressByCep = (value: string) => {
    return axios
      .get(`https://viacep.com.br/ws/${value}/json/`)
      .then((response) => response.data);
  };

  const onSubmitHandler = async (data: IEvent) => {
    const response = await api.post<IEvent>("/event", data);
    const { id } = response.data;

    if (response.status === 201) {
      if (selectedBanner) {
        const formData = new FormData();

        formData.append("file", selectedBanner);

        const responseUpload = await axios.post("/api/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      }

      router.push({
        pathname: "/evento/[id]",
        query: { id },
      });
    }
  };

  if (!isLogged) {
    return (
      <Box className="mt-7 justify-center flex flex-col items-center gap-5">
        <Typography variant="h3" className="font-light">
          Necessário efetuar o Login
        </Typography>
        <Link href="/usuario/login" passHref className="w-1/5">
          <Button
            className="rounded-3xl"
            fullWidth
            color="primary"
            component="label"
            variant="contained"
          >
            Entrar
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <>
      <BaseHeader title="Organize" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Organize</h1>
        <FormControl
          variant="standard"
          fullWidth
          className="flex gap-1 items-center"
        >
          <Grid
            className="mb-4"
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            rowGap={1}
          >
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="text"
                    rounded
                    label="Titulo do Evento"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    multiline
                    rows={4}
                    type="text"
                    rounded
                    label="Descrição do Evento"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="cep"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    mask="99999999"
                    maskPlaceholder={null}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setCep(e.target.value);
                    }}
                    value={value}
                  >
                    <InputText
                      required
                      type="text"
                      rounded
                      label="CEP"
                      fullWidth
                      helperText={errors.cep?.message}
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="text"
                    rounded
                    label="Endereço"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                name="number"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    mask="9999"
                    maskPlaceholder={null}
                    onChange={onChange}
                    value={value}
                  >
                    <InputText
                      required
                      type="text"
                      rounded
                      label="Número"
                      fullWidth
                      helperText={errors.number?.message}
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="city"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="text"
                    rounded
                    label="Cidade"
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="uf"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputMask
                    mask="aa"
                    maskPlaceholder={null}
                    onChange={onChange}
                    value={value}
                  >
                    <InputText
                      required
                      type="text"
                      rounded
                      label="Estado"
                      fullWidth
                      helperText={errors.uf?.message}
                    />
                  </InputMask>
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="datetime"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    required
                    type="datetime-local"
                    rounded
                    label="Data e Horário"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={onChange}
                    value={value}
                    helperText={errors.datetime?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Grid container gap={3} alignItems="center">
                <Grid item>
                  <Controller
                    name="banner"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange } }) => (
                      <Button
                        className="rounded-3xl"
                        color="info"
                        variant="contained"
                        component="label"
                      >
                        <UploadIcon className="mr-2" />
                        <Typography variant="subtitle1">
                          Enviar Banner
                        </Typography>
                        <input
                          required
                          accept="image/*"
                          hidden
                          type="file"
                          onChange={(e) => {
                            onChange(
                              e.target.files?.length
                                ? e.target.files[0].name
                                : ""
                            );
                            onSelectedBanner(e);
                          }}
                        />
                      </Button>
                    )}
                  />
                </Grid>

                {previewBanner && (
                  <Grid item>
                    <Image
                      alt="previewBanner"
                      src={previewBanner}
                      className="rounded-xl"
                      width={100}
                      height={100}
                    />
                  </Grid>
                )}
                <div className="ml-4 text-red-500 text-xs">
                  {errors.banner?.message}
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Button
            className="rounded-3xl"
            color="secondary"
            component="label"
            variant="contained"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Enviar Formulário
          </Button>
        </FormControl>
      </Box>
    </>
  );
}
