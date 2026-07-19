import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage';
import CarrinhoPage from '../pages/carrinhoPage';
import ProdutoPage from '../pages/produtoPage';

test.describe('Cadastro de usuário', () => {
    test('Visitar página inicial', async ({ page }) => {
        
        const Carrinho = new CarrinhoPage(page);
        
        await Carrinho.visitar();


    });
});



