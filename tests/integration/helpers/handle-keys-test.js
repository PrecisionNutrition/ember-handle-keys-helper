import sinon from 'sinon';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | handle-keys ', function (hooks) {
  setupRenderingTest(hooks);

  test('handles a single key', async function (assert) {
    this.handlerSpy = sinon.spy();

    await render(hbs`
      <input
        data-test
        {{on "keydown" (handle-keys this.handlerSpy "Escape")}}
      />
    `);

    assert.ok(this.handlerSpy.notCalled);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.ok(this.handlerSpy.notCalled, 'ignores irrelevant keys');

    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');
    assert.ok(this.handlerSpy.calledOnce, 'calls on target key');

    await triggerKeyEvent('[data-test]', 'keydown', 'Esc');
    assert.ok(this.handlerSpy.calledTwice, 'handles non-standard IE/Edge keys');
  });

  test('handles multiple keys', async function (assert) {
    this.handlerSpy = sinon.spy();

    await render(hbs`
      <input
        data-test
        {{on "keydown" (handle-keys this.handlerSpy "Enter" "ArrowDown")}}
      />
    `);

    assert.ok(this.handlerSpy.notCalled);

    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');
    assert.ok(this.handlerSpy.notCalled, 'ignores irrelevant keys');

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.ok(this.handlerSpy.calledOnce, 'calls on a target key');

    await triggerKeyEvent('[data-test]', 'keydown', 'ArrowDown');
    assert.ok(this.handlerSpy.calledTwice, 'calls on another target key');

    await triggerKeyEvent('[data-test]', 'keydown', 'ArrowUp');
    assert.ok(this.handlerSpy.calledTwice, 'ignores irrelevant keys');

    await triggerKeyEvent('[data-test]', 'keydown', 'Down');
    assert.ok(this.handlerSpy.calledThrice, 'handles non-standard IE/Edge keys');
  });

  test('keydown event propagates by default', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys this.innerSpy "Enter")}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.spy.calledOnce(this.outerSpy);
    assert.spy.calledOnce(this.innerSpy);
  });

  test('stops propagation for a single key', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys this.innerSpy "Enter" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.spy.notCalled(this.outerSpy);
    assert.spy.calledOnce(this.innerSpy);
  });

  test('tops propagation for a single key without handler', async function (assert) {
    this.outerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys "Enter" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.spy.notCalled(this.outerSpy);
  });

  test('stops propagation for multiple keys', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys this.innerSpy "Enter" "Escape" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');
    assert.spy.notCalled(this.outerSpy);
    assert.spy.calledTwice(this.innerSpy);
  });

  test('stops propagation for multiple keys without handler', async function (assert) {
    this.outerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys "Enter" "Escape" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');
    assert.spy.notCalled(this.outerSpy);
  });

  test('does not stop propagation for non-target keys', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys this.innerSpy "Enter" "Escape" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'ArrowUp');

    assert.spy.calledOnce(this.outerSpy);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');

    assert.spy.calledOnce(this.outerSpy);
    assert.spy.calledTwice(this.innerSpy);
  });

  test('does not stop propagation for non-target keys without handler', async function (assert) {
    this.outerSpy = sinon.spy();

    await render(hbs`
      <div tabindex="-1" {{on "keydown" this.outerSpy}}>
        <input
          data-test
          {{on "keydown" (handle-keys "Enter" "Escape" stopPropagation=true)}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'ArrowUp');

    assert.spy.calledOnce(this.outerSpy);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');

    assert.spy.calledOnce(this.outerSpy);
  });

  test('keydown event propagates by default in capture mode', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div
        tabindex="-1"
        {{on "keydown" (handle-keys this.outerSpy "Enter") capture=true}}
      >
        <input
          data-test
          {{on "keydown" this.innerSpy}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.spy.calledOnce(this.outerSpy);
    assert.spy.calledOnce(this.innerSpy);
  });

  test('stops propagation for a target key in capture mode', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div
        tabindex="-1"
        {{on "keydown" (handle-keys this.outerSpy "Enter" stopPropagation=true) capture=true}}
      >
        <input
          data-test
          {{on "keydown" this.innerSpy}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Enter');
    assert.spy.calledOnce(this.outerSpy);
    assert.spy.notCalled(this.innerSpy);
  });

  test('does not stop propagation for non-target key in capture mode', async function (assert) {
    this.outerSpy = sinon.spy();
    this.innerSpy = sinon.spy();

    await render(hbs`
      <div
        tabindex="-1"
        {{on "keydown" (handle-keys this.outerSpy "Enter" stopPropagation=true) capture=true}}
      >
        <input
          data-test
          {{on "keydown" this.innerSpy}}
        />
      </div>
    `);

    await triggerKeyEvent('[data-test]', 'keydown', 'Escape');
    assert.spy.notCalled(this.outerSpy);
    assert.spy.calledOnce(this.innerSpy);
  });
});
