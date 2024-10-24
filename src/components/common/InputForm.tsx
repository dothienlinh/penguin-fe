import { forwardRef, memo } from "react";
import Input from "../ui/Input";
import { InputLabel, TextFieldProps } from "@mui/material";

const InputForm = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        {label && (
          <InputLabel htmlFor={props.id} sx={{ fontSize: 14, fontWeight: 700 }}>
            {label}
          </InputLabel>
        )}
        <Input {...props} ref={ref} />
      </>
    );
  }
);

InputForm.displayName = "InputForm";

export default memo(InputForm);
