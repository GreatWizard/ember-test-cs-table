import Component from '@glimmer/component'
import { action } from '@ember/object'

export default class CsTableRowComponent extends Component {
  @action
  onSelect(event) {
    this.args.onSelect(this.args.row, event.target.checked)
  }
}
