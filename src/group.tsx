import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { ItemProps } from './item';

const Group: FunctionComponent<ItemProps> = ({ children, ...groupProps }) => {
  const childrenWithProps = React.Children.map(children, (child: any, index) =>
    React.cloneElement(child, {
      animatedScroll: groupProps.animatedScroll,
      totalFrames: groupProps.totalFrames,
      slideWidth: groupProps.slideWidth,
      slideHeight: groupProps.slideHeight,
      skipFrames: groupProps.skipFrames,
      pages: groupProps.pages,
      key: `KEY_${index}`,
    }),
  );

  return <View {...groupProps}>{childrenWithProps}</View>;
};

export default Group;
