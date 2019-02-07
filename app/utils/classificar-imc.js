import {
  BAIXO_PESO,
  EUTROFICO,
  SOBREPESO,
  OBESIDADE,
} from './constants/estado-nutricional';

export function classificarImc (imc) {
  if (imc < 19.8) return BAIXO_PESO;
  else if (imc >= 19,8 && imc < 26) EUTROFICO;
  else if (imc >= 26 && imc < 29) SOBREPESO;
  else return OBESIDADE;
}
