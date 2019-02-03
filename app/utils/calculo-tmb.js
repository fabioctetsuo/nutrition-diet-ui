export function calculoMasculinoTMB (peso, altura, idade) {
  return (66.5 + (13.8 * peso) + (5 * altura) - (6.8 * idade)).toFixed(2);
}
export function calculoFemininoTMB (peso, altura, idade) {
  return (655.1 + (9.6 * peso) + (1.9 * altura) - (4.7 * idade)).toFixed(2);
}