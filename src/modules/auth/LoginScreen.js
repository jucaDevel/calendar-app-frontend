import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./auth.css";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../actions/auth";
import {
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Logo from "../../assets/images/Calendaily.png";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../../components/ui/GoogleButton";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formLoginValues, handdleLoginInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if(email !== '' && password !== ''){
      dispatch(startLogin(email, password));
    }
    else{
      Swal.fire({
        icon:'info',
        iconColor:'rgb(83, 28, 184, 0.6)',
        title:'Te faltan campos',
        showConfirmButton:false,
        timer:1000
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="title-container">
        <img className="title-logo" src={Logo} alt="Logo" />
        <h3
          className="text-primary title-form"
          style={{
            margin: "1rem 0 0 0",
          }}
        >
          ¡Hola! Bienvenido
        </h3>
      </div>
      <form className="auth-form-container">
        <div className="auth-input-container">
          <div
            className="auth-divider-container"
          >
            <GoogleButton/>
            <Divider>
              <span style={{ color: "rgb(8, 10, 41, 0.4)" }}>or</span>
            </Divider>
          </div>
          <FormControl variant="standard">
            <TextField
              size="small"
              variant="outlined"
              autoComplete="false"
              type="text"
              name="email"
              value={email}
              onChange={handdleLoginInputChange}
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon
                      className="icon-primary"
                      fontSize="medium"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField
              variant="outlined"
              size="small"
              autoComplete="false"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handdleLoginInputChange}
              value={password}
              label="Contraseña"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon
                      className="icon-primary"
                      fontSize="medium"
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon
                          className="icon-primary"
                          fontSize="medium"
                        />
                      ) : (
                        <VisibilityOutlinedIcon
                          className="icon-primary"
                          fontSize="medium"
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
      </form>
      <div className="footer-form">
        <p
          className="pointer text-secondary"
          style={{
            textAlign: "end",
          }}
        >
          ¿Olvidaste la contraseña?
        </p>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            textTransform: "none",
            fontSize: "20px",
            background:
              "linear-gradient(100deg, rgba(110,78,244,0.8) 0%, rgba(152,71,245,0.8) 54%)",
          }}
          onClick={handleLogin}
        >
          Ingresar
        </Button>
        <p className="text-secondary" style={{ textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <span
            className="text-primary pointer"
            style={{
            opacity:
            "80%"
            }}
            onClick={()=>{ navigate('/auth/register') }}
            >
            Registrate
          </span>
        </p>
      </div>
    </Container>
  );
};
