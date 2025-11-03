import { test } from '@playwright/test';
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
});
