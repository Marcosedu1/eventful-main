import { yupResolver } from "@hookform/resolvers/yup";
import UploadIcon from "@mui/icons-material/Upload";
import { Alert, FormControl, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import BaseHeader from "../src/components/BaseHeader";
import InputText from "../src/components/InputField";
import { api } from "../src/config/api-client";
import { useApp } from "../src/context/AppContext";
import useDebounce from "../src/hooks/useDebounce";
import { IEvent } from "../src/interfaces/Event";
import { schema } from "../src/validations/organizeSchema";

export default function Organize() {
  const { isLogged, checkUser, token } = useApp();
  const router = useRouter();

  const [selectedBanner, setSelectedBanner] = useState<File | undefined>(
    undefined
  );
  const [previewBanner, setPreviewBanner] = useState<string | undefined>(
    undefined
  );
  const [cep, setCep] = useState("");
  const [error, setError] = useState<string | null>(null);

  const debouncedCep = useDebounce(cep, 500);

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: (data: IEvent) => api.post("/event", data,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    onError: (error: AxiosError<{ msg: string, code: string }, any>) => {
      setError(error?.response?.data?.msg ?? null);
    },
    onSuccess: (response) => {
      setError(null);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (data: FormData) =>
      axios.post("/api/upload", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
    onError: (error: AxiosError<{ msg: string, code: string }, any>) => {
      setError(error?.response?.data?.msg ?? null);
    },
    onSuccess: (_) => {
      setError(null);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: yupResolver(schema),
  });

  const onSelectedBanner = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedBanner(undefined);

      return;
    }

    setSelectedBanner(e.target.files[0]);
  };

  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(null);
  };

  const getAddressByCep = (value: string) => {
    return axios
      .get(`https://viacep.com.br/ws/${value}/json/`)
      .then((response) => response.data);
  };

  const onSubmitHandler = async (data: IEvent) => {
    const response = await mutateAsync(data);

    if (response.status === 201) {
      const { id } = response.data;
      
      if (selectedBanner) {
        const formData = new FormData();

        formData.append("file", selectedBanner);

        await uploadMutation.mutateAsync(formData);
      }

      router.push({
        pathname: "/evento/[id]",
        query: { id },
      });
    }
  };

  useEffect(() => {
    if (!selectedBanner) {
      setPreviewBanner(undefined);

      return;
    }

    const previewUrl = URL.createObjectURL(selectedBanner);
    setPreviewBanner(previewUrl);
  }, [selectedBanner]);

  useEffect(() => {
    if (debouncedCep) {
      getAddressByCep(debouncedCep)
        .then((results) => {
          setValue("address", results.logradouro);
          setValue("city", results.localidade);
          setValue("uf", results.uf);
        })
        .catch((error) => {
          setValue("address", "");
          setValue("city", "");
          setValue("uf", "");
        });
    }
  }, [debouncedCep, setValue]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!isLogged) {
      router.push("/usuario/login");
    }
  }, [isLogged, router]);

  return (
    <>
      <BaseHeader title="Organize" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Organize</h1>
        {error && (
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
              <Grid container gap={1} alignItems="center">
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
                  <Grid item className="ml-4">
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
