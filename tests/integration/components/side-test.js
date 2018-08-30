import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipSide } from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Option | side and keepInWindow', function(hooks) {
  setupRenderingTest(hooks);

  /* Test the positions without forcing the tooltip
  to stay in the window.

  It's necessary to use effect='none' because the `effect` class causes
  spacing to be incorrect. The default 'fade' effect moves about `10px`
  closer to the target prior to the tooltip being animated when the
  tooltip is shown.
  */

  test('tooltip-on-element shows on the top by default', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element keepInWindow=false effect='none'}}`);

    assertTooltipSide(assert, { side: 'top' });

  });

  test('tooltip-on-element shows on the top', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element side='top' keepInWindow=false effect='none'}}`);

    assertTooltipSide(assert, { side: 'top' });

  });

  test('tooltip-on-element shows with showOn right', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element side='right' keepInWindow=false effect='none'}}`);

    assertTooltipSide(assert, { side: 'right' });

  });

  test('tooltip-on-element shows with showOn bottom', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element side='bottom' keepInWindow=false effect='none'}}`);

    assertTooltipSide(assert, { side: 'bottom' });

  });

  test('tooltip-on-element shows with showOn left', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element side='left' keepInWindow=false effect='none'}}`);

    assertTooltipSide(assert, { side: 'left' });

  });

  /* TODO(Unclaimed)

  Figure out how to test keepInWindow reliably in PhantomJS

  test('It stays in the window', function(assert) {

    assert.expect(1);

    this.render(hbs`
      {{#tooltip-on-element side='left'}}
        This is some long text to push the tooltip off the page
      {{/tooltip-on-element}}
    `);

     assertTooltipSide(assert, { side: 'right' });

  });
  */
});
