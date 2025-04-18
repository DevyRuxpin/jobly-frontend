describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to login page', () => {
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
  });

  it('should show error on invalid login', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('invalid');
    cy.get('input[name="password"]').type('invalid');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-danger').should('be.visible');
  });

  it('should successfully login with valid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');
    cy.get('.navbar').should('contain', 'Logout');
  });

  it('should navigate to signup page', () => {
    cy.contains('Sign up').click();
    cy.url().should('include', '/signup');
  });

  it('should show validation errors on signup form', () => {
    cy.visit('/signup');
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('have.length.at.least', 1);
  });

  it('should successfully signup with valid data', () => {
    cy.visit('/signup');
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/signup');
    cy.get('.navbar').should('contain', 'Logout');
  });

  it('should logout successfully', () => {
    // First login
    cy.visit('/login');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    // Then logout
    cy.contains('Logout').click();
    cy.url().should('include', '/');
    cy.get('.navbar').should('contain', 'Login');
  });
}); 