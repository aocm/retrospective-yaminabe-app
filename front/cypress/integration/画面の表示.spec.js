
beforeEach(() => {
  cy.intercept(`${window.origin}/api/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients')
  cy.intercept(`${window.origin}/api/ingredients/1`, { fixture: 'ingredients_1.json' }).as('getIngredients1')
  cy.intercept('POST', `${window.origin}/api/ingredients`, {
    statusCode: 200,
    body: 'it worked!',
  })
  cy.visit('/')
})
describe('画面表示、画面遷移の確認', () => {
  it('トップページの確認', () => {
    cy.get('#id_title').should('have.text', 'ふりかえり闇鍋をはじめます')
    cy.screenshot('トップページの確認')
  })
  it('会場へ移動できることを確認する', () => {
    cy.contains('会場へ').click()
    cy.wait('@getIngredients')
    cy.wait(500)
    cy.get('ion-button[id="add_form"]').should('have.text', ' 追加投稿フォーム ') // なぜ半角スペースで囲まれているか不明
    cy.screenshot('会場の確認')
  })
  it('詳細ページへ遷移する', () => {
    cy.contains('会場へ').click()
    cy.wait('@getIngredients')
    cy.wait(500)
    cy.contains('山田 1郎').click()
    cy.wait(500)
    cy.get('#fromName').should('have.text', '山田 1郎')
    cy.screenshot('詳細ページ')
  })
  
})
