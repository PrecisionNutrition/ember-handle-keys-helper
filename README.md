# `{{handle-keys}}` helper

Ember helper for handling keyboard events directly in templates together with the `{{on}}` modifier.

It returns a [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) handler which will call your function, if the `key` property of an event matches your target keys (e.g. `"Escape"` or `"ArrowUp"`).

**Some features:**

- can handle multiple keys
- can call `preventDefault`/`stopPropagation` on matched events
- handles non-standard key identifiers for `IE` and `Edge`
- it's really tiny and has no dependencies

**Examples:**

A single key:

```handlebars
<Player {{on "keydown" (handle-keys @pause "Escape")}} />
```

Multiple keys:

```handlebars
<Player
  {{on "keydown" (handle-keys @pause "Escape" "Delete")}}
/>
```

With `stopPropagation`:

```handlebars
<Player
  {{on "keydown" (handle-keys @play "Enter" stopPropagation=true)}}
/>
```

Multiple handlers with multiple `{{on}}` modifiers:

```handlebars
<Player
  {{on "keydown" (handle-keys @play "Enter")}}
  {{on "keydown" (handle-keys @pause "Escape")}}
/>
```

Multiple handlers with a single `{{on}}` modifier, [{{queue}} helper](https://github.com/DockYard/ember-composable-helpers#queue) and `preventDefault` for multiple keys (the handler is optional):

```handlebars
<Player
  {{on "keydown" (queue
    (handle-keys @play "Enter")
    (handle-keys @pause "Escape")
    (handle-keys @volumeUp "ArrowUp")
    (handle-keys @volumeDown "ArrowDown")
    (handle-keys "ArrowUp" "ArrowDown" preventDefault=true)
  )}}
/>
```

## Installation

```
ember install ember-handle-keys-helper
```

## Usage

It's coming. For now, see the examples above.

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
