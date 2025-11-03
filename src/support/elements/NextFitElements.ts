import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class NextFitElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('input[name="form_fields[name]"]').first();
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[name="form_fields[email]"]').first();
  }

  getCampoCelular(): Locator {
    return this.page.locator('input[name="form_fields[celular]"]').first();
  }

  getCampoCelularConfirmacao(): Locator {
    return this.page.locator('input[name="form_fields[celularconfimacao]"]').first();
  }

  getSelectModelo(): Locator {
    return this.page.locator('select[name="form_fields[modelo]"]').first();
  }

  getBotaoEnviar(): Locator {
    return this.page.locator('button[type="submit"].elementor-button.elementor-size-lg.elementor-animation-grow').first();
  }

  getMensagemSucesso(): Locator {
    return this.page.locator('text= Enviado com Sucesso.').first();
  }
}
