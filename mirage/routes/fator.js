import env from '../../config/environment';

const { avaliacaoNutricionalApi } = env;

export default function (mirage) {
  const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

  mirage.get(`${url}/fatores`, ({ fatores }, { queryParams }) => {
    let { codigoFator, ativo } = queryParams;
    if (codigoFator) {
      return fatores.where({ codigoFator, ativo });
    }
    return fatores.all();
  });
}
