import React from 'react';
import Typography from '@material-ui/core/Typography';

const propTypes = {

};

const defaultProps = {

};

const converterTitle = () => (
  <Typography
    variant="h4"
    gutterBottom
    marked="center"
    align="center"
  >
    Youtube To Mp3
  </Typography>
);

converterTitle.propTypes = propTypes;
converterTitle.defaultProps = defaultProps;

export default converterTitle;
