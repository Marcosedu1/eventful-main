import TextField, { StandardTextFieldProps } from "@mui/material/TextField";

interface InputTextProps extends StandardTextFieldProps {
  rounded?: boolean;
}

export default function InputText({
  rounded = false,
  ...rest
}: InputTextProps) {
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: rounded ? "20px" : 0,
        },
      }}
      {...rest}
    />
  );
}
