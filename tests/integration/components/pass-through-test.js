import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { findTooltip } from 'dummy/tests/helpers/ember-tooltips';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pass through properties', function(hooks) {
  setupRenderingTest(hooks);

  test('tooltip-on-element pass through attributes test', async function(assert) {

    this.setProperties({
      bar: false,
      baz: true,
    });

    await render(hbs`
      {{tooltip-on-element
        id="some-id"
        class='foo'
        classNameBindings='bar:bar-truthy:bar-falsy baz:baz-truthy:baz-falsy'
        classNames="foobar"
        role='foo'
        tabindex='2'
      }}
    `);

    const $tooltip = findTooltip();

    /* Assert that the attributes are passed from
    the lazy-render-wrapper component to the $tooltip
    */

    assert.equal($tooltip.attr('id'), 'some-id');

    assert.ok($tooltip.hasClass('foo'));

    assert.ok($tooltip.hasClass('bar-falsy'));

    assert.ok($tooltip.hasClass('baz-truthy'));

    assert.ok($tooltip.hasClass('foobar'));

    assert.equal($tooltip.attr('role'), 'foo');

    assert.equal($tooltip.attr('tabindex'), '2');

  });
});
