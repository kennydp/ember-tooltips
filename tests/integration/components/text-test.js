import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipRendered,
  assertTooltipContent
} from '../../helpers/ember-tooltips';

module('Integration | Component | inline', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element renders with text param', async function(assert) {

    assert.expect(2);

    await render(hbs`
      {{tooltip-on-element text='Here is more info'}}
    `);

    assertTooltipContent(assert, {
      contentString: 'Here is more info',
    });

    assertTooltipRendered(assert);
  });
});
