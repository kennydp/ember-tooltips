import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipRendered,
  assertTooltipContent,
} from '../../../helpers/ember-tooltips';

module('Integration | Component | popover on component', function(hooks) {
  setupRenderingTest(hooks);

  test('popover-on-component does render when enableLazyRendering=false', async function(assert) {

    assert.expect(2);

    await render(hbs`
      {{#some-component}}
        {{#popover-on-component enableLazyRendering=false}}
          template block text
        {{/popover-on-component}}
      {{/some-component}}
    `);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });

    assertTooltipRendered(assert);
  });

  test('popover-on-component does not eagerly render when enableLazyRendering=true', async function(assert) {

    assert.expect(1);

    await render(hbs`
      {{#some-component}}
        {{#popover-on-component enableLazyRendering=true}}
          template block text
        {{/popover-on-component}}
      {{/some-component}}
    `);

    assertTooltipNotRendered(assert);
  });
});
