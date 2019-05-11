import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { reduxFormInputPropTypes, reduxFormMetaPropTypes } from '../../../../utils/propTypes';

const propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string,
  }).isRequired,
  input: reduxFormInputPropTypes.isRequired,
  meta: reduxFormMetaPropTypes.isRequired,
  handleClear: PropTypes.func,
};

const defaultProps = {
  handleClear: null,
};

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
  },
});

const linkField = ({
  classes, input, meta: { touched, error }, handleClear,
}) => {
  let isInvalid = false;

  if (touched && error) {
    isInvalid = true;
  }

  return (
    <TextField
      {...input}
      error={isInvalid}
      label="Link"
      placeholder="Enter youtube video link here..."
      type="text"
      variant="outlined"
      helperText={isInvalid && error}
      fullWidth
      autoFocus
      className={classes.textField}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Clear field"
              onClick={handleClear}
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

linkField.propTypes = propTypes;
linkField.defaultProps = defaultProps;

export default withStyles(styles)(linkField);
