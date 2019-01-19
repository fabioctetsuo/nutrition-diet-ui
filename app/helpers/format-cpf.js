import { helper } from '@ember/component/helper';

export function formatCpf([ cpf ]) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4"); //eslint-disable-line
}

export default helper(formatCpf);
