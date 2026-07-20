import { Page } from '@playwright/test';
import { HomeElements } from '../elements/home-elements';
import { Usuarios } from '../data/usuarios';

export default class HomePage {
  private elementos: HomeElements;

  constructor(private page: Page) {
    this.elementos = new HomeElements(page);
  }

  // Abre a página inicial do site
  async visitar() {
    await this.page.goto('/');
  }

  // Navega até a página do carrinho
  async abrirCarrinho() {
    await this.elementos.locatorLinkCarrinho().click();
  }

  // Abre o modal de login
  async abrirLogin() {
    await this.elementos.locatorLinkLogin().click();
  }

  // Abre o modal de cadastro
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

  // Preenche o nome de usuário no modal de cadastro
  async preencherCadastroUsuario(nome: string) {
    await this.elementos.locatorModalTextBoxNomeCadastro().fill(nome);
  }

  // Preenche a senha no modal de cadastro
  async preencherCadastroSenha(senha: string) {
    await this.elementos.locatorModalTextBoxSenha().fill(senha);
  }

  async clicarCadastrar() {
    await this.elementos.locatorModalBotaoCadastrar().click({ timeout: 5000 });
  }

  // Preenche o nome de usuário no modal de login
  async preencherLoginUsuario(usuario: string) {
    await this.elementos.locatorModalLoginInputNome().fill(usuario);
  }

  // Preenche a senha no modal de login
  async preencherLoginSenha(senha: string) {
    await this.elementos.locatorModalLoginInputSenha().fill(senha);
  }

  // Clica no botão de login para submeter o formulário
  async clicarEntrar() {
    await this.elementos.locatorModalBotaoLogin().click();
  }
}
