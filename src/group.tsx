import React, { FunctionComponent, memo } from 'react';
import { View } from 'react-native';

import { ItemProps } from './item';

const Group: FunctionComponent<ItemProps> = props => {
  const childrenWithProps = React.Children.map(props.children, (child: any, index) =>
    React.cloneElement(child, {
      animatedScroll: props.animatedScroll,
      totalFrames: props.totalFrames,
      slideWidth: props.slideWidth,
      slideHeight: props.slideHeight,
      skipFrames: props.skipFrames,
      pages: props.pages,
      key: 'KEY_' + index,
    }),
  );

  return <View {...props}>{childrenWithProps}</View>;
};

export default memo(Group);
