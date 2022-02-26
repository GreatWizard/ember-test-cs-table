import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { click, render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'
import { getOwner } from '@ember/application'
import Component from '@glimmer/component'
import { setComponentTemplate } from '@ember/component'

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

  test('it selects all items when click on the select-all checkbox', async function (assert) {
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
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert.dom('[data-test-select-all]').hasText('None selected')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .doesNotExist('No row is selected')
    await click('[data-test-select-all-checkbox]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isChecked('Select all checkbox is checked')
    assert.dom('[data-test-select-all]').hasText('Selected 2')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .exists({ count: 2 }, 'All rows are selected')
    await click('[data-test-select-all-checkbox]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert.dom('[data-test-select-all]').hasText('None selected')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .doesNotExist('No row is selected')
  })

  test('it selects row one by one', async function (assert) {
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
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert
      .dom('[data-test-select-all-checkbox]')
      .hasProperty(
        'indeterminate',
        false,
        'Select all checkbox is not indeterminated'
      )
    assert.dom('[data-test-select-all]').hasText('None selected')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .doesNotExist('No row is selected')
    await click('[data-test-cs-table-row-select="selectable"]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert
      .dom('[data-test-select-all-checkbox]')
      .hasProperty(
        'indeterminate',
        true,
        'Select all checkbox is indeterminated'
      )
    assert.dom('[data-test-select-all]').hasText('Selected 1')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .exists({ count: 1 }, 'One row is selected')
    await click('[data-test-cs-table-row-select="selectable"]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isChecked('Select all checkbox is checked')
    assert
      .dom('[data-test-select-all-checkbox]')
      .hasProperty(
        'indeterminate',
        false,
        'Select all checkbox is not indeterminated'
      )
    assert.dom('[data-test-select-all]').hasText('Selected 2')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .exists({ count: 2 }, 'All rows are selected')
    await click('[data-test-cs-table-row-select="selected"]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert
      .dom('[data-test-select-all-checkbox]')
      .hasProperty(
        'indeterminate',
        true,
        'Select all checkbox is indeterminated'
      )
    assert.dom('[data-test-select-all]').hasText('Selected 1')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .exists({ count: 1 }, 'One row is selected')
    await click('[data-test-cs-table-row-select="selected"]')
    assert
      .dom('[data-test-select-all-checkbox]')
      .isNotChecked('Select all checkbox is not checked')
    assert
      .dom('[data-test-select-all-checkbox]')
      .hasProperty(
        'indeterminate',
        false,
        'Select all checkbox is not indeterminated'
      )
    assert.dom('[data-test-select-all]').hasText('None selected')
    assert
      .dom('[data-test-cs-table-row-select="selected"]')
      .doesNotExist('No row is selected')
  })

  test("it disallows to select rows that doesn't validate the selectableFunction passed as argument", async function (assert) {
    assert.expect(4)
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
    assert
      .dom('[data-test-cs-table-row-select="selectable"]')
      .exists({ count: 2 }, 'All rows are selectable')

    this.set('selectableFunction', (items) => {
      return items.filter((item) => item.status === 'available')
    })
    await render(
      hbs`<CsTable @rows={{this.rows}} @structure={{this.structure}} @selectableFunction={{this.selectableFunction}} />`
    )
    assert
      .dom('[data-test-cs-table-row-select="selectable"]')
      .exists({ count: 1 }, 'One row is selectable')

    this.set('selectableFunction', () => false)
    await render(
      hbs`<CsTable @rows={{this.rows}} @structure={{this.structure}} @selectableFunction={{this.selectableFunction}} />`
    )
    assert
      .dom('[data-test-cs-table-row-select="selectable"]')
      .doesNotExist('No row is selectable')

    try {
      this.set('selectableFunction', true)
      await render(
        hbs`<CsTable @rows={{this.rows}} @structure={{this.structure}} @selectableFunction={{this.selectableFunction}} />`
      )
    } catch (error) {
      assert.ok(error, 'Error is thrown')
    }
  })

  test('it adds cs-row--selected class on selected rows', async function (assert) {
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
    assert
      .dom('[data-test-cs-table-row].cs-row.cs-row--selected')
      .doesNotExist('No row has cs-row--selected class')
    await click('[data-test-select-all-checkbox]')
    assert
      .dom('[data-test-cs-table-row].cs-row.cs-row--selected')
      .exists({ count: 2 }, 'All rows has cs-row--selected class')
  })

  test('it uses custom component for a cell', async function (assert) {
    // Setup: Create a custom component with template and register it
    let customComponent = class CustomComponent extends Component {}
    setComponentTemplate(
      hbs('<span data-test-custom-component>{{@value}}</span>', {
        moduleName: 'custom-component.hbs',
      }),
      customComponent
    )
    getOwner(this).register('component:custom-component', customComponent)

    this.set('structure', [
      { key: 'name', label: 'Name' },
      { key: 'device', label: 'Device' },
      { key: 'path', label: 'Path' },
      { key: 'status', label: 'Status', component: 'custom-component' },
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
    assert
      .dom('[data-test-custom-component]')
      .exists({ count: 2 }, 'Custom component for a cell is rendered')

    // Teardown: unregister the custom component
    getOwner(this).unregister('component:custom-component')
  })

  test('it renders block template in the header part and have access to selectedItems', async function (assert) {
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
      hbs`<CsTable @rows={{this.rows}} @structure={{this.structure}} as |selectedItems|><span data-test-selected-items>{{selectedItems.length}}</span></CsTable>`
    )
    assert
      .dom('[data-test-yield-block] [data-test-selected-items]')
      .exists('Block template is rendered in the header part')
    assert
      .dom('[data-test-selected-items]')
      .hasText('0', 'Block template has access to selectedItems')
    await click('[data-test-select-all-checkbox]')
    assert
      .dom('[data-test-selected-items]')
      .hasText('2', 'Block template has access to selectedItems')
  })
})
