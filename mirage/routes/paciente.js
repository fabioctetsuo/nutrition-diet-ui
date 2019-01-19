import Response from 'ember-cli-mirage/response';
import moment from 'moment';
import env from '../../config/environment';

const { avaliacaoNutricionalApi } = env;

export default function (mirage) {
  const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

  mirage.get(`${url}/pacientes`, ({ pacientes }, { queryParams }) => {
    let { ativo, nome, cpf } = queryParams;
    ativo = ativo ? ativo : true;
    const pacientesAtivos = pacientes.where({ ativo });
    if (nome) {
      return pacientesAtivos.filter(p => {
        const nomeCompleto = `${p.primeiroNome} ${p.sobrenome}`;
        return nomeCompleto.match(new RegExp(`.*${nome}.*`, 'i'));
      });
    }
    if (cpf) {
      return pacientes.where({ cpf, ativo });
    }
    return pacientes.all();
  });

  mirage.post(`${url}/pacientes`, ({ pacientes, pacienteHistoricos }, { requestBody }) => {
    let { paciente } = JSON.parse(requestBody);
    const codigos = pacientes.all().models.map(paciente => Number(paciente.codigo));
    const lastCodigo = codigos.sort((a, b) => b - a).shift();
    const pacienteExistente = pacientes.findBy({ cpf: paciente.cpf });
    if (pacienteExistente) {
      return new Response(400, {}, {
        errors: [ { message: "Paciente já cadastrado no sistema." } ],
      });
    }
    paciente.codigo = lastCodigo + 1;
    paciente.versao = 1;
    paciente.ativo = true;
    paciente.dataCadastro = moment().toISOString();
    pacienteHistoricos.create(paciente);
    return pacientes.create(paciente);
  });

  mirage.put(`${url}/pacientes/:codigo`, ({ pacientes, pacienteHistoricos }, { params, requestBody }) => {
    let { paciente } = JSON.parse(requestBody);
    const { codigo } = params;
    paciente.versao += 1;
    paciente.dataCadastro = moment().toISOString();
    pacienteHistoricos.create(paciente);
    return pacientes.findBy({ codigo }).update(paciente);
  });

  mirage.get(`${url}/pacientes/:codigo/historicos`, ({ pacienteHistoricos }, { params }) => {
    const { codigo } = params;
    return pacienteHistoricos.where({ codigo });
  });

  mirage.del(`${url}/pacientes/:codigo`, ({ pacientes }, { params }) => {
    const { codigo } = params;
    let paciente = pacientes.findBy({ codigo });
    paciente.ativo = false;
    paciente.update();
    return new Response(204, {});
  });
}
