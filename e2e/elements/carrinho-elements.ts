import { Page, Locator } from "@playwright/test";

export class CarrinhoElements {
  constructor(private page: Page) {}

  // Botão para finalizar pedido (Place Order)
  fecharPedido = () =>
    this.page.getByRole('button', { name: 'Place Order' });

  // link/botão 'Delete' na lista (quando existe um único produto)
  deleteUnico = () =>
    this.page.getByRole('link', { name: 'Delete' }).first();
  
  // Todos os links 'Delete' na tabela
  deleteLista = () => this.page.getByRole('link', { name: 'Delete' });

  // Fallback: localizar o link 'Delete' dentro de uma linha de tabela
  // rowNumber é a linha no DOM (1 = primeira linha de dados)
  deletePorLinha = (rowNumber: number): Locator =>
    this.page.locator(`tr:nth-child(${rowNumber}) > td:nth-child(4) > a`);

  // Localizar delete pelo nome do produto (mais robusto)
  deletePorNomeProduto = (productName: string): Locator =>
    this.page.locator('tr', { hasText: productName }).getByRole('link', { name: 'Delete' });
}
  