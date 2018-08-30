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

module('Integration | Component | tether popover on component', function(hooks) {
  setupRenderingTest(hooks);

  test('tether-popover-on-component renders', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#some-component}}
        {{#tether-popover-on-component}}
          template block text
        {{/tether-popover-on-component}}
      {{/some-component}}
    `);

    assertTooltipRendered(assert);

  });

  test("tether-popover-on-component targets it's parent view", async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#some-component class="target-component"}}
        {{#tether-popover-on-component event="click"}}
          template block text
        {{/tether-popover-on-component}}
      {{/some-component}}
    `);

    const $popoverTarget = this.$().find('.target-component');

    assertTooltipRendered(assert);

    assert.ok($popoverTarget.hasClass('ember-tooltip-or-popover-target'));

    triggerTooltipTargetEvent(this.$(), 'click', { selector: '.target-component' });

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent(this.$(), 'click', { selector: '.target-component' });

    assertTooltipNotVisible(assert);

  });
});
