import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | showOn', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element shows with showOn', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element showOn='click'}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotVisible(assert);

    /* Check hover doesn't trigger tooltip */

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipNotVisible(assert);

    /* Check click does trigger tooltip */

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipVisible(assert);

  });
});
