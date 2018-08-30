import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | duration', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element hides after the given duration', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element duration=300}}`);

    const done = assert.async();
    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    /* Check the tooltip is hidden after the duration */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    run.later(() => {
      assertTooltipNotVisible(assert);
      done();
    }, 500);

  });

  test('tooltip-on-element hides before the given duration, if requested', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element duration=300}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element uses duration after the first show', async function(assert) {

    assert.expect(5);

    await render(hbs`{{tooltip-on-element duration=300}}`);

    const done = assert.async();
    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert);

    /* Check the tooltip is hidden after the duration */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert);

    run.later(() => {
      assertTooltipNotVisible(assert);
      done();
    }, 500);

  });
});
