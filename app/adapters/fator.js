import ApplicationAdapter from './application';
import env from '../config/environment';

const { avaliacaoNutricionalApi } = env;

export default ApplicationAdapter.extend({
  host: avaliacaoNutricionalApi.host,
  namespace: `${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`,
});
