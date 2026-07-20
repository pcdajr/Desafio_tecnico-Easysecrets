import { Page, Locator } from '@playwright/test';
import { CarrinhoElements } from '../elements/carrinho-elements';

export default class CarrinhoPage {

	private elems: CarrinhoElements;
	constructor(private page: Page) {
		this.elems = new CarrinhoElements(page); 
	}

	async visitar() {
		await this.page.goto('/');
		await this.page.getByRole('link', { name: 'Cart' }).click();
	}

	// Retorna quantos links de exclusão existem no carrinho
	async contarItens(): Promise<number> {
		return await this.elems.locatorExcluirLista().count();
	}

	// Verifica se o carrinho tem a quantidade esperada de itens
	async validarQuantidadeDeItensEsperada(esperado: number): Promise<void> {
		const count = await this.elems.locatorExcluirLista().count();
		if (count !== esperado) throw new Error(`Esperado ${esperado} itens, encontrado ${count}`);
	}
}

