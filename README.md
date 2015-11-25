# handle.js
micro-library for handling key and click events

handle global keys: use single characters, eg. '?' for help, 'a' for some action (modifiers often tied to host shortcuts), does not fire in text inputs

handle mod + char for text inputs, eg ALT + 'r' in text input for reset

handle clicks without touch interface delay

handle state-dependent global keys

for text inputs(input type text/password, textarea): no handling of keys unless modifier present

else: special keys captured on keydown, chars on keypress, shiftKey modifier ignored on keypress

## Key combinations

```
[printable ascii]
a-z [+ ctrl][ + alt]
[specialKey] [+ ctrl][ + alt][+ shift]
```

For key events triggered by single characters (without any modifiers), the listener is triggered by a keypress event. Character events are not bound to specific keys (varies across keyboard layouts). For these, case matters (distinguishes between `a` and `A`).

For key events triggered by single characters with a modifier (alt or ctrl), these can only be consistently captured by keydown events, which limits these to characters with known keycodes (a-z). For these, case does not matter, and punctuation characters cannot be consistently captured across browsers and keyboard layouts.

For key events triggered by special keys, these can be consistently triggered by keydown with any combination of modifiers (ctr, alt, shift). There is a limited subset of special keys that are consistent across browsers.

## Consistent cross-browser handling of key events ...
... is tricky. There are a few pages documenting quirks and limitations across browsers [here](http://unixpapa.com/js/key.html) and [here](http://www.quirksmode.org/js/keys.html). [This link](http://stackoverflow.com/questions/3036243/cancel-the-keydown-in-html) addresses cross-browser issues in preventing default key events in text inputs.

## Limitations

- Ignores key events from text inputs (textarea, input[type="text"], input[type="password"]), attach custom handlers to handle key events from any of these
- Limited to one handler per event type per element (global, state or dom element)


