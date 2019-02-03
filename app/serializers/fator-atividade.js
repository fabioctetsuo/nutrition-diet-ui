import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: 'codigo',

  modelNameFromPayloadKey() {
    return this._super('fator-atividade');
  },
});
