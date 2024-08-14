import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Google from "./GoogleIconButton";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { startSignInGoogle } from "../../actions/auth";
import { DialogUI } from "./DialogUI";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useForm } from "../../hooks/useForm";

export const GoogleButton = ({ isRegister = false }) => {
  const [authCode, setAuthCode] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState(true);
  const [ formValues, handdleInputChange] = useForm({
    password:'',
    confirmPassword:''
  })

  const { password: registerPassword , confirmPassword: confirmPasswordRegister } = formValues;

  const dispatch = useDispatch();
  const handleSignIn = useGoogleLogin({
    onSuccess: ({ code }) => setAuthCode(code),
    flow: "auth-code",
  });

  const handleSubmitDialog = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const password = formJson.password;
    const confirmPassword = formJson.confirmPassword;
    if (password === confirmPassword) {
        dispatch(startSignInGoogle(authCode, password, true))
        handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const verifyPassword = () => {
    if(registerPassword === confirmPasswordRegister){
      setMatchPassword(true)
    }
    else{
      setMatchPassword(false)
    }
  }

  useEffect(() => {
    if (authCode && isRegister) {
      setOpenDialog(true);
    } else if (authCode && !isRegister) {
      dispatch(startSignInGoogle(authCode));
    }
  }, [authCode, dispatch, isRegister]);

  return (
    <>
      <DialogUI
        open={openDialog}
        handleClose={handleCloseDialog}
        handleSubmit={handleSubmitDialog}
        title={"Por favor, ingresa una contraseña"}
      >
        <div className="auth-input-container" style={{
            margin:'1rem 0'
        }}>
            <FormControl variant="standard">
            <TextField
                variant="outlined"
                size="small"
                autoComplete="false"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Contraseña"
                value={registerPassword}
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
                onChange={handdleInputChange}
                onKeyUp={verifyPassword}
            />
            </FormControl>
            <FormControl variant="standard">
            <TextField
                variant="outlined"
                size="small"
                autoComplete="false"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPasswordRegister}
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
                onKeyUp={verifyPassword}
                onChange={handdleInputChange}
                error={ (matchPassword) ? false:true}
                helperText={ !matchPassword && 'Contraseñas no coinciden' }
            />
            </FormControl>
        </div>
      </DialogUI>
      <Button
        variant="outlined"
        size="small"
        sx={{
          width: "100%",
          border: "1px solid  rgb(8, 10, 41, 0.2)",
          boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.2)",
          color: "black",
          fontWeight: "400",
          textTransform: "none",
          fontSize: "17px",
        }}
        startIcon={<Google />}
        onClick={handleSignIn}
      >
        <span
          style={{
            width: "70%",
            textAlign: "center",
          }}
        >
          Ingresa con Google
        </span>
      </Button>
    </>
  );
};

PropTypes.GoogleButton = {
  isRegister: PropTypes.bool,
};
