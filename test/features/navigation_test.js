describe('options page test', function () {
  it('loads the options page', function () {
    console.warn(browser.element('body').getText())
    expect(browser.element('body').getText()).toContain('What')
  })
})