import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { startRegister } from '../../actions/auth';
import { Button, Container, Divider, FormControl, IconButton, InputAdornment, TextField } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../../components/ui/GoogleButton";

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [matchPassword, setMatchPassword] = useState(true);
    const [formRegisterValues, handdleRegisterInputChange] = useForm({
        name: '',
        registerEmail:'',
        registerPassword: '',
        confirmPassword: ''
        });
    
    const { name, registerEmail, registerPassword, confirmPassword } = formRegisterValues;
    const handleRegister = (e) => {
        e.preventDefault();

        if(registerPassword === confirmPassword){
            dispatch( startRegister( { name, email: registerEmail, password: registerPassword} ) )
        }
    }

    const verifyPassword = () => {
      if(registerPassword === confirmPassword){
        setMatchPassword(true)
      }
      else{
        setMatchPassword(false)
      }
    }
    return (
        <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent:'space-between',
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="title-container">
        {/* <img className="title-logo" src={Logo} alt="Logo" />  */}
        <h3
          className="text-primary title-form"
          style={{
            margin: "1rem 0 0 0",
            fontSize:'40px'
          }}
        >
          ¡Crea tu cuenta!
        </h3>
      </div>
      <form className="auth-form-container">
        <div className="auth-input-container">
          <div className="auth-divider-container">  
            <GoogleButton isRegister={true}/>
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
              name="name"
              value={name}
              onChange={handdleRegisterInputChange}
              label="Nombre"
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
              size="small"
              variant="outlined"
              autoComplete="false"
              type="email"
              name="registerEmail"
              value={registerEmail}
              onChange={handdleRegisterInputChange}
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
              type={ showPassword ? "text":"password"}
              name="registerPassword"
              value={registerPassword}
              onChange={handdleRegisterInputChange}
              onKeyUp={verifyPassword}
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
          <FormControl variant="standard">
            <TextField
              variant="outlined"
              size="small"
              autoComplete="false"
              type={ showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handdleRegisterInputChange}
              onKeyUp={verifyPassword}
              label="Confirmar Contraseña"
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
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
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

              
              error={ (matchPassword) ? false:true}
              helperText={ !matchPassword && 'Contraseñas no coinciden' }
            />
          </FormControl>
        </div>
      </form>
      <div className="footer-form">
        <Button
          variant="contained"
          sx={{
            width: "100%",
            textTransform: "none",
            fontSize: "20px",
            background:
              "linear-gradient(100deg, rgba(110,78,244,0.8) 0%, rgba(152,71,245,0.8) 54%)",
          }}
          onClick={handleRegister}
        >
          Registrate
        </Button>
        <p className="text-secondary" style={{ textAlign: "center" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-primary pointer"
            style={{
            opacity:
            "80%",
            textDecoration:'none'
            }}
            onClick={()=>{ navigate('/auth/login') }}
            >
            Inicia Sesión
          </span>
        </p>
      </div>
      {/* <form onSubmit={handleRegister}>
          <div className="form-group mb-2">
          <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="name"
              value={name}
              onChange={handdleRegisterInputChange}
          />
          </div>
          <div className="form-group mb-2">
          <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="registerEmail"
              value={registerEmail}
              onChange={handdleRegisterInputChange}
          />
          </div>
          <div className="form-group mb-2">
          <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="registerPassword"
              value={registerPassword}
              onChange={handdleRegisterInputChange}
          />
          </div>

          <div className="form-group mb-2">
          <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handdleRegisterInputChange}
          />
          </div>

          <div className="form-group mb-2">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
          </div>
      </form> */}
    </Container>
    );
};
