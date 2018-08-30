import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { assertTooltipSpacing } from 'dummy/tests/helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | spacing', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element shows with spacing=default', async function(assert) {

    assert.expect(1);

    /* Check the default spacing */

    await render(hbs`{{tooltip-on-element effect='none'}}`);

    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 10,
    });

  });

  test('tooltip-on-element shows with spacing=20', async function(assert) {

    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`{{tooltip-on-element spacing=20 effect='none'}}`);

    assertTooltipSpacing(assert, {
      side: 'top',
      spacing: 20,
    });

  });

  test('tooltip-on-element shows with spacing=20 and side=right', async function(assert) {

    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`
      {{tooltip-on-element
        effect='none'
        spacing=20
        side='right'
        keepInWindow=false
      }}
    `);

    assertTooltipSpacing(assert, {
      side: 'right',
      spacing: 20,
    });

  });

  test('tooltip-on-element shows with spacing=53 and side=bottom', async function(assert) {

    assert.expect(1);

    /* Check custom spacing */

    await render(hbs`
      {{tooltip-on-element
        effect='none'
        spacing=53
        side='bottom'
        keepInWindow=false
      }}
    `);

    assertTooltipSpacing(assert, {
      side: 'bottom',
      spacing: 53,
    });

  });
});
