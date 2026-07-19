import { Page, Locator } from "@playwright/test";

export class CarrinhoElements {
  constructor(private page: Page) {}

  // Botão para finalizar pedido (Place Order)
  locatorFecharPedido = () =>
    this.page.getByRole('button', { name: 'Place Order' });

  // Todos os links 'Delete' na tabela
  locatorExcluirLista = () => this.page.getByRole('link', { name: 'Delete' });

  // Fallback: localizar o link 'Delete' dentro de uma linha de tabela
  // rowNumber é a linha no DOM (1 = primeira linha de dados)
  locatorExcluirPorLinha = (rowNumber: number): Locator =>
    this.page.locator(`tr:nth-child(${rowNumber}) > td:nth-child(4) > a`);

  // Localizar delete pelo nome do produto (mais robusto)
  locatorExcluirPorNomeProduto = (productName: string): Locator =>
    this.page.locator('tr', { hasText: productName }).getByRole('link', { name: 'Delete' });
}
  