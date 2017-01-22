import { FolderPage } from './app.po';

describe('folder App', function() {
  let page: FolderPage;

  beforeEach(() => {
    page = new FolderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
