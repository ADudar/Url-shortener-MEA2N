import { TestnewcliPage } from './app.po';

describe('testnewcli App', function() {
  let page: TestnewcliPage;

  beforeEach(() => {
    page = new TestnewcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
