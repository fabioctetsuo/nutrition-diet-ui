import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatAge([ dataCadastro, dataNascimento ]) {
  if (!dataCadastro || !dataNascimento) return null;
  const [ diaNascimento, mesNascimento, anoNascimento ] = dataNascimento.split('/');
  const formatNascimento = `${anoNascimento}-${mesNascimento}-${diaNascimento}`;
  return moment(dataCadastro).diff(formatNascimento, 'years');
}

export default helper(formatAge);
