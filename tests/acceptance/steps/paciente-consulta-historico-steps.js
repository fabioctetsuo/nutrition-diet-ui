/* eslint-disable */
import { click } from '@ember/test-helpers';
import { formatCpf } from 'nutrition-diet-ui/helpers/format-cpf';
import { Response } from 'ember-cli-mirage';
import moment from 'moment';
import steps from './paciente-steps';
import env from '../../../config/environment';

const { avaliacaoNutricionalApi } = env;
const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

export default function(assert) {
  return steps(assert)
    .when('acessar o historico do paciente com cpf "$cpf"', async (cpf) => {
      const cpfFormatted = formatCpf([cpf]);
      const botaoHistorico = $(`td:contains(${cpfFormatted})`)
        .siblings('.paciente-actions')
        .children('.paciente-historico');
      await click(`#${botaoHistorico.attr('id')}`);
      assert.ok(true, 'Botão de histórico do paciente foi clicado');
    })
    
    .when('acessar o historico do paciente com cpf "$cpf" e o serviço estiver indisponível', async (cpf) => {
      server.get(`${url}/pacientes/:id/historicos`, () => new Response(500, {}, {
        errors: [
          { message: 'Serviço indisponível no momento, favor consulte novamente mais tarde.' }
        ]
      }))
      const cpfFormatted = formatCpf([cpf]);
      const botaoHistorico = $(`td:contains(${cpfFormatted})`)
        .siblings('.paciente-actions')
        .children('.paciente-historico');
      await click(`#${botaoHistorico.attr('id')}`);
      assert.ok(true, 'Botão de histórico do paciente foi clicado');
    })

    .then('devo ver uma tabela com o registro do histórico do paciente "$cpf"', (cpf) => {
      const historicoRendered = $('#tbl-paciente-historico tbody tr').map((i,e) => ({
        nome: $(e).find(`#paciente-${i}-nomeCompleto`).text().trim(),
        dataCadastro: $(e).find(`#paciente-${i}-dataCadastro`).text().trim(),
        altura: Number($(e).find(`#paciente-${i}-altura`).text().trim().split(' ').shift()),
        peso: Number($(e).find(`#paciente-${i}-peso`).text().trim().split(' ').shift()),
      })).toArray();
      
      const historico = server.db.pacienteHistoricos.filter(ph => ph.cpf === cpf);
      const historicoFormatted = historico.map(p => ({
        nome: `${p.primeiroNome} ${p.sobrenome}`,
        dataCadastro: moment(p.dataCadastro).format('DD/MM/YYYY'),
        altura: p.altura,
        peso: p.peso,
      }));

      assert.deepEqual(
        historicoRendered,
        historicoFormatted,
        'Versões encontradas devem ser os mesmas renderizadas',
      );
    });
}
