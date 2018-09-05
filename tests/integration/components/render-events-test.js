import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { TARGET_EVENT_NAMESPACE } from 'ember-tooltips/components/lazy-render-wrapper';

module('Integration | Component | event handlers', function(hooks) {
  setupRenderingTest(hooks);

  function assertTargetHasLazyRenderEvents(assert, $target, eventType = 'hover') {
    const eventsObject = $._data($target[0], 'events');

    function assertEventExists(event) {

      /* For some reason mouseenter events are stored as mouseover
      in the eventsObject. It's the same for mouseleave -> mouse out
      */

      let eventObjectName = event;

      if (event === 'mouseenter') {
        eventObjectName = 'mouseover';
      } else if (event === 'mouseleave') {
        eventObjectName = 'mouseout';
      }

      assert.ok(eventsObject && eventsObject[eventObjectName],
          `the eventsObject exists and should have ${eventObjectName} event`);

      const [eventHandler] = eventsObject[eventObjectName];

      assert.equal(eventHandler.origType, event,
          `the eventHandler's origType property should equal ${event}`);

      assert.ok(eventHandler.namespace.indexOf(TARGET_EVENT_NAMESPACE) >= 0,
          'the eventHandler\'s namespace property be unique to ember-tooltips');
    }

    /**
     * This function asserts that a certain number of event handlers
     * are attached to an object. Event handlers are stored in arrays
     * on the eventsObject like so...
     *
     * eventsObject = { focusin: [x, x], click: [x] } would equal 3 events
     *
     * @method assertNumEventsExist
     * @private
     * @param {number} num
     */

    function assertNumEventsExist(num) {

      let numEvents = Object.keys(eventsObject || {}).reduce(function(n, keyName) {
        return n + eventsObject[keyName].length;
      }, 0);

      assert.equal(num, numEvents,
          `${num} events should exist`);
    }

    if (eventType === 'hover') {
      assertNumEventsExist(3);
      assertEventExists('focusin');
      assertEventExists('mouseenter');
      assertEventExists('mouseleave');
    } else if (eventType === 'click') {
      assertNumEventsExist(2);
      assertEventExists('focusin');
      assertEventExists('click');
    } else if (eventType === 'focus') {
      assertNumEventsExist(1);
      assertEventExists('focusin');
    } else if (eventType === 'none') {
      assertNumEventsExist(0);
    }
  }

  ['hover', 'click', 'focus', 'none'].forEach(function(eventType) {
    test(`lazy-render-wrapper correctly assigns event handlers when event=${eventType}`, async function(assert) {

      this.set('eventType', eventType);

      await render(hbs`{{tooltip-on-element event=eventType enableLazyRendering=true}}`);

      const $target = this.$();

      assertTargetHasLazyRenderEvents(assert, $target, eventType);

    });
  });

  test('lazy-render-wrapper correctly assigns event handlers when target="some-id"', async function(assert) {

    await render(hbs`
      <div id="some-id"></div>
      {{tooltip-on-element target="#some-id" enableLazyRendering=true}}
    `);

    const $target = this.$('#some-id');

    assertTargetHasLazyRenderEvents(assert, $target);

  });

  test('lazy-render-wrapper correctly assigns event handlers when -on-component', async function(assert) {

    await render(hbs`
      {{#some-component}}
        {{tooltip-on-component enableLazyRendering=true}}
      {{/some-component}}
    `);

    const $target = this.$('.some-component');

    assertTargetHasLazyRenderEvents(assert, $target);

  });

  test('lazy-render-wrapper removes event handlers when -on-component is destroyed', async function(assert) {

    await render(hbs`
      {{#some-component}}
        {{#unless deleteTooltip}}
          {{tooltip-on-component enableLazyRendering=true}}
        {{/unless}}
      {{/some-component}}
    `);

    const $target = this.$('.some-component');
    const done = assert.async();

    assertTargetHasLazyRenderEvents(assert, $target);

    this.set('deleteTooltip', true);

    run.later(() => {
      assertTargetHasLazyRenderEvents(assert, $target, 'none');
      done();
    }, 1000);

  });
});
