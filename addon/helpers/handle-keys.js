import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { IE_KEYS_FIX_MAP } from '../constants';

export default helper(function handleKeys(
  args,
  { preventDefault, stopPropagation }
) {
  const { handler, targetKeys } = parseArgs(args);

  assert(
    `Expected an optional handler following by target keys, but got ${args}`,
    targetKeys.length && targetKeys.every((k) => typeof k === 'string')
  );

  return function keyboardEventHandler(event) {
    assert(
      `Expected an event to be KeyboardEvent, but got ${event}`,
      event instanceof KeyboardEvent
    );

    let key = IE_KEYS_FIX_MAP[event.key] || event.key;

    if (targetKeys.includes(key)) {
      if (preventDefault) {
        event.preventDefault();
      }

      if (stopPropagation) {
        event.stopPropagation();
      }

      if (handler) {
        handler(event);
      }
    }
  };
});

function parseArgs([handlerOrKey, ...keys]) {
  return typeof handlerOrKey === 'function'
    ? { handler: handlerOrKey, targetKeys: keys }
    : { handler: null, targetKeys: [handlerOrKey, ...keys] };
}
