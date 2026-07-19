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
		return await this.elems.locatorExcluirLista().count();
	}

	private async esperarReducaoDaContagem(contagemAnterior: number, localizadorExcluir: Locator, timeout = 3000) {
		const start = Date.now();
		while (Date.now() - start < timeout) {
			const contagemAtual = await localizadorExcluir.count();
			if (contagemAtual < contagemAnterior) return;
			await this.page.waitForTimeout(150);
		}
	}

	async removerProdutoPorIndice(index: number): Promise<void> {
		const localizadorExcluir = this.elems.locatorExcluirLista();
		const count = await localizadorExcluir.count();

		let target: Locator;
		if (index < count) {
			target = localizadorExcluir.nth(index);
		} else {
			const tableRow = index + 2;
			target = this.elems.locatorExcluirPorLinha(tableRow);
		}

		await target.click();
		await this.esperarReducaoDaContagem(count, localizadorExcluir);
	}

	async validarQuantidadeDeItensEsperada(esperado: number): Promise<void> {
		const count = await this.elems.locatorExcluirLista().count();
		if (count !== esperado) throw new Error(`Esperado ${esperado} itens, encontrado ${count}`);
	}
}

