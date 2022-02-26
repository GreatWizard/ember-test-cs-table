import Component from '@glimmer/component'
import { action } from '@ember/object'

export default class DemoTableComponent extends Component {
  structure = [
    { key: 'name', label: 'Name' },
    { key: 'device', label: 'Device' },
    { key: 'path', label: 'Path' },
    { key: 'status', label: 'Status', component: 'custom-status' },
  ]

  selectableFunction(items) {
    return items.filter((item) => item.status === 'available')
  }

  @action
  downloadSelected(items) {
    let text = items.map((item) => `[${item.device}] ${item.path}`).join('\n\n')
    alert(text)
  }
}
