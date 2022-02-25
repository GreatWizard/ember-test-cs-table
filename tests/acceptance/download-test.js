import { module, test } from 'qunit'
import { visit, click } from '@ember/test-helpers'
import { setupApplicationTest } from 'ember-qunit'

module('Acceptance | download', function (hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(() => {
    this.alertBackup = window.alert
  })

  hooks.afterEach(() => {
    window.alert = this.alertBackup
  })

  test('download selected', async function (assert) {
    assert.expect(1)
    window.alert = (text) => {
      assert.strictEqual(
        text,
        `[Targaryen] \\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe

[Lannister] \\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll`,
        'Alert is called'
      )
    }
    await visit('/')
    await click('[data-test-select-all-checkbox]')
    await click('[data-test-download-button]')
  })
})
