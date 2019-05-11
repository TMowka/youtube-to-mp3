import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateSelector as converterStateSelector } from '../../../ducks/converter';

const propTypes = {
  progress: PropTypes.number,
};

const defaultProps = {
  progress: -1,
};

const converterProgressBar = ({ progress }) => (
  <div>
    Progress:&nbsp;
    {progress}
  </div>
);

converterProgressBar.propTypes = propTypes;
converterProgressBar.defaultProps = defaultProps;

export default connect(state => ({
  progress: converterStateSelector(state).progress,
}))(converterProgressBar);
