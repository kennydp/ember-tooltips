import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findTooltip } from '../../helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | tooltip on element', function(hooks) {
  setupRenderingTest(hooks);

  ['slide', 'fade', 'none'].forEach((effectType) => {
    test(`tooltip-on-element effect=${effectType} class test`, async function(assert) {

      this.set('effectType', effectType);
      await render(hbs`{{tooltip-on-element effect=effectType}}`);

      const $tooltip = findTooltip();

      assert.ok($tooltip.hasClass(`ember-tooltip-or-popover-${effectType}`),
          `the tooltip should have the ${effectType} effect class`);

    });
  });
});
