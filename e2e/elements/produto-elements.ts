import { Page } from "@playwright/test";

export class ProdutoElements {
    constructor(private page: Page) {}

    // Localiza a categoria no menu de produtos
    locatorLinkCategoria = (categoria: 'Phones' | 'Laptops' | 'Monitors') =>
        this.page.getByRole('link', { name: categoria });

    // Localiza o produto pela string do nome
    locatorLinkProduto = (nome: string) =>
        this.page.getByRole('link', { name: nome });

    // Localiza o botão/link para adicionar um produto ao carrinho
    locatorLinkAdicionarAoCarrinho = () =>
        this.page.getByRole('link', { name: 'Add to cart' });

    // Localiza todos os botões de 'Add to cart' na lista de produtos
    locatorBotoesAdicionarAoCarrinho = () =>
        this.page.locator('a', { hasText: 'Add to cart' });
}
