/* eslint-disable */
import { visit, currentURL, find, fillIn, click } from '@ember/test-helpers';
import { yadda } from 'ember-cli-yadda';
import { selectChoose } from 'ember-power-select/test-support';
// import { clickTrigger } from 'ember-power-select/test-support/helpers';
// import moment from 'moment';

export default function (assert) {
  return yadda.localisation.Portuguese.library()


/*    .define('o modal deve aparecer', (next) => {
      assert.ok('.modal-open', 'Modal apareceu na tela');
      next();
    })

    .define('confirmar a ação no modal de confirmação', (next) => {
      click('.modal-confirm');
      andThen(() => {
        assert.ok(true, 'Botão confirmar do modal foi clicado');
        next();
      });
    })
*/
    .given('que estou na tela de "$url"', async (url) => {
      await visit(url);
      assert.equal(currentURL(), url, `Estou na tela ${url}`);
    })

    .when('preencher o campo "$field" com "$value"', async (field, value) => {
      await fillIn(`#input-${field}`, value);
      assert.ok(true, `Campo ${field} foi preenchido com ${value}`);
    })

    .when('clicar no botão "$button"', async (button) => {
      await click(`#btn-${button}`);
      assert.ok(true, `Botão ${button} foi clicado`);
    })

    .when('selecionar a opção "$option" no campo "$field"', async (option, field) => {
      await selectChoose(`#input-${field}`, option);
      assert.ok(true, `Campo ${field} foi preenchido com ${option}`);
    })

    .then('o campo "$campo" deve existir na tela', (campo) => {
      assert.ok(find(`#input-${campo}`), `O campo ${campo} deve existir na tela`);
    })

    .then('o botão "$button" deve existir no formulário', (button) => {
      assert.ok(`#btn-${button}`, `O botão ${button} deve existir na tela`);
    })
    
    .then('devo ver uma mensagem de informação com o texto "$text"', (text) => {
      const txt = find('.alert.alert-info').innerText.trim();
      assert.equal(txt, text, `A mensagem de informação contém ${text}`);
    })

    .then('devo ver uma mensagem de erro com o texto "$text"', (text) => {
      const txt = find('.alert.alert-danger').innerText.trim();
      assert.equal(txt, text, `A mensagem de erro contém ${text}`);
    })
    
    .then('devo ver uma mensagem de sucesso', () => {
      assert.ok(find('.alert.alert-success'), `A mensagem de sucesso deve existir`);
    })

    .then('o formulário "$formName" deve existir', (formName) => {
      assert.ok(
        find(`#form-${formName}`).length,
        `Formulário ${formName} deve existir.`,
      );
    })

    .then('o formulário "$formName" não deve existir', (formName) => {
      assert.notOk(
        find(`#form-${formName}`),
        `Formulário ${formName} deve existir.`,
      );
    })

    .then('o campo "$field" deve conter algum texto', (field) => {
      const element = $(`#input-${field}`);
      const txt = (element.val() || element.text()).trim();
      assert.ok(txt, `O campo ${field} contem algum texto`);
    })
    
    .then('o campo "$field" não deve conter nenhum texto', (field) => {
      const element = $(`#input-${field}`);
      const txt = (element.val() || element.text()).trim();
      assert.equal(txt, '', `O campo ${field} não contém texto`);
    })

    .then('não devo ver nenhum modal aberto', (next) => {
      assert.notOk(find('.modal-dialog'));
      next();
    })
/*
    .given('o campo "$field" foi carregado sem valor', (field, next) => {
      clickTrigger(`.input-${field}`);
      assert.equal(find('.ember-power-select-option--no-matches-message').length, 1);
      next();
    })

    

    .when('fechar o modal', (next) => {
      click('#modal-cancel');
      andThen(() => {
        assert.ok(true, 'Botão "Fechar" foi clicado');
        next();
      });
    })

    .when('clicar no campo "$field"', (field, next) => {
      click(`#input-${field}`);
      andThen(() => {
        assert.ok(true, `Campo ${field} foi clicado`);
        next();
      });
    })

    .when('clicar na lista "$field"', (field, next) => {
      clickTrigger(`.input-${field}`);
      andThen(() => {
        assert.ok(true, `Campo ${field} foi clicado`);
        next();
      });
    })

    .when('preencher o campo "$field" com "$value"', (field, value, next) => {
      fillIn(`#input-${field}`, value);
      andThen(() => {
        assert.ok(true, `Campo ${field} foi preenchido com ${value}`);
        next();
      });
    })

    .when('fizer uma busca no campo "$field" com o texto "$text"', (field, text, next) => {
      selectSearch(`#input-${field}`, text);
      andThen(() => {
        assert.ok(true, `Busca com o texto ${text} foi realizada no campo ${field}`);
        next();
      });
    })

    .when('selecionar a opção número "$option" no campo "$field"', (option, field, next) => {
      selectChoose(`#input-${field}`, '.ember-power-select-option', option - 1);
      andThen(() => {
        assert.ok(true, `Campo ${field} foi preenchido com ${option}`);
        next();
      });
    })

    .when('selecionar a opção "$option" no campo "$field"', (option, field, next) => {
      selectChoose(`#input-${field}`, option);
      andThen(() => {
        assert.ok(true, `Campo ${field} foi preenchido com ${option}`);
        next();
      });
    })

    .when('a tabela "$table" ter "$length" linhas', (table, length, next) => {
      const tableLength = find(`#table-${table}`).children('tbody').children().length;
      assert.equal(tableLength, length, `Tabela com ${length} linhas inseridas.`);
      next();
    })

    .then('o campo "$campo" não deve existir no formulário', (campo, next) => {
      assert.notOk(find(`#input-${campo}`).length, `O campo ${campo} não existe no formulário`);
      next();
    })

    .then('o campo "$campo" não deve existir na tela', (campo, next) => {
      assert.notOk(find(`#campo-${campo}`).length, `O campo ${campo} não deve existir na tela`);
      next();
    })




    .then('o campo "$field" deve conter "$text"', (field, text, next) => {
      const element = find(`#input-${field}`);
      const txt = (element.val() || element.text()).trim();
      assert.equal(txt, text.trim(), `O campo ${field} contem ${text}`);
      next();
    })

    

    

    .then('o autocomplete "$field" deve conter "$text"', (field, text, next) => {
      const txt = find(`#input-${field} .ember-power-select-selected-item`).text().trim();
      assert.equal(txt, text.trim(), `O autocomplete ${field} contem ${text}`);
      next();
    })

    .then('o autocomplete "$field" deve conter algum texto', (field, next) => {
      const txt = find(`#input-${field} .ember-power-select-selected-item`).text().trim();
      assert.ok(txt, `O autocomplete ${field} contem algum texto`);
      next();
    })

    .then('o texto "$texto" deve ser exibido no campo "$campo"', (texto, campo, next) => {
      const textoCampo = find(`#campo-${campo}`).text().trim();
      assert.equal(textoCampo, texto, `O texto "${texto}" foi renderizado em tela`);
      next();
    })

    .then('a mensagem "$message" deve estar presente no modal', (message, next) => {
      const modalMessage = find('#modal-message').text().trim();
      assert.equal(message, modalMessage, `A mensagem ${message} está presente no modal`);
      next();
    })

    .then('a opção "$option" deve estar selecionada no campo "$field"', (option, field, next) => {
      const txt = find(`#input-${field} .ember-power-select-selected-item`).text().trim();
      assert.equal(txt, option);
      next();
    })

    .then('a opção "$option" não deve estar selecionada no campo "$field"', (option, field, next) => {
      const txt = find(`#input-${field} .ember-power-select-selected-item`).text().trim();
      assert.notEqual(txt, option);
      next();
    })

    .then('o campo "$campo" deve existir no formulário', (campo, next) => {
      findWithAssert(`#input-${campo}`);
      next();
    })



    .then('o botão "$button" não deve existir no formulário', (button, next) => {
      assert.notOk(find(`#btn-${button}`).length, `O botão ${button} não deve existir no formulário`);
      next();
    })

    .then('o botão "$button" deve estar habilitado', (button, next) => {
      const disabled = find(`#btn-${button}`).prop('disabled');
      assert.notOk(disabled, `O botão ${button} está habilitado`);
      next();
    })

    .then('o botão "$button" deve estar desabilitado', (button, next) => {
      const disabled = find(`#btn-${button}`).prop('disabled');
      assert.ok(disabled, `O botão ${button} está desabilitado`);
      next();
    })

    .then('o botão de confirmação do modal deve estar desabilitado', (next) => {
      const disabled = find('.modal-confirm').prop('disabled');
      assert.ok(disabled, 'O botão de confirmação do modal está desabilitado');
      next();
    })

    .then('o botão de confirmação do modal deve estar habilitado', (next) => {
      const disabled = find('.modal-confirm').prop('disabled');
      assert.notOk(disabled, 'O botão de confirmação do modal está habilitado');
      next();
    })

    .then('o campo "$field" deve estar desabilitado', (field, next) => {
      const input = find(`#input-${field}`);
      const disabled = input.prop('disabled') || input.prop('readOnly');
      assert.ok(disabled, `O campo ${field} está desabilitado`);
      next();
    })

    .then('o autocomplete "$field" deve estar desabilitado', (field, next) => {
      const disabled = find(`#input-${field}`).attr('aria-disabled');
      assert.ok(!!disabled, `O campo ${field} está desabilitado`);
      next();
    })

    .then('o campo "$field" deve estar habilitado', (field, next) => {
      const disabled = find(`#input-${field}`).prop('disabled');
      assert.notOk(disabled, `O campo ${field} está habilitado`);
      next();
    })

    .then('devo ver uma mensagem de sucesso', (next) => {
      findWithAssert('.messages .alert-success');
      next();
    })

    .then('devo ver uma mensagem de sucesso com o texto "$text"', (text, next) => {
      const txt = find('.messages .alert-success').text().trim();
      assert.equal(txt, text, `A mensagem de erro contém ${text}`);
      next();
    })

    .then('devo ver uma mensagem de erro', (next) => {
      findWithAssert('.alert.alert-danger');
      next();
    })

    .then('não devo ver uma mensagem de erro', (next) => {
      findWithAssert('.alert.alert-danger');
      next();
    })

    .then('devo ver uma mensagem de erro com o texto "$text"', (text, next) => {
      const txt = find('.alert.alert-danger').text().trim();
      assert.equal(txt, text, `A mensagem de erro contém ${text}`);
      next();
    })

    .then('devo ser capaz de ver uma lista de valores', (next) => {
      findWithAssert('.ember-power-select-options');
      next();
    })

    .then('devo ver o modal com a mensagem "$message"', (message, next) => {
      const modalMessage = find('.message.modal-body').text().trim();
      assert.equal(modalMessage, message, 'Mensagens devem ser iguais.');
      next();
    })

    .then('devo ver nenhum modal aberto', (next) => {
      assert.notOk(find('.modal-dialog').length);
      next();
    })

    .then('a mensagem "$msg" deve ser exibida', (msg, next) => {
      assert.equal(find('.ember-power-select-option--no-matches-message').text().trim(), msg);
      next();
    })

    .then('a tabela "$tableName" não deve aparecer', (tableName, next) => {
      const dadosCobertura = find(`#table-${tableName} tbody tr`).length;
      assert.notOk(dadosCobertura, 'Os dados não devem aparecer em tela');
      next();
    })

    .then('a tabela "$tableName" deve aparecer', (tableName, next) => {
      const tabela = find(`#table-${tableName} tbody tr`).length;
      assert.ok(tabela, 'A tabela deve aparecer em tela');
      next();
    })

    .then('o campo "$field" deve estar selecionado', (field, next) => {
      const checked = find(`#input-${field}`).is(':checked');
      assert.ok(checked, `O campo ${field} está selecionado`);
      next();
    })

    

    .then('o formulário "$formName" não deve existir', (formName, next) => {
      assert.notOk(
        find(`#form-${formName}`).length,
        `Formulário ${formName} não deve existir.`,
      );
      next();
    })

    .then('o label "$badge" deve existir', (badge, next) => {
      assert.ok(
        find(`.${badge}`).length,
        `Label ${badge} deve existir.`,
      );
      next();
    })

    .then('o label "$badge" não deve existir', (badge, next) => {
      assert.notOk(
        find(`.${badge}`).length,
        `Label ${badge} não deve existir.`,
      );
      next();
    }) */
}
