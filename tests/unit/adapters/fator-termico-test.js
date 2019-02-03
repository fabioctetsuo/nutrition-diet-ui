import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | fator termico', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:fator-termico');
    assert.ok(adapter);
  });
});
