import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipContent,
} from '../../helpers/ember-tooltips';

module('Integration | Component | tooltip-on-component', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-component does render when enableLazyRendering=false', async function(assert) {

    assert.expect(2);

    await render(hbs`
      {{#some-component}}
        {{#tooltip-on-component enableLazyRendering=false}}
          template block text
        {{/tooltip-on-component}}
      {{/some-component}}
    `);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });

    assertTooltipRendered(assert);
  });

  test('tooltip-on-component does not eagerly render when enableLazyRendering=true', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#some-component}}
        {{#tooltip-on-component enableLazyRendering=true}}
          template block text
        {{/tooltip-on-component}}
      {{/some-component}}
    `);

    assertTooltipNotRendered(assert);
  });
});
