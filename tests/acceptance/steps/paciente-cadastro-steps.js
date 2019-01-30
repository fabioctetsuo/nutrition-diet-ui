/* eslint-disable */
import { click } from '@ember/test-helpers';
import { Response } from 'ember-cli-mirage';
import steps from './paciente-steps';
import env from '../../../config/environment';

const { avaliacaoNutricionalApi } = env;
const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

export default function(assert) {
  return steps(assert)
    .when('clicar no botão "$button" e o serviço estiver indisponível', async (button) => {
      server.post(`${url}/pacientes`, () => new Response(500, {}, {
        errors: [
          { message: 'Serviço indisponível no momento, favor consulte novamente mais tarde.' },
        ],
      }));
      await click(`#btn-${button}`);
      assert.ok(true, `Botão ${button} foi clicado`);
    });
}
