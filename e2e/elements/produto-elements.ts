import { Page } from "@playwright/test";

export class ProdutoElements {
    constructor(private page: Page) {}

    locatorLinkCategoria = (categoria: 'Phones' | 'Laptops' | 'Monitors') =>
        this.page.getByRole('link', { name: categoria });

    locatorLinkProduto = (nome: string) =>
        this.page.getByRole('link', { name: nome });

    locatorLinkAdicionarAoCarrinho = () =>
        this.page.getByRole('link', { name: 'Add to cart' });

    locatorBotoesAdicionarAoCarrinho = () =>
        this.page.locator('a', { hasText: 'Add to cart' });
}
