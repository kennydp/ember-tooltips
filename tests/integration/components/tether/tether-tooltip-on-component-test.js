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

module('Integration | Component | tether tooltip on component', function(hooks) {
  setupRenderingTest(hooks);

  test('tether-tooltip-on-component renders', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#some-component}}
        {{#tether-tooltip-on-component}}
          template block text
        {{/tether-tooltip-on-component}}
      {{/some-component}}
    `);

    assertTooltipRendered(assert);

  });

  test("tether-tooltip-on-component targets it's parent view", async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#some-component class="target-component"}}
        {{#tether-tooltip-on-component event="click"}}
          template block text
        {{/tether-tooltip-on-component}}
      {{/some-component}}
    `);

    const $tooltipTarget = this.$();

    assertTooltipRendered(assert);

    assert.ok($tooltipTarget.find('.target-component').hasClass('ember-tooltip-or-popover-target'));

    triggerTooltipTargetEvent($tooltipTarget, 'click', { selector: '.target-component' });

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($tooltipTarget, 'click', { selector: '.target-component' });

    assertTooltipNotVisible(assert);

  });
});
