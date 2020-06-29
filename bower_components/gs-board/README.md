# gs-board

Gobstones Board: A Polymer component that renders a board.

## install
```
npm install
npm install -g grunt-cli
bower install
```

## run

```
# build and start live demo
grunt

# just build
grunt dist
```

## usage

### install
```
bower install --save gobstones/gs-board
```

### one-file compiled version
It is bundled every time `grunt` runs. See `test.html` for an example.

### import
```html
<link rel="import" href="{BOWER_COMPONENTS}/gs-board/dist/components/gs-board.html">
```

### simple board (from GBB)
```html
<gs-board>
  GBB/1.0
  size 4 3
  cell 1 2 Azul 0 Negro 0 Rojo 8 Verde 0
  cell 3 2 Azul 2 Negro 0 Rojo 5 Verde 1
  cell 2 1 Azul 0 Negro 6 Rojo 0 Verde 0
  head 1 2
</gs-board>
```

### initial board (editable)
```html
<gs-board size='{ "x": 4, "y": 4 }' options='{ "editable": true }'></gs-board>
```

### final board (fixed)
```html
<template is="dom-if" if="{{finalState}}" restamp="true">
  <gs-board table='{{finalState.table}}' header="{{finalState.header}}"></gs-board>
</template>
```
```
finalState.table = [[{}, { "red": 3 }], [{ "black": 1 }, {}]]
```

### setting header position
```html
<gs-board size='{ "x": 4, "y": 4 }' header='{ "x": 1, "y": 3 }'></gs-board>
```

### with attire
```html
<gs-board size='{ "x": 4, "y": 4 }' attire="{{attire}}"></gs-board>
```

### boom
```html
<gs-board boom></gs-board>
```

#### Example of attire definition:
```json
{
  "enabled": true,
  "rules": [
    {
      "when": { "blue": "*", "black": "+", "red": 4, "green": "*" },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217961/ef2e0d4c-8dea-11e6-960d-69585778f89d.png"
    },
    {
      "when": { "blue": 3, "black": 0, "red": 1, "green": 0 },
      "text": "hi!"
    },
    {
      "when": { "blue": 0, "black": 0, "red": 0, "green": 0 },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217956/ef1d928c-8dea-11e6-8b53-8d2495cdd3e9.png"
    },
    {
      "when": { "blue": 0, "black": 0, "red": 0, "green": 1 },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217959/ef27e822-8dea-11e6-9bb0-57892593c9d8.png"
    },
    {
      "when": { "blue": 1, "black": 0, "red": 0, "green": 0 },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217958/ef245892-8dea-11e6-80f4-aeb5d1862b1c.png"
    },
    {
      "when": { "blue": 0, "black": 1, "red": 0, "green": 0 },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217957/ef20120a-8dea-11e6-825c-23e7773269b0.png"
    },
    {
      "when": { "blue": 0, "black": 0, "red": 1, "green": 0, "head": true },
      "image": "https://user-images.githubusercontent.com/1631752/33194059-c9794fb0-d0d5-11e7-81dc-65a0f7472a94.png"
    },
    {
      "when": { "blue": 0, "black": 0, "red": 1, "green": 0 },
      "image": "https://cloud.githubusercontent.com/assets/1631752/19217960/ef2ad3c0-8dea-11e6-8434-ff9152b76f3b.png"
    }
  ],
  "borders": {
    "bottom": "https://user-images.githubusercontent.com/1631752/37176618-94629ef6-2325-11e8-9e11-6cf6846bbbc3.png",
    "bottomLeft": "https://user-images.githubusercontent.com/1631752/37176647-9cb96b98-2325-11e8-9244-17e65f8236bc.png",
    "bottomRight": "https://user-images.githubusercontent.com/1631752/37176659-a85c71b6-2325-11e8-8698-952cfbdf73f5.png",
    "left": "https://user-images.githubusercontent.com/1631752/37176682-c09ae398-2325-11e8-90d6-d1793b8c20fd.png",
    "right": "https://user-images.githubusercontent.com/1631752/37176696-c8628ea0-2325-11e8-9fb0-39805f2b810d.png",
    "top": "https://user-images.githubusercontent.com/1631752/37176705-d5459ee6-2325-11e8-8100-23a4b89a064c.png",
    "topLeft": "https://user-images.githubusercontent.com/1631752/37176714-dec70f54-2325-11e8-9589-4b3feaa21a2f.png",
    "topRight": "https://user-images.githubusercontent.com/1631752/37176725-e747cbe6-2325-11e8-8c3b-873501ce0a18.png"
  }
}
```

## considerations
- To update the board, don't mutate the properties directly. **You must use the `update(table, header)` method**.

## Gem wrapper

This module can also be deployed a ruby gem. `gobstones-board` works with Ruby 2.3.1

```bash
cd gem
rake wrapper:wrap
bundle install
bundle exec rspec
```

## Tagging and releasing

```bash
./tag.sh
```
