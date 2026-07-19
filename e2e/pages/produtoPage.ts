import { Page } from '@playwright/test';
import { ProdutoElements } from '../elements/produto-elements';

export default class ProdutoPage {
  private elementos: ProdutoElements;

  constructor(private page: Page) {
    this.elementos = new ProdutoElements(page);
  }

  // Vai para a página inicial onde estão os produtos
  async visitar() {
    await this.page.goto('/');
  }

  // Seleciona uma categoria de produto na página inicial
  async selecionarCategoria(categoria: 'Phones' | 'Laptops' | 'Monitors') {
    await this.elementos.locatorLinkCategoria(categoria).click();
  }

  // Abre a página do produto pelo nome
  async abrirProduto(nome: string) {
    await this.elementos.locatorLinkProduto(nome).click();
  }

  // Clica no botão de adicionar ao carrinho dentro da página do produto
  async adicionarAoCarrinho() {
    await this.elementos.locatorLinkAdicionarAoCarrinho().click();
  }

  // Abre o produto pelo nome e adiciona ao carrinho
  async adicionarProdutoAoCarrinho(nome: string) {
    await this.abrirProduto(nome);
    await this.adicionarAoCarrinho();
  }

  // Adiciona ao carrinho usando o índice do botão 'Add to cart'
  async adicionarProdutoAoCarrinhoPorIndice(index: number) {
    await this.elementos.locatorBotoesAdicionarAoCarrinho().nth(index).click();
  }

  // Adiciona produto pelo nome ou pelo índice, conforme informado
  async adicionarProdutoPeloNomeOuIndice(nome?: string, index?: number) {
    if (nome) {
      await this.adicionarProdutoAoCarrinho(nome);
      return;
    }

    if (index !== undefined) {
      await this.adicionarProdutoAoCarrinhoPorIndice(index);
      return;
    }

    throw new Error('Informe nome ou índice do produto para adicionar ao carrinho');
  }
}
