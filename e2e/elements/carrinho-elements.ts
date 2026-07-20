import { Page, Locator } from "@playwright/test";

export class CarrinhoElements {
  constructor(private page: Page) {}

  // Todos os links 'Delete' na tabela
  locatorExcluirLista = () => this.page.getByRole('link', { name: 'Delete' });
  
}
  