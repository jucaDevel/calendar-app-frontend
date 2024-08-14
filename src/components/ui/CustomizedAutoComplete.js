import * as React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useAutocomplete } from "../../hooks/useAutoComplete";

import CancelIcon from "@mui/icons-material/Cancel";

export const CustomizedAutoComplete = React.memo(
  ({ options, currentOptions, onCurrentOptionsChange }) => {
    const {
      optionSelected,
      handleOptionChange,
      currentOptionSelected,
      handleSelectOption,
      handleRemoveOption,
      value,
    } = useAutocomplete({
      options,
      currentOptions,
      onCurrentOptionsChange
    });

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            className="event-form-field"
            label="Añade un colaborador"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <PeopleIcon className="icon-primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleOptionChange}
            value={value}
          />
          {optionSelected && (
            <button className="option-select" onClick={handleSelectOption}>
              <span>
                {optionSelected.label}
              </span>
              <span>
                {optionSelected.isChecked && (
                  <IconButton onClick={() => handleRemoveOption(optionSelected.id)}>
                    <CancelIcon fontSize="small"/>
                  </IconButton>
                )}
              </span>
            </button>
          )}
        </Box>
        {currentOptionSelected.length > 0 && (
          <div className="container-current-options">
            {currentOptionSelected.map((option) => {
              return (
                <div key={option.id} className="current-option">
                  <span>{option.label}</span>
                  <span>
                    <IconButton onClick={() => handleRemoveOption(option.id)}>
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

CustomizedAutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  currentOptions: PropTypes.array.isRequired,
};
