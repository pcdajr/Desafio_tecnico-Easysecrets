import { expect, Page, test } from '@playwright/test';
import HomePage from '../pages/homePage';
import ProdutoPage from '../pages/produtoPage';
import CarrinhoPage from '../pages/carrinhoPage';


// Testes adicionando produtos ao carrinho e validando o comportamento do mesmo

test('CT08 - adicionar 1 produto ao carrinho', async ({ page }) => {

  const carrinhoPage = new CarrinhoPage(page);
  const nomeProduto = 'Samsung galaxy s6';
  const precoProduto = await carrinhoPage.adicionarProdutoAoCarrinho(page, nomeProduto);

  await carrinhoPage.abrirCarrinho();

  const linhaProduto = page.locator('tr', { hasText: nomeProduto });
  await expect(linhaProduto).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(1);
  await expect(linhaProduto.first()).toContainText(nomeProduto);
  await expect(linhaProduto.first()).toContainText(String(precoProduto));

  const totalCarrinho = await carrinhoPage.obterTotal();
  expect(totalCarrinho).toBe(precoProduto);
});

test('CT09 - adicionar dois produtos diferentes', async ({ page }) => {
  const produtos = ['Samsung galaxy s6', 'Nokia lumia'];
  const precos: number[] = [];
  const carrinhoPage = new CarrinhoPage(page);

  for (const produto of produtos) {
    precos.push(await carrinhoPage.adicionarProdutoAoCarrinho(page, produto));
  }

  await carrinhoPage.abrirCarrinho();

  for (const produto of produtos) {
    await expect(page.locator('tr', { hasText: produto })).toHaveCount(1);
  }

  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(produtos.length);

  const totalCarrinho = await carrinhoPage.obterTotal();
  const totalEsperado = precos.reduce((soma, preco) => soma + preco, 0);

  expect(totalCarrinho).toBe(totalEsperado);
});

test('CT10 - adicionar o mesmo produto duas vezes', async ({ page }) => {
  const nomeProduto = 'Samsung galaxy s6';
  const homePage = new HomePage(page);
  const produtoPage = new ProdutoPage(page);
  const carrinhoPage = new CarrinhoPage(page);

  await homePage.visitar();
  await produtoPage.abrirProduto(nomeProduto);

  const precoProduto = await carrinhoPage.adicionarAoCarrinhoNaPaginaDeProduto(page, produtoPage);

  const [alertaSegundaInclusao] = await Promise.all([
    page.waitForEvent('dialog'),
    produtoPage.adicionarAoCarrinho(),
  ]);

  expect(alertaSegundaInclusao.message()).toContain('Product added');
  await alertaSegundaInclusao.accept();

  await carrinhoPage.abrirCarrinho();

  const linhasProduto = page.locator('tr', { hasText: nomeProduto });
  await expect(linhasProduto).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Delete' })).toHaveCount(2);
  await expect(linhasProduto.first()).toContainText(nomeProduto);
  await expect(linhasProduto.first()).toContainText(String(precoProduto));

  const totalCarrinho = await carrinhoPage.obterTotal();
  expect(totalCarrinho).toBe(precoProduto * 2);
});


