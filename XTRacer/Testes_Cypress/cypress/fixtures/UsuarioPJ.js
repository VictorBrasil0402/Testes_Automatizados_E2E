import {gerar} from "gerador-br";

export default class UsuarioPJ{

    static pessoaJuridica(){

        const email = gerar.email();

        const senha = Math.random().toString(36).substring(0, 9);

        return{

            razaoSocial: gerar.nomeEmpresa(),

            inscricaoEstadual: gerar.inscricaoEstadual(),

            cnpj: gerar.cnpj(),

            nomeCompleto: gerar.nome.aleatorioCompleto(),

            celular: gerar.celular(),

            email,

            confirmacaoEmail: email,

            senha,

            confirmacaoSenha: senha
        };
    }
}