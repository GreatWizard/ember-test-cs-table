import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | cs-table/row', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders without data and structure', async function (assert) {
    await render(hbs`<CsTable::Row />`)
    assert.dom('[data-test-cs-table-row]').doesNotExist('Row is not displayed')
  })

  test('it renders with data without structure', async function (assert) {
    this.set('row', {
      test: 'ok',
    })
    await render(hbs`<CsTable::Row @row={{this.row}} />`)
    assert.dom('[data-test-cs-table-row]').exists('Row is displayed correctly')
    assert
      .dom('[data-test-cs-table-row-col="test"]')
      .exists('Row is displayed correctly')
  })

  test('it renders with data and structure', async function (assert) {
    this.set('structure', [
      { key: 'name' },
      { key: 'device' },
      { key: 'path' },
      { key: 'status' },
    ])
    this.set('row', {
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled',
    })
    await render(
      hbs`<CsTable::Row @row={{this.row}} @structure={{this.structure}} />`
    )
    assert.dom('[data-test-cs-table-row]').exists('Row is displayed correctly')
    assert
      .dom('[data-test-cs-table-row-col="name"]')
      .exists('Name column is displayed correctly')
    assert
      .dom('[data-test-cs-table-row-col="device"]')
      .exists('Device column is displayed correctly')
    assert
      .dom('[data-test-cs-table-row-col="path"]')
      .exists('Path column is displayed correctly')
    assert
      .dom('[data-test-cs-table-row-col="status"]')
      .exists('Status column is displayed correctly')
  })
})
