@setupApplicationTest

Feature: Paciente - Cadastro

  Scenario: Cadastro - Abrir formulário para cadastro
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    Entao o formulário "cadastro-paciente" deve existir

  Scenario: Cadastro - Limpar formulário para cadastro
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    E preencher o campo "cpf" com "87041815064"
    Entao o campo "cpf" deve conter algum texto
    Quando clicar no botão "limpar-formulario"
    Entao o campo "cpf" não deve conter nenhum texto

  Scenario: Cadastro - Fechar formulário para cadastro
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    Entao o formulário "cadastro-paciente" deve existir
    Quando clicar no botão "novo-paciente"
    Entao o formulário "cadastro-paciente" não deve existir

  Scenario: Cadastro - Cadastrando novo paciente
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    E preencher o campo "cpf" com "87041815064"
    E preencher o campo "nome" com "Cristiano"
    E preencher o campo "sobrenome" com "Ronaldo"
    E selecionar a opção "Masculino" no campo "sexo"
    E preencher o campo "data-nascimento" com "05/02/1985"
    E preencher o campo "peso" com "85,00"
    E preencher o campo "altura" com "185,00"
    E clicar no botão "salvar-paciente"
    Entao devo ver uma mensagem de sucesso

  Scenario: Cadastro - Cadastrando novo paciente - Serviço indisponível
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    E preencher o campo "cpf" com "87041815064"
    E preencher o campo "nome" com "Cristiano"
    E preencher o campo "sobrenome" com "Ronaldo"
    E selecionar a opção "Masculino" no campo "sexo"
    E preencher o campo "data-nascimento" com "05/02/1985"
    E preencher o campo "peso" com "85,00"
    E preencher o campo "altura" com "185,00"
    E clicar no botão "salvar-paciente" e o serviço estiver indisponível
    Entao devo ver uma mensagem de erro com o texto "Serviço indisponível no momento, favor consulte novamente mais tarde."
    
  Scenario: Cadastro - Cadastrando novo paciente - Faltando campos obrigatórios
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    E preencher o campo "cpf" com "87041815064"
    E preencher o campo "nome" com "Cristiano"
    E preencher o campo "sobrenome" com "Ronaldo"
    E clicar no botão "salvar-paciente"
    Entao devo ver uma mensagem de erro com o texto "Preencha todos os campos obrigatórios do formulário."

  Scenario: Cadastro - Cadastrando novo paciente - Paciente já cadastrado
    Dado que estou na tela de "paciente"
    Quando clicar no botão "novo-paciente"
    E preencher o campo "cpf" com "44364541850"
    E preencher o campo "nome" com "Fabio"
    E preencher o campo "sobrenome" com "Tetsuo"
    E selecionar a opção "Masculino" no campo "sexo"
    E preencher o campo "data-nascimento" com "28/05/1996"
    E preencher o campo "peso" com "62,00"
    E preencher o campo "altura" com "168,00"
    E existem registros com o cpf "44364541850" na base de pacientes
    E clicar no botão "salvar-paciente"
    Entao devo ver uma mensagem de erro com o texto "Paciente já cadastrado no sistema."