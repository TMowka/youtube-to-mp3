import PropTypes from 'prop-types';

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const reduxFormInputPropTypes = PropTypes.shape({
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.any,
});

export const reduxFormMetaPropTypes = PropTypes.shape({
  active: PropTypes.bool.isRequired,
  asyncValidating: PropTypes.bool.isRequired,
  autofilled: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.any,
  form: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  visited: PropTypes.bool.isRequired,
  warning: PropTypes.string,
});
