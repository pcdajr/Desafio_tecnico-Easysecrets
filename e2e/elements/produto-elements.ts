
import { Page } from "@playwright/test";

export class ProdutoElements{

    constructor(private page: Page){}

    addToCart = () =>
        this.page.getByRole('link',{name:'Add to cart'});

}
