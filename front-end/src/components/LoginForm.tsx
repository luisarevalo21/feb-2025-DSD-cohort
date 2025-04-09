import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
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
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (formData) => {
    api
      .post("/auth/login", formData)
      .then(function (res) {
        if (res.status === 200) {
          queryClient.setQueryData(["user"], res.data.user);
          localStorage.setItem("isLogged", true);
          toast.success(
            `Welcome Back, ${res.data.user.first_name || "Guest"}!`
          );
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      })
      .catch(function (err) {
        toast.error(
          err.response?.data?.message || "An error occurred. Please try again"
        );
      });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 border border-gray-300 p-8 rounded-xl max-w-md  xl:w-sm"
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
          type="submit"
          variant="contained"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </Button>
      </Stack>
      <p className="mt-4 text-center helper-font">
        Don&apos;t have an account? <Link href="/register">Signup</Link>
      </p>
    </form>
  );
};

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .toLowerCase()
    .trim(),

  password: z.string().min(1, { message: "Password is required." }),
});

export default LoginForm;
