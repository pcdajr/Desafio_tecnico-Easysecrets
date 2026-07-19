import { expect, test } from '@playwright/test';
import { Usuarios } from '../data/usuarios';
import HomePage from '../pages/homePage';

test('CT01 - criação de cadastro válido', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioBase = Usuarios.get('usuarioValido');
  const usuario = {
    ...usuarioBase,
    username: `${usuarioBase.username}_${Date.now()}`,
  };

  await homePage.visitar();
  await homePage.abrirCadastro();
  await homePage.preencherCadastroUsuario(usuario.username);
  await homePage.preencherCadastroSenha(usuario.password);

  const dialog = page.waitForEvent('dialog');
  await homePage.clicarCadastrar();

  const alerta = await dialog;
  expect(alerta.message()).toContain('Sign up successful');
  await alerta.accept();
});
