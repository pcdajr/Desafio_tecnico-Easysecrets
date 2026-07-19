import { Page } from "@playwright/test";

export class HomeElements{

    constructor(private page: Page){}


    // Elementos do MENU PRINCIPAL

    home = () =>
        this.page.getByRole('link',{name:'Home'});

    cart = () =>
        this.page.getByRole('link',{name:'Cart'});

    login = () =>
        this.page.getByRole('link',{name:'Log in'});

    signup = () =>
        this.page.getByRole('link',{name:'Sign up'});

    // Elementos do CARROSEL DE PRODUTOS

    nextButton = () =>
        this.page.getByRole('button', { name: 'Next' });

    previousButton = () =>
        this.page.getByRole('button', { name: 'Previous' });

    phones = () =>
        this.page.getByRole('link',{name:'Phones'});

    laptops = () =>
        this.page.getByRole('link',{name:'Laptops'});

    monitors = () =>
        this.page.getByRole('link',{name:'Monitors'});

    
    
    // Elementos do MODAL - CADASTRO

    getUsernameInput = () =>
        this.page.getByRole('textbox', { name: 'Username:' });

    getPasswordInput = () =>
        this.page.getByRole('textbox', { name: 'Password:' });

    getSignupButton = () =>
        this.page.getByRole('button', { name: 'Sign up' }); 



    // Elementos do MODAL - LOGIN

    getLoginUsernameInput = () =>
        this.page.locator('#loginusername');

    getLoginPasswordInput = () =>
        this.page.locator('#loginpassword');

    getLoginButton = () =>
        this.page.getByRole('button', { name: 'Log in' });

    

}