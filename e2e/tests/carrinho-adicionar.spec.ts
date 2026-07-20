import { expect, test, type Page } from '@playwright/test';
import HomePage from '../pages/homePage';
import ProdutoPage from '../pages/produtoPage';

async function adicionarAoCarrinhoNaPaginaDeProduto(page: Page, produtoPage: ProdutoPage): Promise<number> {
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

async function adicionarProdutoAoCarrinho(page: Page, nomeProduto: string): Promise<number> {
  const homePage = new HomePage(page);
  const produtoPage = new ProdutoPage(page);

  await homePage.visitar();
  await produtoPage.abrirProduto(nomeProduto);

  return adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);
}

async function abrirCarrinho(page: Page) {
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
}

async function obterTotalCarrinho(page: Page): Promise<number> {
  const textoTotal = await page.locator('#totalp').textContent();
  const matchTotal = textoTotal?.match(/([0-9]+)/);

  if (!matchTotal) {
    throw new Error('Total do carrinho não encontrado.');
  }

  return Number(matchTotal[1]);
}


// Testes adicionando produtos ao carrinho e validando o comportamento do mesmo

test('CT01 - adicionar 1 produto ao carrinho', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const precoProduto = await adicionarProdutoAoCarrinho(page, nomeProduto);

  await abrirCarrinho(page);

  const linhaProduto = page.locator('tr', { hasText: nomeProduto });
  await expect(linhaProduto).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);
  await expect(linhaProduto.first()).toContainText(nomeProduto);
  await expect(linhaProduto.first()).toContainText(String(precoProduto));

  const totalCarrinho = await obterTotalCarrinho(page);
  expect(totalCarrinho).toBe(precoProduto);
});

test('CT02 - adicionar dois produtos diferentes', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia'];
  const precos: number[] = [];

  for (const produto of produtos) {
    precos.push(await adicionarProdutoAoCarrinho(page, produto));
  }

  await abrirCarrinho(page);

  for (const produto of produtos) {
    await expect(page.locator('tr', { hasText: produto })).toHaveCount(1);
  }

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(produtos.length);

  const totalCarrinho = await obterTotalCarrinho(page);
  const totalEsperado = precos.reduce((soma, preco) => soma + preco, 0);

  expect(totalCarrinho).toBe(totalEsperado);
});

test('CT03 - adicionar o mesmo produto duas vezes', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const homePage = new HomePage(page);
  const produtoPage = new ProdutoPage(page);

  await homePage.visitar();
  await produtoPage.abrirProduto(nomeProduto);

  const precoProduto = await adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);

  const [alertaSegundaInclusao] = await Promise.all([
    page.waitForEvent('dialog'),
    produtoPage.adicionarAoCarrinho(),
  ]);

  expect(alertaSegundaInclusao.message()).toContain('Product added');
  await alertaSegundaInclusao.accept();

  await abrirCarrinho(page);

  const linhasProduto = page.locator('tr', { hasText: nomeProduto });
  await expect(linhasProduto).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(2);
  await expect(linhasProduto.first()).toContainText(nomeProduto);
  await expect(linhasProduto.first()).toContainText(String(precoProduto));

  const totalCarrinho = await obterTotalCarrinho(page);
  expect(totalCarrinho).toBe(precoProduto * 2);
});

