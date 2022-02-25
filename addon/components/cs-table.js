import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import { A } from '@ember/array'
import { action } from '@ember/object'
import { assert } from '@ember/debug'

export default class CsTableComponent extends Component {
  @tracked selectedItems = A()

  get selectableItems() {
    if (this.args.selectableFunction) {
      assert(
        'selectableFunction must be a function',
        typeof this.args.selectableFunction === 'function'
      )
      return this.args.selectableFunction(this.args.rows)
    }
    return this.args.rows
  }

  @action
  rowSelectedChange(item, selected) {
    if (selected) {
      this.selectedItems.pushObject(item)
    } else {
      this.selectedItems.removeObject(item)
    }
  }

  @action
  selectAll(event) {
    this.selectedItems.clear()
    if (event.target.checked) {
      this.selectableItems.forEach((item) => {
        this.selectedItems.pushObject(item)
      })
    }
  }
}
