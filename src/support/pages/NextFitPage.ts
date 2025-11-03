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

    await this.nextFitElements.getCampoNome().waitFor({ state: 'visible' });
    await this.nextFitElements.getCampoNome().fill(this.dadosFormulario.nome);

    await this.nextFitElements.getCampoEmail().fill(this.dadosFormulario.email);

    await this.nextFitElements.getCampoCelular().fill(this.dadosFormulario.celular);

    await this.nextFitElements.getCampoCelularConfirmacao().fill(this.dadosFormulario.celular);

    await this.nextFitElements.getSelectModelo().selectOption('Academia');
  }

  async enviarFormulario(): Promise<void> {
    await this.nextFitElements.getBotaoEnviar().scrollIntoViewIfNeeded();
    await this.nextFitElements.getBotaoEnviar().waitFor({ state: 'visible' });
    await this.page.waitForTimeout(1000);
    await this.nextFitElements.getBotaoEnviar().click();
  }

  async validarEnvio(): Promise<void> {
    const mensagemSucesso = this.page.locator('text=Enviado com Sucesso');
    await expect(mensagemSucesso).toBeVisible({ timeout: 15000 });
  }
}
