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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import api from "../api";

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

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (formData) => {
    api.post('/auth/login', formData)
    .then(function (res) {
      if (res.data.status === "success") {
        navigate("/dashboard");
      } else {
        navigate("/login")
      }
    })
    .catch(function (err) {
      if (err.response) {
        console.log("Error Status:", err.response.status);
        console.log("Error Message:", err.response.data.message);
      }
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 border border-gray-300 w-md max-w-full p-8 rounded-xl"
    >
      <Stack spacing={2}>
        <TextField 
          required 
          name="email" 
          label="Email" 
          type="email" 
          {...register("email")}
          error={errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField
          required
          name="password"
          label="Password"
          type={showPassword.password ? "text" : "password"}
          {...register("password")}
          error={errors?.password}
          helperText={errors?.password?.message}
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

        <Button 
          type="submit" variant="contained" 
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {/* Submit */}
          {isSubmitting ? "Submitting..." : "Log In"}
        </Button>
      </Stack>
    </form>
  );
};

// Zod schema to validate inputs and display error messages
const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." })
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(1, { message: "Password is required." }),
  })

export default LoginForm;
