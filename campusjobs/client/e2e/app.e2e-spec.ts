import { CampusJobsClientPage } from './app.po';

describe('campus-jobs-client App', () => {
  let page: CampusJobsClientPage;

  beforeEach(() => {
    page = new CampusJobsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
