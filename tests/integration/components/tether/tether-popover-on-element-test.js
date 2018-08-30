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

  test('tether-popover-on-element renders', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#tether-popover-on-element}}
        template block text
      {{/tether-popover-on-element}}
    `);

    assertTooltipRendered(assert);

  });

  test("tether-popover-on-element targets it's parent view", async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#tether-popover-on-element event="click"}}
        template block text
      {{/tether-popover-on-element}}
    `);

    const $popoverTarget = this.$();

    assertTooltipRendered(assert);

    assert.ok($popoverTarget.hasClass('ember-tooltip-or-popover-target'));

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipNotVisible(assert);

  });

  test('tether-popover-on-element can use hide API', async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#tether-popover-on-element event="click" as |popover|}}
        <span class='hide-button' {{action popover.hide}}></span>
      {{/tether-popover-on-element}}
    `);

    const $popoverTarget = this.$();

    assertTooltipRendered(assert);

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.hide-button' });

    assertTooltipNotVisible(assert);

  });
});
