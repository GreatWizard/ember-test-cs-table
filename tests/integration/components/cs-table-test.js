import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Component | cs-table', function (hooks) {
  setupRenderingTest(hooks)

  test('it renders without structure and rows', async function (assert) {
    await render(hbs`<CsTable />`)
    assert.dom('[data-test-cs-table]').exists('Table is displayed')
    assert
      .dom('[data-test-cs-table-header]')
      .doesNotExist('Table header is not displayed')
    assert
      .dom('[data-test-cs-table-body]')
      .doesNotExist('Table body is not displayed')
    assert.dom('[data-test-cs-table-row]').doesNotExist('There is no row')
    assert
      .dom('[data-test-cs-table-empty]')
      .exists('Empty message is displayed')
  })

  test('it renders with structure without rows', async function (assert) {
    this.set('structure', [
      { key: 'name', label: 'Name' },
      { key: 'device', label: 'Device' },
      { key: 'path', label: 'Path' },
      { key: 'status', label: 'Status' },
    ])
    await render(hbs`<CsTable @structure={{this.structure}} />`)
    assert.dom('[data-test-cs-table]').exists('Table is displayed')
    assert
      .dom('[data-test-cs-table-header]')
      .exists('Table header is displayed')
    assert
      .dom('[data-test-cs-table-header-col="name"]')
      .exists('Name column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="device"]')
      .exists('Device column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="path"]')
      .exists('Path column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="status"]')
      .exists('Status column is displayed')
    assert
      .dom('[data-test-cs-table-body]')
      .doesNotExist('Table body is not displayed')
    assert.dom('[data-test-cs-table-row]').doesNotExist('There is no row')
    assert
      .dom('[data-test-cs-table-empty]')
      .exists('Empty message is displayed')
  })

  test('it renders with structure and rows', async function (assert) {
    this.set('structure', [
      { key: 'name', label: 'Name' },
      { key: 'device', label: 'Device' },
      { key: 'path', label: 'Path' },
      { key: 'status', label: 'Status' },
    ])
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
    await render(
      hbs`<CsTable @rows={{this.rows}} @structure={{this.structure}} />`
    )
    assert.dom('[data-test-cs-table]').exists('Table is displayed')
    assert
      .dom('[data-test-cs-table-header]')
      .exists('Table header is displayed')
    assert
      .dom('[data-test-cs-table-header-col="name"]')
      .exists('Name column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="device"]')
      .exists('Device column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="path"]')
      .exists('Path column is displayed')
    assert
      .dom('[data-test-cs-table-header-col="status"]')
      .exists('Status column is displayed')
    assert
      .dom('[data-test-cs-table-body="2"]')
      .exists('Table body is displayed')
    assert
      .dom('[data-test-cs-table-row]')
      .exists({ count: 2 }, 'Rows are displayed')
    assert
      .dom('[data-test-cs-table-empty]')
      .doesNotExist('Empty message is not displayed')
  })
})
