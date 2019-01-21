# Carousel Animation

> Create carousel animation using configuration files


## Install

```bash
yarn add https://github.com/8fit/carousel-animation.git#v0.1.9
```

## Usage

### Using JSX

```tsx
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Slider, Item } from 'eightfit.carousel.animation';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default function UpgradeCTACarousel() {
  return (
    <Slider pages={5} totalFrames={1600} slideWidth={screenWidth} slideWidth={screenHeight}>
      <Item
        center={true}
        keyframes={[
          {
            property: 'translateX',
            frames: [
              { frame: -100, value: 0.05 },
              { frame: 0, value: 0 },
              { frame: 182, value: -0.7 },
            ],
          },
          {
            property: 'scale',
            frames: [{ frame: -100, value: 1 }, { frame: 0, value: 1 }, { frame: 182, value: 1.1 }],
          },
          {
            property: 'opacity',
            frames: [{ frame: 0, value: 1 }, { frame: 188, value: 1 }, { frame: 300, value: 0 }],
          },
          {
            property: 'translateY',
            frames: [{ frame: 0, value: 0.1 }, { frame: 1, value: 0.1 }],
          },
        ]}
      >
        <Image source={require('./assets/8.png')} />
      </Item>
    </Slider>
  );
}

```

### Using json files

``` json
// animation.json
{
  "properties": {
    "pages": 5,
    "totalFrames": 1600,
    "sliderWidth": 375,
    "sliderHeight": 812
  },
  "children": [
    {
      "type": "Item",
      "properties": {
        "center": true,
        "keyframes": [
          {
            "property": "translateX",
            "frames": [
              { "frame": -100, "value": 0.05 },
              { "frame": 0, "value": 0 },
              { "frame": 182, "value": -0.7 }
            ]
          },
          {
            "property": "scale",
            "frames": [
              { "frame": -100, "value": 1 },
              { "frame": 0, "value": 1 },
              { "frame": 182, "value": 1.1 }
            ]
          },
          {
            "property": "opacity",
            "frames": [
              { "frame": 0, "value": 1 },
              { "frame": 188, "value": 1 },
              { "frame": 300, "value": 0 }
            ]
          },
          {
            "property": "translateY",
            "frames": [
              { "frame": 0, "value": 0.1 },
              { "frame": 1, "value": 0.1 }
            ]
          }
        ]
      },
      "children": [
         {
           "type": "Image",
          "properties": {
            "source": { "require": "8.png" }
          }
        }
      ]
    }
  ]
}

```

``` jsx
const assets = {
  '8.png': require('./assets/8.png'),
}
export default () => Parse(require('./animation.json'), assets);

```

## Grouping
You can use `Group` to separate your animation into multiple components

``` jsx
import { Item, Group } from 'eightfit.carousel.animation';

function Page1(props: any) {
  return (
    <Group {...props}>
      <Item ... />
      <Item ... />
    </Group>
  )
}

function Page2(props: any) {
  return (
    <Group {...props}>
      <Item ... />
      <Item ... />
    </Group>
  )
}

function Page3(props: any) {
  return (
    <Group {...props}>
      <Item ... />
      <Item ... />
    </Group>
  )
}


export default function UpgradeCTACarousel() {
  return (
    <Slider>
      <Page1 />
      <Page2 />
      <Page3 />
    </Slider>
  );
}
```

## License

MIT © [drmas](https://github.com/drmas)
