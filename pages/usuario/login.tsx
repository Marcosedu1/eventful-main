import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { Alert, FormControl, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BaseHeader from "../../src/components/BaseHeader";
import InputText from "../../src/components/InputField";
import { useApp } from "../../src/context/AppContext";
import { IUser } from "../../src/interfaces/User";
import { schema } from "../../src/validations/loginSchema";

export default function Login() {
  const { setToken, checkUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: (data: IUser) => axios.post("/api/auth", data),
    onError: (error: any) => {
      setToken("");
      setError(error?.response?.data?.msg);
    },
    onSuccess: (response) => {
      setToken(response.data.access_token);
      checkUser();
      setError(null);

      router.push(router.asPath);
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
    await mutateAsync(data);
  };

  return (
    <>
      <BaseHeader title="Login" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Acesse sua Conta</h1>
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
          className="flex gap-5 w-1/2 items-center"
        >
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputText
                rounded
                type="email"
                fullWidth
                id="email"
                placeholder="E-mail"
                onChange={onChange}
                value={value}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputText
                rounded
                fullWidth
                id="password"
                placeholder="Senha"
                onChange={onChange}
                value={value}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="end"
            color="primary"
            variant="contained"
            className="rounded-3xl w-1/4"
            component="label"
            onClick={handleSubmit(onSubmitHandler)}
          >
            Entrar
          </LoadingButton>
        </FormControl>
        <Box className="mt-3">
          <Link className="text-yellow-500 font-medium" href="cadastro">
            Cadastre-se
          </Link>
        </Box>
      </Box>
    </>
  );
}
