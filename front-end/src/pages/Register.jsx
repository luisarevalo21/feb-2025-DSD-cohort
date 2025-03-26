import { Grid2 } from "@mui/material";
import logo1 from "../assets/dwellify-high-resolution-logo.png";

import SignupForm from "../components/SignupForm";

const Register = () => {
  return (
    <Grid2 container spacing={2} padding={2} className="min-h-screen">
      <Grid2 size={{ xs: 12, md: 6 }}>
        <img
          src={logo1}
          alt="Interior of Apartment"
          className="h-full object-contain login-page-left"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <div className="h-full flex flex-col items-center justify-center p-6 login-page-right">
          <h1 className="login-font">Signup</h1>
          <SignupForm />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Register;
