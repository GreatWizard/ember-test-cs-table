import { module, test } from 'qunit'
import { visit } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-qunit'

module('Acceptance | custom status', function (hooks) {
  setupApplicationTest(hooks)

  test('it renders custom-status', async function (assert) {
    await visit('/')
    assert
      .dom('[data-test-cs-table-row-col="status"] [data-test-badge="green"]')
      .exists({ count: 2 }, 'Green status is displayed')
  })
})
