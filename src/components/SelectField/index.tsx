import Select, { SelectProps } from "@mui/material/Select";

interface SelectFieldProps extends SelectProps {
  rounded?: boolean;
}

export default function SelectField({
  rounded = false,
  ...rest
}: SelectFieldProps) {
  return (
    <Select
      sx={{
        "&.MuiOutlinedInput-root": {
          borderRadius: rounded ? "20px" : 0,
        },
      }}
      {...rest}
    />
  );
}
