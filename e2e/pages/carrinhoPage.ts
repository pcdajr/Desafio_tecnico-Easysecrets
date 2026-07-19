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

	async contarItens(): Promise<number> {
		return await this.elems.deleteLista().count();
	}

	private async waitForCountDecrease(prevCount: number, deletesLocator: Locator, timeout = 3000) {
		const start = Date.now();
		while (Date.now() - start < timeout) {
			const c = await deletesLocator.count();
			if (c < prevCount) return;
			await this.page.waitForTimeout(150);
		}
	}

	async removerProdutoPorIndice(index: number): Promise<void> {
		const deletes = this.elems.deleteLista();
		const count = await deletes.count();

		let target: Locator;
		if (index < count) {
			target = deletes.nth(index);
		} else {
			const tableRow = index + 2;
			target = this.page.locator(`tr:nth-child(${tableRow}) > td:nth-child(4) > a`);
		}

		await target.click();
		await this.waitForCountDecrease(count, deletes);
	}

	async removerPorNome(productName: string): Promise<void> {
		const target = this.elems.deletePorNomeProduto(productName);
		const prev = await this.elems.deleteLista().count();
		await target.click();
		await this.waitForCountDecrease(prev, this.elems.deleteLista());
	}

	async removerTodosProdutos(): Promise<void> {
		let count = await this.elems.deleteLista().count();
		while (count > 0) {
			await this.removerProdutoPorIndice(0);
			count = await this.elems.deleteLista().count();
		}
	}

	async validarQuantidadeDeItensEsperada(expected: number): Promise<void> {
		const count = await this.elems.deleteLista().count();
		if (count !== expected) throw new Error(`Esperado ${expected} itens, encontrado ${count}`);
	}
}

