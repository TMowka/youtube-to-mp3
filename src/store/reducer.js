import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import converterReducer, { moduleName as converterModule } from '../ducks/converter';
import configReducer, { moduleName as configModule } from '../ducks/config';

export default combineReducers({
  form: formReducer,
  [converterModule]: converterReducer,
  [configModule]: configReducer,
});
