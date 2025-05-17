import { getBody } from '../support/app.po';

describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should render the app', () => {
    getBody().should('exist');
  });

  // TODO: implement more tests
});
