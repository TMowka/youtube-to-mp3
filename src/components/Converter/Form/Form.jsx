import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Autorenew from '@material-ui/icons/Autorenew';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    form: PropTypes.string,
    container: PropTypes.string,
  }).isRequired,
};

const defaultProps = {

};

const styles = theme => ({
  container: {
    width: '40rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing.unit,
  },
});

const form = ({ classes }) => (
  <div className={classes.container}>
    <Typography
      variant="h4"
      gutterBottom
      marked="center"
      align="center"
    >
      Youtube To Mp3
    </Typography>


    <form className={classes.form}>
      <TextField
        label="Link"
        placeholder="Enter youtube video link here..."
        type="text"
        variant="outlined"
        fullWidth
        autoFocus
        className={classes.textField}
      />

      <IconButton aria-label="Convert">
        <Autorenew fontSize="large" />
      </IconButton>
    </form>
  </div>
);

form.propTypes = propTypes;
form.defaultProps = defaultProps;

export default withStyles(styles)(form);
