# handle.js
micro-library for handling key and click events

handle global keys: use single characters, eg. '?' for help, 'a' for some action (modifiers often tied to host shortcuts), does not fire in text inputs

handle mod + char for text inputs, eg ALT + 'r' in text input for reset

handle clicks without touch interface delay

handle state-dependent global keys

for text inputs(input type text/password, textarea): no handling of keys unless modifier present

else: special keys captured on keydown, chars on keypress, shiftKey modifier ignored on keypress


