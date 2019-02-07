import { SOBREPESO, OBESIDADE } from './constants/estado-nutricional';
import { classificarImc } from './classificar-imc';

// Fórmulas Usadas da Equação de Predição de TMB com Protocolo DRI, 2000 e 2004
export function calculoMasculinoTMB (peso, altura, idade, imc) {
  if (classificarImc(imc) === SOBREPESO || classificarImc(imc) === OBESIDADE) {
    return Number((293 - (3.8 * idade) + (456.4 * altura) + (10.12 * peso)).toFixed(2));
  }
  return Number((204 - (4 * idade) + (405.5 * altura) + (11.69 * peso)).toFixed(2));
}

export function calculoFemininoTMB (peso, altura, idade, imc) {
  if (classificarImc(imc) === SOBREPESO || classificarImc(imc) === OBESIDADE) {
    return Number((247 - (2.67 * idade) + (401.5 * altura) + (8.6 * peso)).toFixed(2));
  }
  return Number((255 - (2.35 * idade) + (361.6 * altura) + (9.39 * peso)).toFixed(2));
}
