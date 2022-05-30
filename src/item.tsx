import React, { FunctionComponent, useRef, useEffect } from 'react';
import { Animated, ViewProps } from 'react-native';

import Group from './group';

interface Frame {
  frame: number;
  value: number | string;
}

type TransformProperty =
  | 'perspective'
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'translateX'
  | 'translateY'
  | 'skewX'
  | 'skewY';

interface KeyFrame {
  property: TransformProperty | 'opacity';
  frames: Frame[];
}

export interface ItemProps extends ViewProps {
  slideWidth?: number;
  slideHeight?: number;
  totalFrames?: number;
  keyframes?: KeyFrame[];
  skipFrames?: number;
  pages?: number;
  animatedScroll?: Animated.Value;
  center?: boolean;
}

const getInterpolatedStyles = (
  slideWidth: ItemProps['slideWidth'],
  slideHeight: ItemProps['slideHeight'],
  animatedScroll: ItemProps['animatedScroll'],
  totalFrames: ItemProps['totalFrames'],
  pages: ItemProps['pages'],
  skipFrames: ItemProps['skipFrames'],
  keyframes: ItemProps['keyframes'] = [],
) => {
  if (!slideWidth || !slideHeight || !animatedScroll || !keyframes || !totalFrames || !pages) {
    return null;
  }

  const style: any = { transform: [{ perspective: 1000 }] };

  keyframes.map((keyframe) => {
    const { property, frames } = keyframe;
    const inputRange: number[] = [];
    const outputRange: any[] = [];

    frames.forEach(({ frame, value }) => {
      const frameNumber = skipFrames ? frame - skipFrames : frame;
      const framePerPage = totalFrames / pages;

      inputRange.push((frameNumber / framePerPage) * slideWidth);

      if (property === 'translateX' && typeof value === 'number') {
        outputRange.push(value * slideWidth);
      } else if (property === 'translateY' && typeof value === 'number') {
        outputRange.push(value * slideHeight);
      } else {
        outputRange.push(value);
      }
    });

    const interpolatedValue = animatedScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

    switch (property) {
      case 'opacity':
        style.opacity = interpolatedValue;
        break;
      default:
        style.transform?.push({ [property]: interpolatedValue });
        break;
    }
  });

  return style;
};

const Item: FunctionComponent<ItemProps> = (props) => {
  const interpolatedStyles = useRef(
    getInterpolatedStyles(
      props.slideWidth,
      props.slideHeight,
      props.animatedScroll,
      props.totalFrames,
      props.pages,
      props.skipFrames,
      props.keyframes,
    ),
  );

  useEffect(() => {
    interpolatedStyles.current = getInterpolatedStyles(
      props.slideWidth,
      props.slideHeight,
      props.animatedScroll,
      props.totalFrames,
      props.pages,
      props.skipFrames,
      props.keyframes,
    );
  }, [
    props.slideWidth,
    props.slideHeight,
    props.animatedScroll,
    props.totalFrames,
    props.pages,
    props.skipFrames,
    props.keyframes,
  ]);

  return (
    <Animated.View
      style={[
        interpolatedStyles.current,
        { position: 'absolute', left: 0, right: 0, top: 0 },
        props.center && { alignItems: 'center' },
        props.style,
      ]}
    >
      <Group {...props}>{props.children}</Group>
    </Animated.View>
  );
};

export default Item;
