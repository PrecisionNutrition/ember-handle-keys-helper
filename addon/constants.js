/**
  Fixes non-standard key identifiers for IE and Edge
  https://caniuse.com/#feat=keyboardevent-key
*/
export const IE_KEYS_FIX_MAP = {
  Win: 'Meta',
  Scroll: 'ScrollLock',
  Spacebar: ' ',
  Down: 'ArrowDown',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Del: 'Delete',
  Apps: 'ContextMenu',
  Esc: 'Escape',
  Multiply: '*',
  Add: '+',
  Subtract: '-',
  Decimal: '.',
  Divide: '/',
};
