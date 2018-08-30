import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  triggerTooltipTargetEvent
} from '../../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | API', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: click target, click hide-action', async function(assert) {

    assert.expect(3);

    await render(hbs`
      {{#popover-on-element event="click" as |popover|}}
        <span class='hide-action' {{action popover.hide}}></span>
      {{/popover-on-element}}
    `);

    const $popoverTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.hide-action' });

    assertTooltipNotVisible(assert);

  });

  test('Popover: click target, click hide-action, click target', async function(assert) {

    assert.expect(4);

    await render(hbs`
      {{#popover-on-element event="click" as |popover|}}
        <span class='hide-action' {{action popover.hide}}></span>
      {{/popover-on-element}}
    `);

    const $popoverTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.hide-action' });

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

  });

  test('Popover: click target, click popover, click hide-action, click target', async function(assert) {

    assert.expect(5);

    await render(hbs`
      {{#popover-on-element event="click" as |popover|}}
        <span class='hide-action' {{action popover.hide}}></span>
      {{/popover-on-element}}
    `);

    const $popoverTarget = this.$();

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.ember-popover' });

    assertTooltipVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click', { selector: '.hide-action' });

    assertTooltipNotVisible(assert);

    triggerTooltipTargetEvent($popoverTarget, 'click');

    assertTooltipVisible(assert);

  });
});
