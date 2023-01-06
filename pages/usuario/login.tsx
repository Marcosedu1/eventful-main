import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { FormControl, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../src/components/Button";
import Link from "next/link";
import InputText from "../../src/components/InputField";
import BaseHeader from "../../src/components/BaseHeader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "../../src/interfaces/User";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Por favor, forneça um endereço de email válido.")
      .required("Este campo é obrigatório"),
    password: yup.string().required("Este campo é obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: IUser) => {
    const response = await axios.post("/api/usuarios", { data });
    console.log(response.data);
  };

  return (
    <>
      <BaseHeader title="Login" />

      <Box className="flex justify-center flex-col items-center mt-5">
        <h1 className="text-3xl mb-5">Acesse sua Conta</h1>
        <FormControl
          variant="standard"
          className="flex gap-5 w-1/2 items-center">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputText
                rounded
                type="email"
                fullWidth
                id="email"
                placeholder="Email"
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
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            size="sm"
            color="secondary"
            title="Entrar"
            onClick={handleSubmit(onSubmitHandler)}
          />
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
