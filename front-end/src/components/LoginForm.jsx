import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form
      noValidate
      className="bg-gray-100 border border-gray-300 w-md max-w-full p-8 rounded-xl"
    >
      <Stack spacing={2}>
        <TextField required name="email" label="Email" type="email" />
        <TextField
          required
          name="password"
          label="Password"
          type={showPassword.password ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword.password ? "Hide password" : "Show password"
                    }
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword.password ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
