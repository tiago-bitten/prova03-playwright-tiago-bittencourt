import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class NextFitElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('input[name="form_fields[name]"]');
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[name="form_fields[email]"]');
  }

  getCampoCelular(): Locator {
    return this.page.locator('input[name="form_fields[celular]"]');
  }

  getCampoCelularConfirmacao(): Locator {
    return this.page.locator('input[name="form_fields[celularconfimacao]"]');
  }

  getSelectModelo(): Locator {
    return this.page.locator('select[name="form_fields[modelo]"]');
  }

  getBotaoEnviar(): Locator {
    return this.page.locator('button[type="submit"].elementor-button.elementor-size-lg.elementor-animation-grow');
  }
}
