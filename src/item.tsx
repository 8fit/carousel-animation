import React, { Component } from "react";
import { Animated, ViewProps } from "react-native";
import Group from "./group";

interface Frame {
  frame: number;
  value: number | string;
}

interface KeyFrame {
  property: 'opacity' | 'perspective' | 'rotate' | 'rotateX' | 'rotateY' | 'rotateZ'
          | 'scale' | 'scaleX' | 'scaleY' | 'translateX' | 'translateY' | 'skewX' | 'skewY';
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
  children?: React.ReactNode;
}

export default class Item extends Component<ItemProps> {
  static defaultProps = {
    keyframes: [],
  };

  get style() {
    const { slideWidth, slideHeight, animatedScroll, keyframes, totalFrames, pages } = this.props;
    
    if(!slideWidth || ! slideHeight || !animatedScroll || !keyframes || !totalFrames || !pages) {
      return null;
    }

    let style:any = { transform: [{ perspective: 1000 }] };

    keyframes.map(keyframe => {
      const { property, frames } = keyframe;
      const inputRange: any[] = [];
      const outputRange: any[] = [];

      frames.forEach(({ frame, value }) => {
        const frameNumber = this.props.skipFrames ? frame - this.props.skipFrames : frame;
        const framePerPage = totalFrames / pages;
        inputRange.push((frameNumber / framePerPage) * slideWidth);

        if (property === "translateX" && typeof value === 'number' ) {
          outputRange.push(value * slideWidth);
        } else if (property === "translateY" && typeof value === 'number') {
          outputRange.push(value * slideHeight);
        } else {
          outputRange.push(value);
        }
      });

      const interpolatedValue = animatedScroll.interpolate({
        inputRange,
        outputRange,
        extrapolate: "clamp"
      });

      if (property !== "opacity") {
        style.transform.push({
          [property]: interpolatedValue
        });
      } else {
        style.opacity = interpolatedValue;
      }
    });

    return style;
  }

  render() {
    return (
      <Animated.View
        style={[
          this.style,
          { position: "absolute", left: 0, right: 0, top: 0 },
          this.props.center && { alignItems: "center" },
          this.props.style
        ]}
      >
        <Group {...this.props}>{this.props.children}</Group>
      </Animated.View>
    );
  }
}
