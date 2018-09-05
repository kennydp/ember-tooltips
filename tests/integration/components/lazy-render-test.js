import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  triggerTooltipTargetEvent,
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible
} from '../../helpers/ember-tooltips';

module('Integration | Component | enableLazyRendering', function(hooks) {
  setupRenderingTest(hooks);

  [
    {
      eventType: 'hover',
      showOn: 'mouseenter',
    }, {
      eventType: 'click',
      showOn: 'click',
    }, {
      eventType: 'focus',
      showOn: 'focusin',
    },
  ].forEach(function(eventObject) {
    test(`tooltip-on-element renders lazily after ${eventObject.showOn} when enableLazyRendering=true`, async function(assert) {

      this.set('eventType', eventObject.eventType);

      await render(hbs`{{tooltip-on-element event=eventType enableLazyRendering=true}}`);

      assertTooltipNotRendered(assert);

      triggerTooltipTargetEvent(this.$(), eventObject.showOn);

      assertTooltipRendered(assert);

    });
  });

  test('tooltip-on-element renders automatically when enableLazyRendering=false', async function(assert) {

    await render(hbs`{{tooltip-on-element enableLazyRendering=false}}`);

    assertTooltipRendered(assert);

  });

  test('tooltip-on-element renders automatically when isShown=true', async function(assert) {

    await render(hbs`{{tooltip-on-element enableLazyRendering=true isShown=true}}`);

    assertTooltipRendered(assert);

  });

  test('tooltip-on-element renders automatically when tooltipIsVisible=true', async function(assert) {

    await render(hbs`{{tooltip-on-element enableLazyRendering=true tooltipIsVisible=true}}`);

    assertTooltipRendered(assert);

  });

  test('tooltip-on-element event=click will only trigger one click event', async function(assert) {

    assert.expect(3);

    let timesClicked = 0;

    await render(hbs`{{tooltip-on-element event="click" enableLazyRendering=true}}`);

    const $tooltipTarget = this.$();
    const done = assert.async();

    $tooltipTarget.on('click', () => {
      timesClicked++;
    });

    assert.equal(timesClicked, 0,
        'timesClicked should be zero before the click event');

    triggerTooltipTargetEvent($tooltipTarget, 'click');

    assert.equal(timesClicked, 1,
        'timesClicked should be one after the click event');

    run.later(() => {
      assert.equal(timesClicked, 1,
          'timesClicked should still be one after any async actions are completed');

      done();
    }, 100);

  });

  test('tooltip-on-element behaves when a mouseenter/mouseleave occurs quickly', async function(assert) {

    assert.expect(3);

    await render(hbs`{{tooltip-on-element enableLazyRendering=true}}`);

    const $tooltipTarget = this.$();

    assertTooltipNotRendered(assert);

    run(() => {

      /* We intentionally use $tooltipTarget.trigger
      instead of triggerTooltipTargetEvent because mouseenter
      and mouseleave need to happen within the same run loop.
      This mimics the interaction when a user quickly hovers
      through the $tooltipTarget
      */

      $tooltipTarget.trigger('mouseenter');
      $tooltipTarget.trigger('mouseleave');
    });

    assertTooltipRendered(assert);

    assertTooltipNotVisible(assert);

  });
});
