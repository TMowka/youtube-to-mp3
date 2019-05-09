import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import converterReducer, { moduleName as converterModule } from '../ducks/converter';

export default combineReducers({
  form: formReducer,
  [converterModule]: converterReducer,
});
