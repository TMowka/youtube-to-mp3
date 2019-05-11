import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Field, reduxForm, initialize,
} from 'redux-form';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Autorenew from '@material-ui/icons/Autorenew';
import * as validators from '../../../helpers/validators';

import LinkField from './LinkField/LinkField';

const propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string,
    submitBtn: PropTypes.string,
  }).isRequired,
  handleSubmit: PropTypes.func,
  handleInitialize: PropTypes.func.isRequired,
};

const defaultProps = {
  handleSubmit: null,
};

const styles = theme => ({
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    height: 88,
  },
  submitBtn: {
    marginTop: theme.spacing.unit - 1,
  },
});

const form = ({
  classes, handleSubmit, handleInitialize,
}) => {
  const handleResetConvertForm = () => handleInitialize('converter');

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.form}
    >
      <Field
        name="link"
        component={LinkField}
        handleClear={handleResetConvertForm}
      />

      <IconButton
        aria-label="Convert"
        type="submit"
        className={classes.submitBtn}
      >
        <Autorenew fontSize="large" />
      </IconButton>
    </form>
  );
};

form.propTypes = propTypes;
form.defaultProps = defaultProps;

const validate = ({ link }) => {
  const errors = {};

  if (!link) {
    errors.link = 'Link cannot be empty';
  } else if (!validators.isYoutubeLink(link)) {
    errors.link = 'This is not YouTube link';
  }

  return errors;
};

export default compose(
  withStyles(styles),
  connect(null, {
    handleInitialize: initialize,
  }),
  reduxForm({ form: 'converter', validate }),
)(form);
