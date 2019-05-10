import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import withRoot from '../hoc/withRoot';

import ConverterTitle from '../components/Converter/ConverterTitle/ConverterTitle';
import ConverterForm from '../components/Converter/ConverterForm/ConverterForm';

const propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
  }).isRequired,
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

const converterPage = ({ classes }) => (
  <div className={classes.container}>
    <ConverterTitle />
    <ConverterForm onSubmit={console.log} />
  </div>
);

converterPage.propTypes = propTypes;
converterPage.defaultProps = defaultProps;

export default withStyles(styles)(
  withRoot(converterPage),
);
