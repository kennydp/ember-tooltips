import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | event', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element toggles with hover', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element toggles with click', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element event='click'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element toggles with focus', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element event='focus'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'focus');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'blur');

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element does not show when event=none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{tooltip-on-element event='none'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    /* Check focus */

    triggerTooltipTargetEvent($tooltipTarget, 'focus');

    assertTooltipNotVisible(assert);

    /* Check hover */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipNotVisible(assert);

    /* Check click */

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);

  });
});
