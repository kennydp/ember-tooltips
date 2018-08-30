import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  assertTooltipContent,
  assertTooltipRendered,
  findTooltipTarget,
} from 'dummy/tests/helpers/ember-tooltips';

module('Integration | Component | tooltip on element', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element renders', async function(assert) {

    assert.expect(2);

    await render(hbs`
      {{#tooltip-on-element}}
        template block text
      {{/tooltip-on-element}}
    `);

    assertTooltipContent(assert, {
      contentString: 'template block text',
    });

    assertTooltipRendered(assert);
  });

  test('tooltip-on-element has the proper aria-describedby tag', async function(assert) {

    assert.expect(2);

    await render(hbs`
      <div class="target">
        Hover here!

        {{#tooltip-on-element}}
          Some info in a tooltip.
        {{/tooltip-on-element}}
      </div>
    `);

    const $tooltipTarget = findTooltipTarget();
    const describedBy = $tooltipTarget.attr('aria-describedby');

    assertTooltipContent(assert, {
      selector: `#${describedBy}`,
      contentString: 'Some info in a tooltip.',
    });

    assert.equal(describedBy.indexOf('#'), '-1');

  });
});
