import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Autorenew from '@material-ui/icons/Autorenew';
import Typography from '@material-ui/core/Typography';
import * as validators from '../../../helpers/validators';

import LinkField from './LinkField/LinkField';

const propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func.isRequired,
};

const defaultProps = {
  handleSubmit: null,
};

const styles = () => ({
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
});

// clearFields()

const form = ({ classes, handleSubmit, handleReset }) => {
  const handleResetConvertForm = () => handleReset('converter');

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        gutterBottom
        marked="center"
        align="center"
      >
        Youtube To Mp3
      </Typography>

      <form
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Field
          name="link"
          component={LinkField}
          handleClear={handleResetConvertForm}
          validate={[validators.isRequired, validators.isYoutubeLink]}
        />

        <IconButton aria-label="Convert" type="submit">
          <Autorenew fontSize="large" />
        </IconButton>
      </form>
    </div>
  );
};

form.propTypes = propTypes;
form.defaultProps = defaultProps;

export default compose(
  withStyles(styles),
  connect(null, {
    handleReset: reset,
  }),
  reduxForm({ form: 'converter' }),
)(form);
