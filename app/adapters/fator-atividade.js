import FatorAdapter from './fator';

export default FatorAdapter.extend({
  findAll(store, type) {
    return this.query(store, type, {});
  },
  query(store, type, query) {
    let newType = { ...type };
    newType.modelName = 'fator';
    return this._super(store, newType, query);
  },
});