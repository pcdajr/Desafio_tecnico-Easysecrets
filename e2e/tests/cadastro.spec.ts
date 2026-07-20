import { expect, test } from '@playwright/test';
import { Usuarios } from '../data/usuarios';
import HomePage from '../pages/homePage';

test('CT01 - criação de cadastro válido', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioBase = Usuarios.usuarioValido;
  const usuario = {
    ...usuarioBase,
    username: `${usuarioBase.username}_${Date.now()}`,
  };

  await homePage.visitar();
  await homePage.abrirCadastro();
  await homePage.preencherCadastroUsuario(usuario.username);
  await homePage.preencherCadastroSenha(usuario.password);

  const [alerta] = await Promise.all([
    page.waitForEvent('dialog'),
    homePage.clicarCadastrar()
  ]);
  expect(alerta.message()).toContain('Sign up successful');
  await alerta.accept();
});


test('CT03 - cadastro com usuário já existente', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioDuplicado = Usuarios.usuarioDuplicado;

  await homePage.visitar();
  await homePage.abrirCadastro();
  await homePage.preencherCadastroUsuario(usuarioDuplicado.username);
  await homePage.preencherCadastroSenha(usuarioDuplicado.password);

  const [alerta] = await Promise.all([
    page.waitForEvent('dialog'),
    homePage.clicarCadastrar()
  ]);
  expect(alerta.message()).toContain('This user already exist');
  await alerta.accept();
});
