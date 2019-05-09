import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import withRoot from '../hoc/withRoot';

import ConverterForm from '../components/Converter/Form/Form';

const propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
  }).isRequired,
};

const defaultProps = {

};

const styles = () => ({
  container: {
    width: '100%',
    height: 'calc(100vh - 16px)',
  },
});

const converterPage = ({ classes }) => (
  <div className={classes.container}>
    <ConverterForm />
  </div>
);

converterPage.propTypes = propTypes;
converterPage.defaultProps = defaultProps;

export default withStyles(styles)(
  withRoot(converterPage),
);
