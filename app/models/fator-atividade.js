import DS from 'ember-data';

export default DS.Model.extend({
  codigo: DS.attr('string'),
  codigoFator: DS.attr('string'),
  ativo: DS.attr('boolean'),
  descricao: DS.attr('string'),
  valor: DS.attr('number'),
});
