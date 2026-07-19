import { Page } from '@playwright/test';
import { HomeElements } from '../elements/home-elements';

export default class HomePage {
  private elementos: HomeElements;

  constructor(private page: Page) {
    this.elementos = new HomeElements(page);
  }

  async visitar() {
    await this.page.goto('/');
  }

  async abrirCarrinho() {
    await this.elementos.locatorLinkCarrinho().click();
  }

  async abrirLogin() {
    await this.elementos.locatorLinkLogin().click();
  }

  async abrirCadastro() {
    await this.elementos.locatorLinkCadastrar().click();
  }

  async selecionarCategoria(categoria: 'Phones' | 'Laptops' | 'Monitors') {
    if (categoria === 'Phones') {
      await this.elementos.locatorLinkPhones().click();
      return;
    }

    if (categoria === 'Laptops') {
      await this.elementos.locatorLinkLaptops().click();
      return;
    }

    await this.elementos.locatorLinkMonitors().click();
  }

  async avancarCarrossel() {
    await this.elementos.locatorBotaoProximo().click();
  }

  async voltarCarrossel() {
    await this.elementos.locatorBotaoAnterior().click();
  }

  async preencherCadastroUsuario(nome: string) {
    await this.elementos.locatorModalTextBoxNomeCadastro().fill(nome);
  }

  async preencherCadastroSenha(senha: string) {
    await this.elementos.locatorModalTextBoxSenha().fill(senha);
  }

  async clicarCadastrar() {
    await this.elementos.locatorModalBotaoCadastrar().click();
  }

  async preencherLoginUsuario(usuario: string) {
    await this.elementos.locatorModalLoginInputNome().fill(usuario);
  }

  async preencherLoginSenha(senha: string) {
    await this.elementos.locatorModalLoginInputSenha().fill(senha);
  }

  async clicarEntrar() {
    await this.elementos.locatorModalBotaoLogin().click();
  }
}
