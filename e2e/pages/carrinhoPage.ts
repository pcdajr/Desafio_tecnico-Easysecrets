import { Page, Locator, expect } from '@playwright/test';
import { CarrinhoElements } from '../elements/carrinho-elements';
import HomePage from './homePage';
import ProdutoPage from './produtoPage';

export default class CarrinhoPage {

	private elems: CarrinhoElements;
	constructor(private page: Page) {
		this.elems = new CarrinhoElements(page);
	}

	async visitar() {
		await this.page.goto('/');
		await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
	}

	async abrirCarrinho() {
		await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
	}

	async contarItens(): Promise<number> {
		return await this.elems.locatorExcluirLista().count();
	}

	async validarQuantidadeDeItensEsperada(esperado: number): Promise<void> {
		const count = await this.contarItens();
		if (count !== esperado) throw new Error(`Esperado ${esperado} itens, encontrado ${count}`);
	}

	async obterTotal(): Promise<number> {
		const textoTotal = await this.page.locator('#totalp').textContent();
		const matchTotal = textoTotal?.match(/([0-9]+)/);

		if (!matchTotal) {
			throw new Error('Total do carrinho não encontrado.');
		}

		return Number(matchTotal[1]);
	}

	async removerItemPorNome(nomeProduto: string): Promise<void> {
		await this.page.locator('tr', { hasText: nomeProduto }).getByRole('link', { name: 'Delete' }).first().click();
	}

	async removerTodosItens(): Promise<void> {
		while (await this.elems.locatorExcluirLista().count()) {
			await this.elems.locatorExcluirLista().first().click();
		}
	}
	async adicionarAoCarrinhoNaPaginaDeProduto(page: any, produtoPage: ProdutoPage): Promise<number> {
	  const [alerta] = await Promise.all([
		page.waitForEvent('dialog'),
		produtoPage.adicionarAoCarrinho(),
	  ]);
	
	  expect(alerta.message()).toContain('Product added');
	  await alerta.accept();
	
	  const textoPagina = await page.locator('body').innerText();
	  const matchPreco = textoPagina.match(/\$(\d+)/);
	
	  if (!matchPreco) {
		throw new Error('Preço do produto não foi encontrado na página.');
	  }
	
	  return Number(matchPreco[1]);
	}
	
	async adicionarProdutoAoCarrinho(page: any, nomeProduto: string): Promise<number> {
	  const homePage = new HomePage(page);
	  const produtoPage = new ProdutoPage(page);
	
	  await homePage.visitar();
	  await produtoPage.abrirProduto(nomeProduto);
	
	  return this.adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);
	}
	
}

