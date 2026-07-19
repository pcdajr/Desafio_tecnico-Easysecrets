
import { Page } from "@playwright/test";

export class MenuElements{

    constructor(private page: Page){}

    home = () =>
        this.page.getByRole('link',{name:'Home'});

    cart = () =>
        this.page.getByRole('link',{name:'Cart'});

    login = () =>
        this.page.getByRole('link',{name:'Log in'});

    signup = () =>
        this.page.getByRole('link',{name:'Sign up'});



}