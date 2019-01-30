import EmberError from '@ember/error';

const ValidationError = function (errors, message = 'Preencha todos os campos obrigatórios do formulário.') {
  EmberError.call(this, message);

  this.errors = errors || [
    {
      title: 'Erro de validação.',
      message: message
    }
  ];
}

ValidationError.prototype = Object.create(EmberError.prototype);

export default ValidationError;