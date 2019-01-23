import React from 'react';
import { ItemProps } from './item';
import { View } from 'react-native';

export default function Group(props: ItemProps) {
  const childrenWithProps = React.Children.map(props.children, (child: any, index) =>
    React.cloneElement(child, {
      animatedScroll: props.animatedScroll,
      totalFrames: props.totalFrames,
      slideWidth: props.slideWidth,
      slideHeight: props.slideHeight,
      key: 'KEY_' + index,
    }),
  );
  return <View {...props}>{childrenWithProps}</View>;
}
