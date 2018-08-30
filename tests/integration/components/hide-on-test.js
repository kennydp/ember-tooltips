import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | hideOn', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element hides with hideOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element hideOn='click'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    /* Check hover triggers tooltip */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    /* Check click hides tooltip */

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);

  });
});
