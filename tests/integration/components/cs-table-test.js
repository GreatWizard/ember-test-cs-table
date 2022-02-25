import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | cs-table', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders without rows', async function (assert) {
    await render(hbs`<CsTable />`)
    assert.dom('[data-test-cs-table]').exists('Table is displayed')
    assert
      .dom('[data-test-cs-table-header]')
      .exists('Table header is displayed')
    assert
      .dom('[data-test-cs-table-body]')
      .doesNotExist('Table body is not displayed')
    assert.dom('[data-test-cs-table-row]').doesNotExist('There is no row')
    assert
      .dom('[data-test-cs-table-empty]')
      .exists('Empty message is displayed')
  })

  test('it renders with rows', async function (assert) {
    this.set('rows', [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ])
    await render(hbs`<CsTable @rows={{this.rows}} />`)
    assert.dom('[data-test-cs-table]').exists('Table is displayed')
    assert
      .dom('[data-test-cs-table-header]')
      .exists('Table header is displayed')
    assert
      .dom('[data-test-cs-table-body="2"]')
      .exists('Table body is displayed')
    assert
      .dom('[data-test-cs-table-row]')
      .exists({ count: 2 }, 'Rows are displayed correctly')
    assert
      .dom('[data-test-cs-table-empty]')
      .doesNotExist('Empty message is not displayed')
  })
})
