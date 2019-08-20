import React, { FunctionComponent, memo } from 'react';
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

interface InterpolatedStyles {
  opacity?: number | Animated.AnimatedInterpolation;
  transform: Array<
    Partial<{ [key in TransformProperty]: number | Animated.AnimatedInterpolation }>
  >;
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
  children?: React.ReactNode;
}

const getInterpolatedStyles = ({
  slideWidth,
  slideHeight,
  animatedScroll,
  totalFrames,
  pages,
  skipFrames,
  keyframes = [],
}: ItemProps) => {
  if (!slideWidth || !slideHeight || !animatedScroll || !keyframes || !totalFrames || !pages) {
    return null;
  }

  const style: InterpolatedStyles = { transform: [{ perspective: 1000 }] };

  keyframes.map(keyframe => {
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

    if (property !== 'opacity') style.transform.push({ [property]: interpolatedValue });
    else style.opacity = interpolatedValue;
  });

  return style;
};

const Item: FunctionComponent<ItemProps> = props => (
  <Animated.View
    style={[
      getInterpolatedStyles(props),
      { position: 'absolute', left: 0, right: 0, top: 0 },
      props.center && { alignItems: 'center' },
      props.style,
    ]}
  >
    <Group {...props}>{props.children}</Group>
  </Animated.View>
);

export default memo(Item);
