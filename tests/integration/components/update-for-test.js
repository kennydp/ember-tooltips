import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { assertTooltipContent } from '../../helpers/ember-tooltips';

module('Integration | Option | updateFor', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('updateFor test', async function(assert) {

    const done = assert.async();
    assert.expect(2);

    this.set('asyncContent', null);

    this.actions.setAsyncContent = () => {
      return new RSVP.Promise((resolve) => {
        run.later(() => {
          this.set('asyncContent', 'Some model');
          resolve();
        }, 100);
      });
    };

    render(hbs`
      {{#tooltip-on-element updateFor=asyncContent onRender='setAsyncContent'}}
        {{#if asyncContent}}
          {{asyncContent}}
        {{else}}
          ...
        {{/if}}
      {{/tooltip-on-element}}
    `);

    await waitFor('.ember-tooltip');

    assertTooltipContent(assert, {
      contentString: '...',
    });

    run.later(() => {
      assertTooltipContent(assert, {
        contentString: 'Some model',
      });

      done();
    }, 200);

  });
});
