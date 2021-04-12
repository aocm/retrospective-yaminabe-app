describe('画面表示、画面遷移の確認', () => {
  it('トップページの確認', () => {
    cy.visit('/')
    cy.get('#id_title').should('have.text', 'ふりかえり闇鍋をはじめます')
    cy.screenshot('トップページの確認')
  })
  it('会場へ移動', () => {
    cy.intercept('http://web/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
    cy.visit('/')
    // cy.get('#id_gotohome_button').click()
    cy.contains('会場へ').click()
    cy.wait(500)
    cy.wait('@getIngredients')
    expect(cy.contains('追加投稿フォーム')).to.exist
    cy.screenshot('会場の確認')
  })
})