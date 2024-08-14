import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types'

export const DialogUI = ( {open, handleClose, handleSubmit, title, children } ) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit
      }}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle className="text-primary">{ title }</DialogTitle>
      <DialogContent dividers>
        { children }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} sx={{
            textTransform:'none',
            fontSize:'15px',
            background:
              "rgba(252, 73, 124, 0.773)",
        }}>Cancelar</Button>
        <Button variant="contained" type="submit" sx={{
            textTransform:'none',
            fontSize:'15px',
            background:
              "linear-gradient(100deg, rgba(110,78,244,0.8) 0%, rgba(152,71,245,0.8) 54%)",
        }}>Continuar</Button>
      </DialogActions>
    </Dialog>
  );
};

PropTypes.DialogUI = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
