import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
	assertTooltipNotVisible,
	assertTooltipVisible,
	triggerTooltipTargetEvent,
	assertTooltipNotRendered,
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | click', function(hooks) {
  setupRenderingTest(hooks);

  test('Tooltip: focusin/click input, click input', async function(assert) {

    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{tooltip-on-element event="click" target="#some-input" enableLazyRendering=true}}
    `);

    const $tooltipTarget = this.$('#some-input');

    assertTooltipNotRendered(assert);

    /* We intentionally trigger a focusin and click on the $tooltipTarget because
    when a user clicks an input both events occur in that order.
    We have fixed this with _isInProcessOfShowing and this test protects that. */

    triggerTooltipTargetEvent($tooltipTarget, 'focusin');
    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);

  });
});
