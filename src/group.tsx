import React, { FunctionComponent, isValidElement, cloneElement, Children } from 'react';
import { View } from 'react-native';

import { ItemProps } from './item';

export interface GroupProps extends ItemProps {}

const Group: FunctionComponent<GroupProps> = ({ children, ...groupProps }) => {
  const childrenWithProps = Children.map(children, (child, index) => {
    if (!isValidElement<ItemProps>(child)) return child;

    return cloneElement(child, {
      animatedScroll: groupProps.animatedScroll,
      totalFrames: groupProps.totalFrames,
      slideWidth: groupProps.slideWidth,
      slideHeight: groupProps.slideHeight,
      skipFrames: groupProps.skipFrames,
      pages: groupProps.pages,
      key: `KEY_${index}`,
    });
  });

  return <View {...groupProps}>{childrenWithProps}</View>;
};

export default Group;
