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

test('CT04 - remover o único produto do carrinho', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  await adicionarProdutoAoCarrinho(page, nomeProduto);

  await abrirCarrinho(page);
  await page.getByRole('link', { name: 'Delete' }).first().click();

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(0);
});

test('CT05 - remover um produto entre vários', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia'];
  const precos: number[] = [];

  for (const produto of produtos) {
    precos.push(await adicionarProdutoAoCarrinho(page, produto));
  }

  await abrirCarrinho(page);
  await page.locator('tr', { hasText: 'Nokia lumia' }).getByRole('link', { name: 'Delete' }).click();

  await expect(page.locator('tr', { hasText: 'Nokia lumia' })).toHaveCount(0);
  await expect(page.locator('tr', { hasText: 'Samsung galaxy s6' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);

  const totalCarrinho = await obterTotalCarrinho(page);
  expect(totalCarrinho).toBe(precos[0]);
});

test('CT06 - validar o valor total após a remoção', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia'];
  const precos: number[] = [];

  for (const produto of produtos) {
    precos.push(await adicionarProdutoAoCarrinho(page, produto));
  }

  await abrirCarrinho(page);
  const totalAntes = precos.reduce((soma, preco) => soma + preco, 0);
  expect(await obterTotalCarrinho(page)).toBe(totalAntes);

  await page.locator('tr', { hasText: 'Nokia lumia' }).getByRole('link', { name: 'Delete' }).click();

  const totalDepois = await obterTotalCarrinho(page);
  expect(totalDepois).toBe(precos[0]);
});

test('CT07 - remover uma ocorrência de produto duplicado', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const homePage = new HomePage(page);
  const produtoPage = new ProdutoPage(page);

  await homePage.visitar();
  await produtoPage.abrirProduto(nomeProduto);
  await adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);

  const [alertaSegundaInclusao] = await Promise.all([
    page.waitForEvent('dialog'),
    produtoPage.adicionarAoCarrinho(),
  ]);
  expect(alertaSegundaInclusao.message()).toContain('Product added');
  await alertaSegundaInclusao.accept();

  await abrirCarrinho(page);
  await page.locator('tr', { hasText: nomeProduto }).first().getByRole('link', { name: 'Delete' }).click();

  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);
  const totalCarrinho = await obterTotalCarrinho(page);
  expect(totalCarrinho).toBe(360);
});

test('CT08 - remover todos os produtos do carrinho', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia', 'Sony vaio i5'];

  for (const produto of produtos) {
    await adicionarProdutoAoCarrinho(page, produto);
  }

  await abrirCarrinho(page);

  while (await page.getByRole('link', { name: 'Delete' }).count()) {
    await page.getByRole('link', { name: 'Delete' }).first().click();
  }

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
  await expect(page.locator('#tbodyid tr')).toHaveCount(0);
  await expect(page.locator('#totalp')).toContainText('0');
});

test('CT09 - atualizar a página depois da remoção', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  await adicionarProdutoAoCarrinho(page, nomeProduto);

  await abrirCarrinho(page);
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.reload();

  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
});
