import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | target', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element target test', async function(assert) {

    await render(hbs`
      <div id="some-target"></div>
      {{tooltip-on-element target="#some-target"}}
    `);

    const $someTarget = this.$().find('#some-target');

    assert.ok($someTarget.hasClass('ember-tooltip-or-popover-target'),
        '#some-target should be the tooltip target');

  });
});
