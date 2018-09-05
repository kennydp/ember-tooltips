import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipContent } from '../../helpers/ember-tooltips';

module('Integration | Option | content', function(hooks) {
  setupRenderingTest(hooks);

  test('assertTooltipContent correctly matches expected tootltip content for inline tooltip', async function(assert) {

    assert.expect(1);

    await render(hbs`{{tooltip-on-element text='foo'}}`);

    assertTooltipContent(assert, {
      contentString: 'foo',
    });

  });

  test('assertTooltipContent correctly matches expected tootltip content for block tooltip', async function(assert) {

    assert.expect(1);

    await render(hbs`{{#tooltip-on-element}}foo{{/tooltip-on-element}}`);

    assertTooltipContent(assert, {
      contentString: 'foo',
    });
  });

  test('assertTooltipContent correctly compares expected and discovered tooltip content of tooltip', async function(assert) {

    assert.expect(2);

    await render(hbs`{{tooltip-on-element text='foo'}}`);

    const stubbedAssert = {
      equal(arg1, arg2/* , msg */) {
        assert.equal(
          arg1,
          'foo',
          'Helper correctly finds actual content of tooltip'
        );

        assert.equal(
          arg2,
          'foo',
          'Helper correctly intends to compare to string we provide'
        );
      },
    };

    assertTooltipContent(stubbedAssert, {
      contentString: 'foo',
    });
  });
});
