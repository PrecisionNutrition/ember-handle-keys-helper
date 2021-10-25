# `{{handle-keys}}` helper

Ember helper for handling keyboard events directly in templates together with the `{{on}}` modifier.

It returns a [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) handler which will call your function, if the `key` property of the event matches your target keys (e.g. `"Escape"` or `"ArrowUp"`).

**Main features:**

- can handle multiple keys
- can call `preventDefault`/`stopPropagation` on matched events
- handles non-standard key identifiers for `IE` and `Edge`
- it's really tiny and has no dependencies

## Installation

```
ember install ember-handle-keys-helper
```

## Usage

A single key:

```handlebars
<Player {{on 'keydown' (handle-keys @pause 'Escape')}} />
```

Multiple keys for the same handler:

```handlebars
<Player {{on 'keydown' (handle-keys @pause 'Escape' 'Delete')}} />
```

With `stopPropagation` (it will only be called on a matched event):

```handlebars
<Player {{on 'keydown' (handle-keys @play 'Enter' stopPropagation=true)}} />
```

Multiple handlers with multiple `{{on}}` modifiers:

```handlebars
<Player
  {{on 'keydown' (handle-keys @play 'Enter')}}
  {{on 'keydown' (handle-keys @pause 'Escape')}}
/>
```

Multiple handlers with a single `{{on}}` modifier and [{{queue}}](https://github.com/DockYard/ember-composable-helpers#queue) helper:

```handlebars
<Player
  {{on
    'keydown'
    (queue
      (handle-keys @play 'Enter')
      (handle-keys @pause 'Escape')
      (handle-keys @volumeUp 'ArrowUp')
      (handle-keys @volumeDown 'ArrowDown')
      (handle-keys 'ArrowUp' 'ArrowDown' preventDefault=true)
    )
  }}
/>
```

## Compatibility

- Ember.js v3.20 or above
- Ember CLI v3.20 or above
- Node.js v12 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
