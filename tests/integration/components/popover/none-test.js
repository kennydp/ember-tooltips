import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  triggerTooltipTargetEvent
} from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | event', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: never shows with none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{popover-on-element event='none'}}`);

    const $popoverTarget = this.$();

    assertTooltipNotVisible(assert);

    /* Check focus */

    triggerTooltipTargetEvent($popoverTarget, 'focus');

    assertTooltipNotVisible(assert);

    /* Check hover */

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipNotVisible(assert);

    /* Check click */

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipNotVisible(assert);

  });
});
