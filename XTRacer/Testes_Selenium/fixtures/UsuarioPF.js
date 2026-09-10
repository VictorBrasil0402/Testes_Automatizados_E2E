const {gerar} = require('gerador-br');

class UsuarioPF {

    static pessoaFisica(){

        const email = gerar.email();

        const senha = Math.random().toString(36).substring(0, 9);
        
        return{

            nomeCompleto: gerar.nome.aleatorioCompleto(),
            
            dataNascimento: gerar.dataNascimento(),
            
            cpf: gerar.cpf(),

            celular: gerar.celular(),

            email,

            confirmacaoEmail: email,

            senha,

            confirmacaoSenha: senha
        };
    }
}

module.exports = UsuarioPF;