import React, { FunctionComponent } from 'react';
import { Dimensions } from 'react-native';

import { Slider, Group, Item } from './index';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const AnyItem: any = Item;

const Page1: FunctionComponent<any> = props => (
  <Group {...props}>
    <AnyItem
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
    />
  </Group>
);

const UpgradeCTACarousel: FunctionComponent = () => (
  <Slider pages={5} totalFrames={1600} slideWidth={screenWidth} slideHeight={screenHeight * 0.8}>
    <Page1 />
  </Slider>
);

export default UpgradeCTACarousel;
