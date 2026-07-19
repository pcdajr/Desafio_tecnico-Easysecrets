import { Page } from "@playwright/test";

export class HomeElements{

    constructor(private page: Page){}


    // Elementos do MENU PRINCIPAL

    locatorLinkHome = () =>
        this.page.getByRole('link',{name:'Home'});

    locatorLinkCarrinho = () =>
        this.page.getByRole('link',{name:'Cart'});

    locatorLinkLogin = () =>
        this.page.getByRole('link',{name:'Log in'});

    locatorLinkCadastrar = () =>
        this.page.getByRole('link',{name:'Sign up'});

    // Elementos do CARROSEL DE PRODUTOS

    locatorBotaoProximo = () =>
        this.page.getByRole('button', { name: 'Next' });

    locatorBotaoAnterior = () =>
        this.page.getByRole('button', { name: 'Previous' });

    locatorLinkPhones = () =>
        this.page.getByRole('link',{name:'Phones'});

    locatorLinkLaptops = () =>
        this.page.getByRole('link',{name:'Laptops'});

    locatorLinkMonitors = () =>
        this.page.getByRole('link',{name:'Monitors'});

    
    
    // Elementos do MODAL - CADASTRO

    locatorModalTextBoxNome = () =>
        this.page.getByRole('textbox', { name: 'Username:' });

    locatorModalTextBoxSenha = () =>
        this.page.getByRole('textbox', { name: 'Password:' });

    locatorModalBotaoCadastrar = () =>
        this.page.getByRole('button', { name: 'Sign up' }); 



    // Elementos do MODAL - LOGIN

    locatorModalLoginInputNome = () =>
        this.page.locator('#loginusername');

    locatorModalLoginInputSenha = () =>
        this.page.locator('#loginpassword');

    locatorModalBotaoLogin = () =>
        this.page.getByRole('button', { name: 'Log in' });

    

}