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
    this.dadosFormulario.celular = '48999887766';

    await this.nextFitElements.getCampoNome().waitFor({ state: 'visible' });
    await this.nextFitElements.getCampoNome().clear();
    await this.nextFitElements.getCampoNome().fill(this.dadosFormulario.nome);
    await this.nextFitElements.getCampoNome().press('Tab');

    await this.nextFitElements.getCampoEmail().clear();
    await this.nextFitElements.getCampoEmail().fill(this.dadosFormulario.email);
    await this.nextFitElements.getCampoEmail().press('Tab');

    await this.nextFitElements.getCampoCelular().clear();
    await this.nextFitElements.getCampoCelular().fill(this.dadosFormulario.celular);
    await this.nextFitElements.getCampoCelular().press('Tab');

    await this.nextFitElements.getCampoCelularConfirmacao().clear();
    await this.nextFitElements.getCampoCelularConfirmacao().fill(this.dadosFormulario.celular);
    await this.nextFitElements.getCampoCelularConfirmacao().press('Tab');

    await this.nextFitElements.getSelectModelo().selectOption('Academia');
    await this.page.waitForTimeout(500);
  }

  async enviarFormulario(): Promise<void> {
    await this.nextFitElements.getBotaoEnviar().scrollIntoViewIfNeeded();
    await this.nextFitElements.getBotaoEnviar().waitFor({ state: 'visible' });

    const isEnabled = await this.nextFitElements.getBotaoEnviar().isEnabled();
    console.log('Botão está habilitado:', isEnabled);

    const errorMessages = await this.page.locator('.elementor-message-danger, .elementor-error, .error, [role="alert"]').count();
    console.log('Mensagens de erro encontradas:', errorMessages);

    if (errorMessages > 0) {
      const errorTexts = await this.page.locator('.elementor-message-danger, .elementor-error, .error, [role="alert"]').allTextContents();
      console.log('Textos de erro:', errorTexts);
    }

    await this.page.waitForTimeout(1000);

    await Promise.race([
      this.nextFitElements.getMensagemSucesso().waitFor({ state: 'visible', timeout: 5000 }),
      this.nextFitElements.getBotaoEnviar().click({ force: true })
    ]).catch(() => {
      console.log('Clique executado, aguardando resposta...');
    });

    await this.page.waitForTimeout(2000);
  }

  async validarEnvio(): Promise<void> {
    await expect(this.nextFitElements.getMensagemSucesso()).toBeVisible({ timeout: 15000 });
  }
}
