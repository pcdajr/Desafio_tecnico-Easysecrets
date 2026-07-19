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

    // Gera um usuário válido com um sufixo único baseado no timestamp atual para evitar duplicidade em testes de cadastro
    static gerarUsuarioValidoUnico(): UsuarioData {
        const usuario = Usuarios.usuarioValido;
        const sufixo = Date.now().toString();

        return {
            ...usuario,
            username: `${usuario.username}_${sufixo}`,
        };
    }

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

    static get(type: 'usuarioValido' | 'usuarioDuplicado' | 'usuarioVazio' | 'usuarioSenhaErrada'): UsuarioData {
        switch (type) {
            case 'usuarioValido':
                return Usuarios.usuarioValido;
            case 'usuarioDuplicado':
                return Usuarios.usuarioDuplicado;
            case 'usuarioVazio':
                return Usuarios.usuarioVazio;
            case 'usuarioSenhaErrada':
                return Usuarios.usuarioSenhaErrada;
            default:
                throw new Error(`Tipo de usuário não suportado: ${type}`);
        }
    }
}
