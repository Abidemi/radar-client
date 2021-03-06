import _ from 'lodash';

/**
 * Convert a state and stateParams into a string for use in the ui-sref attribute.
 *
 * @param {string} state - ui router state.
 * @param {Object} stateParams - ui router state params.
 * @returns {string} - state and state params as a string for use in the ui-sref attribute.
 */
function toStateString(state, stateParams) {
  return state + '({' + _.map(stateParams, function(v, k) {
    return k + ': ' + JSON.stringify(v);
  }).join(', ') + '})';
}

export {
  toStateString
};
