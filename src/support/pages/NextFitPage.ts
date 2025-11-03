import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import NextFitElements from '../elements/NextFitElements';
import BasePage from './BasePage';

export default class NextFitPage extends BasePage {
  readonly nextFitElements: NextFitElements;
  private dadosFormulario: {
    nome: string;
    email: string;
    celular: string;
  };

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.nextFitElements = new NextFitElements(page);
    this.dadosFormulario = { nome: '', email: '', celular: '' };
  }

  async preencherFormulario(): Promise<void> {
    this.dadosFormulario.nome = faker.person.fullName();
    this.dadosFormulario.email = faker.internet.email();
    this.dadosFormulario.celular = faker.phone.number('##########');

    await this.nextFitElements.getCampoNome().fill(this.dadosFormulario.nome);
    await this.nextFitElements.getCampoEmail().fill(this.dadosFormulario.email);
    await this.nextFitElements.getCampoCelular().fill(this.dadosFormulario.celular);
    await this.nextFitElements.getCampoCelularConfirmacao().fill(this.dadosFormulario.celular);
    await this.nextFitElements.getSelectModelo().selectOption('Academia');
  }

  async enviarFormulario(): Promise<void> {
    await this.nextFitElements.getBotaoEnviar().click();
  }

  async validarEnvio(): Promise<void> {
    await this.page.waitForURL('**/typ-cadastro-sucesso/**', { timeout: 10000 });

    const urlAtual = this.page.url();

    expect(urlAtual).toContain('https://nextfit.com.br/typ-cadastro-sucesso/');

    const url = new URL(urlAtual);
    const params = url.searchParams;

    expect(params.get('nome')).toBe(this.dadosFormulario.nome);
    expect(params.get('email')).toBe(this.dadosFormulario.email);
    expect(params.get('telefone')).toBe(this.dadosFormulario.celular);
  }
}
