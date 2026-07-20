export type UsuarioData = {
    username: string;
    password: string;
    description?: string;
};

export class Usuarios {

    static readonly usuarioValido: UsuarioData = {
        username: 'pauloandrade',
        password: 'Qaz@123',
        description: 'Usuário válido para cadastro e login',
    };


    static readonly usuarioDuplicado: UsuarioData = {
        username: 'pauloandrade',
        password: 'Qaz@123',
        description: 'Usuário já cadastrado para validar duplicidade',
    };

    static readonly usuarioVazio: UsuarioData = {
        username: '',
        password: '',
        description: 'Campos obrigatórios vazios para validar mensagem de erro',
    };

    static readonly usuarioSenhaErrada: UsuarioData = {
        username: 'pauloandrade',
        password: 'error',
        description: 'Senha inválida para testes de login',
    };
}
