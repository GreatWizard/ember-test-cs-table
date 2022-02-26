# ember-test-cs-table

[![CI](https://github.com/GreatWizard/ember-test-cs-table/actions/workflows/ci.yml/badge.svg)](https://github.com/GreatWizard/ember-test-cs-table/actions/workflows/ci.yml)

> ⚠️ This project is not intended to be used on production. This is a developer test.

Developer test about a table component as a reusable component.

![Screenshot](https://raw.githubusercontent.com/GreatWizard/ember-test-cs-table/master/doc/screenshot.png)

## Features

- Checkboxes to select one or multiple items
- Checkbox to select all items at once
- Customize component cell
- Customize toolbar with component that have access to the selected items
- Pass a function in order to define criteria about selectable items
- Embedded CSS for easier integration

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v12 or above

## Installation

> ⚠️ This project is not intended to be used on production. This is a developer test.

## Usage

### `CsTable` component

| Argument             | Required/Optional | Description                                            |
| -------------------- | ----------------- | ------------------------------------------------------ |
| `rows`               | required          | An ordered array that contains all the data            |
| `structure`          | optional          | An ordered array that represents the data structure    |
| `selectableFunction` | optional          | A function that define criteria about selectable items |

The `structure` array is composed with object containing the following attributes:

| Attribute   | Required/Optional | Description                                                     |
| ----------- | ----------------- | --------------------------------------------------------------- |
| `key`       | required          | The key attribute in the rows objects                           |
| `label`     | required          | The label to display for the column                             |
| `component` | optional          | The name of the component to used for every cells of the column |

> ℹ️ Native attributes (like `class`) can be passed to the `CsTable` component.

#### Example

<details><summary>Click to see demo component template (<em>demo-table.hbs</em>)</summary>

```hbs
<CsTable class='container' @rows={{this.rows}} @structure={{this.structure}} />
```

</details>

<details><summary>Click to see demo component class (<em>demo-table.js</em>)</summary>

```js
import Component from '@glimmer/component'

export default class DemoTableComponent extends Component {
  rows = [
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
    {
      name: 'uxtheme.dll',
      device: 'Lannister',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
      status: 'available',
    },
    {
      name: 'cryptbase.dll',
      device: 'Martell',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
      status: 'scheduled',
    },
    {
      name: '7za.exe',
      device: 'Baratheon',
      path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
      status: 'scheduled',
    },
  ]

  structure = [
    { key: 'name', label: 'Name' },
    { key: 'device', label: 'Device' },
    { key: 'path', label: 'Path' },
    { key: 'status', label: 'Status' },
  ]
}
```

</details>

### Advanced usage: Customize cell

The custom component used to customize a cell have only one argument:

| Argument | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| `value`  | The raw value of the cell taken from the current row's key attribute |

#### Example

<details><summary>Click to see custom component cell template (<em>custom-status.hbs</em>)</summary>

```hbs
📃 {{capitalize @value}}
```

</details>

<details><summary>Click to see demo component template (<em>demo-table.hbs</em>)</summary>

```hbs
<CsTable @rows={{this.rows}} @structure={{this.structure}} />
```

</details>

<details><summary>Click to see demo component class (<em>demo-table.js</em>)</summary>

```js
import Component from '@glimmer/component'

export default class DemoTableComponent extends Component {
  rows = [
    {
      name: 'smss.exe',
      status: 'scheduled',
    },
    {
      name: 'netsh.exe',
      status: 'available',
    },
  ]

  structure = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', component: 'custom-status' },
  ]
}
```

</details>

#### Advanced usage: Customize toolbar

You can use block template inside the `CsTable` component in order to add template in the header part.

Common usage are action buttons that have access to the current items selection.

#### Example

<details><summary>Click to see demo component template (<em>demo-table.hbs</em>)</summary>

```hbs
<CsTable
  @rows={{@rows}}
  @structure={{this.structure}}
  @selectableFunction={{this.selectableFunction}}
  as |selectedItems|
>
  <button
    type='button'
    class='button button--primary'
    disabled={{eq selectedItems.length 0}}
    {{on 'click' (fn this.downloadSelected selectedItems)}}
    data-test-download-button
  >Download Selected</button>
</CsTable>
```

</details>

<details><summary>Click to see demo component class (<em>demo-table.js</em>)</summary>

```js
import Component from '@glimmer/component'
import { action } from '@ember/object'

export default class DemoTableComponent extends Component {
  rows = [
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
    {
      name: 'uxtheme.dll',
      device: 'Lannister',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
      status: 'available',
    },
    {
      name: 'cryptbase.dll',
      device: 'Martell',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
      status: 'scheduled',
    },
    {
      name: '7za.exe',
      device: 'Baratheon',
      path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
      status: 'scheduled',
    },
  ]

  structure = [
    { key: 'name', label: 'Name' },
    { key: 'device', label: 'Device' },
    { key: 'path', label: 'Path' },
    { key: 'status', label: 'Status' },
  ]

  @action
  downloadSelected(items) {
    let text = items.map((item) => `[${item.device}] ${item.path}`).join('\n\n')
    alert(text)
  }
}
```

</details>

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
