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
    .when('clicar no botão de edição do paciente com cpf "$cpf"', async (cpf) => {
      const cpfFormatted = formatCpf([cpf]);
      const botaoEditar = $(`td:contains(${cpfFormatted})`)
        .siblings('.paciente-actions')
        .children('.paciente-editar');
      await click(`#${botaoEditar.attr('id')}`);
      assert.ok(true, 'Botão de edição do paciente foi clicado');
    })

    .when('clicar no botão "$button" e o serviço estiver indisponível', async (button) => {
      server.put(`${url}/pacientes/:id`, () => new Response(500, {}, {
        errors: [
          { message: 'Serviço indisponível no momento, favor consulte novamente mais tarde.' },
        ],
      }));
      await click(`#btn-${button}`);
      assert.ok(true, `Botão ${button} foi clicado`);
    })

    .then('o campo peso do paciente "$cpf" deve ser "$peso"', (cpf, peso) => {
      const pesoActual = server.db.pacientes.findBy({ cpf }).peso;
      const pesoExpected = Number(peso.replace(',','.'));
      assert.equal(pesoActual, pesoExpected, 'Valores devem ser iguais.');
    });
}
