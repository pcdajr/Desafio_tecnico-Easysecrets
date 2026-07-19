import { Page } from '@playwright/test';
import { ProdutoElements } from '../elements/produto-elements';

export default class ProdutoPage {
  private elementos: ProdutoElements;

  constructor(private page: Page) {
    this.elementos = new ProdutoElements(page);
  }

  async visitar() {
    await this.page.goto('/');
  }

  async selecionarCategoria(categoria: 'Phones' | 'Laptops' | 'Monitors') {
    await this.elementos.locatorLinkCategoria(categoria).click();
  }

  async abrirProduto(nome: string) {
    await this.elementos.locatorLinkProduto(nome).click();
  }

  async adicionarAoCarrinho() {
    await this.elementos.locatorLinkAdicionarAoCarrinho().click();
  }

  async adicionarProdutoAoCarrinho(nome: string) {
    await this.abrirProduto(nome);
    await this.adicionarAoCarrinho();
  }

  async adicionarProdutoAoCarrinhoPorIndice(index: number) {
    await this.elementos.locatorBotoesAdicionarAoCarrinho().nth(index).click();
  }

  async adicionarProdutoPeloNomeOuIndice(nome?: string, index?: number) {
    if (nome) {
      await this.adicionarProdutoAoCarrinho(nome);
      return;
    }

    if (index !== undefined) {
      await this.adicionarProdutoAoCarrinhoPorIndice(index);
      return;
    }

    throw new Error('Informe nome ou �ndice do produto para adicionar ao carrinho');
  }
}
