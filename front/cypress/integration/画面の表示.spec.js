describe('画面表示、画面遷移の確認', () => {
  it('トップページの確認', () => {
    cy.visit('/')
    // FizzBuzzという文言が表示されていることを確認する
    expect(cy.contains('ふりかえり闇鍋をはじめます')).to.exist
    cy.screenshot('トップページの確認')
  })
})