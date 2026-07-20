import { expect, test } from '@playwright/test';
import HomePage from '../pages/homePage';
import ProdutoPage from '../pages/produtoPage';
import CarrinhoPage from '../pages/carrinhoPage';

// Testes removendo produtos ao carrinho e validando o comportamento do mesmo

test('CT04 - remover o único produto do carrinho', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const carrinhoPage = new CarrinhoPage(page);

  await carrinhoPage.adicionarProdutoAoCarrinho(page, nomeProduto);
  await carrinhoPage.abrirCarrinho();
  await carrinhoPage.removerItemPorNome(nomeProduto);

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(0);
});

test('CT05 - remover um produto entre vários', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia'];
  const precos: number[] = [];
  const carrinhoPage = new CarrinhoPage(page);

  for (const produto of produtos) {
    precos.push(await carrinhoPage.adicionarProdutoAoCarrinho(page, produto));
  }

  await carrinhoPage.abrirCarrinho();
  await carrinhoPage.removerItemPorNome('Nokia lumia');

  await expect(page.locator('tr', { hasText: 'Nokia lumia' })).toHaveCount(0);
  await expect(page.locator('tr', { hasText: 'Samsung galaxy s6' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);

  const totalCarrinho = await carrinhoPage.obterTotal();
  expect(totalCarrinho).toBe(precos[0]);
});


test('CT07 - remover uma ocorrência de produto duplicado', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const homePage = new HomePage(page);
  const produtoPage = new ProdutoPage(page);
  const carrinhoPage = new CarrinhoPage(page);

  await homePage.visitar();
  await produtoPage.abrirProduto(nomeProduto);
  await carrinhoPage.adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);

  const [alertaSegundaInclusao] = await Promise.all([
    page.waitForEvent('dialog'),
    produtoPage.adicionarAoCarrinho(),
  ]);
  expect(alertaSegundaInclusao.message()).toContain('Product added');
  await alertaSegundaInclusao.accept();

  await carrinhoPage.abrirCarrinho();
  await carrinhoPage.removerItemPorNome(nomeProduto);

  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);
  const totalCarrinho = await carrinhoPage.obterTotal();
  expect(totalCarrinho).toBe(360);
});

test('CT08 - remover todos os produtos do carrinho', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia', 'Sony vaio i5'];
  const carrinhoPage = new CarrinhoPage(page);

  for (const produto of produtos) {
    await carrinhoPage.adicionarProdutoAoCarrinho(page, produto);
  }

  await carrinhoPage.abrirCarrinho();
  await carrinhoPage.removerTodosItens();

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
  await expect(page.locator('#tbodyid tr')).toHaveCount(0);
  await expect(page.locator('#totalp')).toContainText('0');
});

test('CT09 - atualizar a página depois da remoção', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const carrinhoPage = new CarrinhoPage(page);

  await carrinhoPage.adicionarProdutoAoCarrinho(page, nomeProduto);
  await carrinhoPage.abrirCarrinho();
  await carrinhoPage.removerItemPorNome(nomeProduto);
  await page.reload();

  await expect(page.locator('tr', { hasText: nomeProduto })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(0);
});
