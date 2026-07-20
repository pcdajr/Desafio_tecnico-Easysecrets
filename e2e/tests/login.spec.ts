import { expect, test } from '@playwright/test';
import { Usuarios } from '../data/usuarios';
import HomePage from '../pages/homePage';

test('CT01 - login com senha inválida em várias tentativas', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioSenhaErrada = Usuarios.get('usuarioSenhaErrada');

  await homePage.visitar();
  await homePage.abrirLogin();

  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    await homePage.preencherLoginUsuario(usuarioSenhaErrada.username);
    await homePage.preencherLoginSenha(usuarioSenhaErrada.password);

    const [alerta] = await Promise.all([
      page.waitForEvent('dialog'),
      homePage.clicarEntrar(),
    ]);

    expect(alerta.message()).toContain('Wrong password.');
    await alerta.accept();
    console.log(`Tentativa ${tentativa} de login com senha inválida validada.`);
  }
});

test('CT02 - login com senha inválida', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioSenhaErrada = Usuarios.get('usuarioSenhaErrada');

  await homePage.visitar();
  await homePage.abrirLogin();
  await homePage.preencherLoginUsuario(usuarioSenhaErrada.username);
  await homePage.preencherLoginSenha(usuarioSenhaErrada.password);

  const [alerta] = await Promise.all([
    page.waitForEvent('dialog'),
    homePage.clicarEntrar(),
  ]);

  expect(alerta.message()).toContain('Wrong password.');
  await alerta.accept();
});

test('CT03 - login com campos vazios', async ({ page }) => {
  const homePage = new HomePage(page);
  const usuarioVazio = Usuarios.get('usuarioVazio');

  await homePage.visitar();
  await homePage.abrirLogin();
  await homePage.preencherLoginUsuario(usuarioVazio.username);
  await homePage.preencherLoginSenha(usuarioVazio.password);

  const [alerta] = await Promise.all([
    page.waitForEvent('dialog'),
    homePage.clicarEntrar(),
  ]);

  expect(alerta.message()).toContain('Please fill out Username and Password.');
  await alerta.accept();
});
