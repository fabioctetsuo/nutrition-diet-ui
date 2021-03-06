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
    .when('clicar no botão de excluir o paciente com cpf "$cpf"', async (cpf) => {
      const cpfFormatted = formatCpf([cpf]);
      const botaoExcluir = $(`td:contains(${cpfFormatted})`)
        .siblings('.paciente-actions')
        .children('.paciente-excluir');
      await click(`#${botaoExcluir.attr('id')}`);
      assert.ok(true, 'Botão de excluir o paciente foi clicado');
    })

    .when('clicar no botão "$button" e o serviço estiver indisponível', async (button) => {
      server.del(`${url}/pacientes/:id`, () => new Response(500, {}, {
        errors: [
          { message: 'Serviço indisponível no momento, favor consulte novamente mais tarde.' },
        ],
      }));
      await click(`#btn-${button}`);
      assert.ok(true, `Botão ${button} foi clicado`);
    });
}
