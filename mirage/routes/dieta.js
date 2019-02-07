import Response from 'ember-cli-mirage/response';
import moment from 'moment';
import env from '../../config/environment';

const { avaliacaoNutricionalApi } = env;

export default function (mirage) {
  const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

  mirage.get(`${url}/dietas`, ({ dietas }, { queryParams }) => {
    let { cpf } = queryParams;
    if (cpf) {
      return dietas.where((dieta) => dieta.paciente.cpf === cpf);
    }
    dietas.all();
  });
}
