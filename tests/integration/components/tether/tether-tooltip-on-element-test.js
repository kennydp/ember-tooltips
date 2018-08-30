import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent,
  assertTooltipRendered
} from '../../../helpers/ember-tooltips';

module('Integration | Component | tether tooltip on element', function(hooks) {
  setupRenderingTest(hooks);

  test('tether-tooltip-on-element renders', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#tether-tooltip-on-element}}
        template block text
      {{/tether-tooltip-on-element}}
    `);

    assertTooltipRendered(assert);

  });

  test("tether-tooltip-on-element targets it's parent view", async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#tether-tooltip-on-element event="click"}}
        template block text
      {{/tether-tooltip-on-element}}
    `);

    const $tooltipTarget = this.$();

    assertTooltipRendered(assert);

    assert.ok($tooltipTarget.hasClass('ember-tooltip-or-popover-target'));

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assertTooltipNotVisible(assert);

  });
});
