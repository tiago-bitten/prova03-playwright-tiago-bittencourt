import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import NextFitPage from '../support/pages/NextFitPage';

test.describe('Testes funcionais no site da NextFit', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let nextFitPage: NextFitPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.nextfit')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    nextFitPage = new NextFitPage(page);
    await page.goto(BASE_URL);
  });

  test('Enviar formulário de sistema para academia', async () => {
    await nextFitPage.preencherFormulario();
    await nextFitPage.enviarFormulario();
    await nextFitPage.validarEnvio();
  });

  test('Preencher somente e-mail deve deixar o campo de nome com foco no cursor', async ({ page }) => {
    const nextFitElements = new NextFitPage(page).nextFitElements;
  
    await nextFitElements.getCampoEmail().waitFor({ state: 'visible' });
  
    const email = 'teste.focus@exemplo.com';
    await nextFitElements.getCampoEmail().fill(email);
  
    await nextFitElements.getCampoEmail().press('Tab');
  
    await nextFitElements.getBotaoEnviar().click({ force: true });
  
    await page.waitForTimeout(500);
  
    const focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('name'));
  
    expect(focusedElement).toBe('form_fields[name]');
  
    console.log('Elemento em foco após envio inválido:', focusedElement);
  });
});
