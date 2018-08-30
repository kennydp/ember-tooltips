import { visit } from '@ember/test-helpers';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from '../../tests/helpers/ember-tooltips';

module('Acceptance | acceptance', function(hooks) {
  setupApplicationTest(hooks);

  test('all acceptance tests', async function(assert) {
    await visit('/acceptance');

    const tooltipOrPopoverSelector = '.ember-tooltip, .ember-popover';

    assert.equal($(tooltipOrPopoverSelector).length, 2,
        'initially there should only be 2 tooltips or popovers rendered');

    assert.ok(true, '-------------- begin section 1 --------------');

    let $tooltipTarget = $('.js-test-tooltip-target-enableLazyRendering-false');
    let options = {
      selector: '.js-test-tooltip-enableLazyRendering-false',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipRendered(assert, options);

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

    assert.ok(true, '-------------- begin section 2 --------------');

    $tooltipTarget = $('.js-test-tooltip-target-enableLazyRendering-true');
    options = {
      selector: '.js-test-tooltip-enableLazyRendering-true',
    };

    assert.equal($tooltipTarget.length, 1, 'there should be one $tooltipTarget');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseenter');

    assertTooltipRendered(assert, options);

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($tooltipTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

    assert.ok(true, '-------------- begin section 3 --------------');

    let $popoverTarget = $('.js-test-popover-target-enableLazyRendering-false');
    options = {
      selector: '.js-test-popover-enableLazyRendering-false',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popoverTarget');

    assertTooltipRendered(assert, options);

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    run.later(() => {
      assertTooltipNotVisible(assert, options);
    }, 300); // Default hideDelay = 250

    assert.ok(true, '-------------- begin section 4 --------------');

    $popoverTarget = $('.js-test-popover-target-enableLazyRendering-true');
    options = {
      selector: '.js-test-popover-enableLazyRendering-true',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    run.later(() => {
      assertTooltipNotVisible(assert, options);
    }, 300); // Default hideDelay = 250

    assert.ok(true, '-------------- begin section 5 --------------');

    $popoverTarget = $('.js-test-popover-target-enableLazyRendering-true-no-delay');
    options = {
      selector: '.js-test-popover-enableLazyRendering-true-no-delay',
    };

    assert.equal($popoverTarget.length, 1, 'there should be one $popover');

    assertTooltipNotRendered(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseenter');

    assertTooltipVisible(assert, options);

    triggerTooltipTargetEvent($popoverTarget, 'mouseleave');

    assertTooltipNotVisible(assert, options);

    assert.equal($(tooltipOrPopoverSelector).length, 5,
        'initially there should only be 2 tooltips or popovers rendered');
  });
});
