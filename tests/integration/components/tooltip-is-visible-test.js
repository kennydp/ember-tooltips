import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipVisible,
  assertTooltipRendered
} from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | isShown', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element toggles with isShown', async function(assert) {

    assert.expect(2);

    this.set('showTooltip', true);

    await render(hbs`{{tooltip-on-element isShown=showTooltip}}`);

    assertTooltipVisible(assert);

    this.set('showTooltip', false);

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element toggles when enableLazyRendering with isShown', async function(assert) {

    assert.expect(3);

    this.set('showTooltip', true);

    await render(hbs`{{tooltip-on-element isShown=showTooltip enableLazyRendering=true}}`);

    assertTooltipRendered(assert);

    assertTooltipVisible(assert);

    this.set('showTooltip', false);

    assertTooltipNotVisible(assert);

  });

  test('tooltip-on-element toggles with tooltipIsVisible', async function(assert) {

    /* The tooltipIsVisible property is deprecated in favor
    of isShown tooltipIsVisible will be supported until v3.0.0
    */

    assert.expect(2);

    this.set('showTooltip', true);

    await render(hbs`{{tooltip-on-element tooltipIsVisible=showTooltip}}`);

    assertTooltipVisible(assert);

    run(() => {
      this.set('showTooltip', false);
    });

    assertTooltipNotVisible(assert);

  });
});
