import { AppPage } from './app.po';

describe('Timebox-Timer App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Timebox-Timer');
  });
});
