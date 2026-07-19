import { Page } from "@playwright/test";

export class ProdutoElements{

    constructor(private page: Page){}

    // Elemento do botão "Add to cart" (dentro da página de produtos)

    locatorLinkAdicionarAoCarrinho = () =>
        this.page.getByRole('link',{name:'Add to cart'});

}
