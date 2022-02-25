import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | cs-table/header', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders without structure', async function (assert) {
    await render(hbs`<CsTable::Header />`)
    assert
      .dom('[data-test-cs-table-header-col]')
      .doesNotExist('No header column is displayed')
  })

  test('it renders with structure', async function (assert) {
    this.set('structure', [
      { key: 'name', label: 'Name' },
      { key: 'device', label: 'Device' },
      { key: 'path', label: 'Path' },
      { key: 'status', label: 'Status' },
    ])
    await render(hbs`<CsTable::Header @structure={{this.structure}} />`)
    assert.dom('[data-test-cs-table-header-col="name"]').hasText('Name')
    assert.dom('[data-test-cs-table-header-col="device"]').hasText('Device')
    assert.dom('[data-test-cs-table-header-col="path"]').hasText('Path')
    assert.dom('[data-test-cs-table-header-col="status"]').hasText('Status')
  })
})
