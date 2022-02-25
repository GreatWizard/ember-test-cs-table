import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | cs-table/row', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders without data', async function (assert) {
    await render(hbs`<CsTable::Row />`)
    assert.dom('[data-test-cs-table-row]').doesNotExist('Row is not displayed')
  })

  test('it renders with data', async function (assert) {
    this.set('row', {
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled',
    })
    await render(hbs`<CsTable::Row @row={{this.row}} />`)
    assert.dom('[data-test-cs-table-row]').exists('Row is displayed correctly')
  })
})
