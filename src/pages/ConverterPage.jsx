import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRoot from '../hoc/withRoot';
import { convert } from '../ducks/converter';

import ConverterProgressBar from '../components/Converter/ConverterProgressBar/ConverterProgressBar';
import ConverterTitle from '../components/Converter/ConverterTitle/ConverterTitle';
import ConverterForm from '../components/Converter/ConverterForm/ConverterForm';

const propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
  }).isRequired,
  handleConvert: PropTypes.func.isRequired,
};

const defaultProps = {

};

const styles = () => ({
  container: {
    width: '40rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const converterPage = ({ classes, handleConvert }) => (
  <div className={classes.container}>
    <ConverterProgressBar />
    <ConverterTitle />
    <ConverterForm onSubmit={handleConvert} />
  </div>
);

converterPage.propTypes = propTypes;
converterPage.defaultProps = defaultProps;

export default compose(
  withStyles(styles),
  withRoot,
  connect(null, {
    handleConvert: convert,
  }),
)(converterPage);
