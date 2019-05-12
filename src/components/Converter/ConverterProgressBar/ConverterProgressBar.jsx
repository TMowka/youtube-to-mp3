import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { stateSelector as converterStateSelector } from '../../../ducks/converter';
import { CONVERT_STEP } from '../../../utils/constants';

const propTypes = {
  step: PropTypes.oneOf(...Object.values(CONVERT_STEP), ''),
  progress: PropTypes.number,
};

const defaultProps = {
  step: '',
  progress: -1,
};

const converterProgressBar = ({ step, progress }) => {
  switch (step) {
    case CONVERT_STEP.DOWNLOADING:
      return (
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      );

    case CONVERT_STEP.CONVERTING:
      return (
        <LinearProgress color="secondary" />
      );

    default:
      return null;
  }
};

converterProgressBar.propTypes = propTypes;
converterProgressBar.defaultProps = defaultProps;

export default connect(state => ({
  step: converterStateSelector(state).step,
  progress: converterStateSelector(state).progress,
}))(converterProgressBar);
