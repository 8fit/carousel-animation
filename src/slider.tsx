import React, {
  FunctionComponent,
  useRef,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { StyleSheet, Animated, ScrollViewProperties, View, ScrollViewProps } from 'react-native';

import { GroupProps } from './group';

export interface SliderProps extends ScrollViewProps {
  slideWidth: number;
  slideHeight: number;
  totalFrames: number;
  pages: number;
  scrollViewProps?: ScrollViewProperties;
  skipFrames?: number;
  onPageChange?: (page: number) => void;
}

const Slider: FunctionComponent<SliderProps> = props => {
  const animatedScroll = useRef(new Animated.Value(0));
  const totalWidth = props.slideWidth * props.pages;
  const childrenWithProps = Children.map(props.children, (child, index) => {
    if (!isValidElement<GroupProps>(child)) return child;

    return cloneElement(child, {
      animatedScroll: animatedScroll.current,
      pages: props.pages,
      slideWidth: props.slideWidth,
      slideHeight: props.slideHeight,
      skipFrames: props.skipFrames,
      totalFrames: props.totalFrames,
      key: `KEY_${index}`,
    });
  });

  const handleMomentumScrollEnd = useCallback<NonNullable<ScrollViewProps['onMomentumScrollEnd']>>(
    event => {
      if (!props.onPageChange) return;

      props.onPageChange(Math.round(event.nativeEvent.contentOffset.x / props.slideWidth));
    },
    [props.slideWidth, props.onPageChange],
  );

  return (
    <>
      <View style={styles.container}>{childrenWithProps}</View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        style={styles.scroll}
        contentContainerStyle={{ width: totalWidth }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animatedScroll.current } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        {...props.scrollViewProps}
      />
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  scroll: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
