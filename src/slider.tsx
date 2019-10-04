import React, {
  FunctionComponent,
  useRef,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import { StyleSheet, Animated, View, ScrollViewProps, ImageProps, ViewProps } from 'react-native';

import { GroupProps } from './group';
import { ItemProps } from './item';

type ChildProps = GroupProps | ItemProps | ImageProps | ViewProps;

export interface SliderProps extends ScrollViewProps {
  slideWidth: number;
  slideHeight: number;
  totalFrames: number;
  pages: number;
  skipFrames?: number;
  onPageChange?: (page: number) => void;
}

const Slider: FunctionComponent<SliderProps> = ({
  slideWidth,
  slideHeight,
  totalFrames,
  pages,
  skipFrames,
  onPageChange,
  children,
  ...scrollViewProps
}) => {
  const animatedScroll = useRef(new Animated.Value(0));
  const totalWidth = slideWidth * pages;
  const childrenWithProps = Children.map(children, (child, index) => {
    if (!isValidElement<ChildProps>(child)) return child;

    return cloneElement(child, {
      animatedScroll: animatedScroll.current,
      pages: pages,
      slideWidth: slideWidth,
      slideHeight: slideHeight,
      skipFrames: skipFrames,
      totalFrames: totalFrames,
      key: `KEY_${index}`,
    });
  });

  const handleMomentumScrollEnd = useCallback<NonNullable<ScrollViewProps['onMomentumScrollEnd']>>(
    event => {
      if (!onPageChange) return;

      onPageChange(Math.round(event.nativeEvent.contentOffset.x / slideWidth));
    },
    [slideWidth, onPageChange],
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
        {...scrollViewProps}
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
