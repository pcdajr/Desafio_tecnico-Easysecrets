

import { Page } from "@playwright/test";

export class HomeElements{

    constructor(private page: Page){}

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



}