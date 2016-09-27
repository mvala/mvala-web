import { MvalaWebPage } from './app.po';

describe('mvala-web App', function() {
  let page: MvalaWebPage;

  beforeEach(() => {
    page = new MvalaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
