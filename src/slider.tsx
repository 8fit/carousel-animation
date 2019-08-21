import React, { FunctionComponent, useRef, useCallback, Children, cloneElement } from 'react';
import { StyleSheet, Animated, ScrollViewProperties, View, ScrollViewProps } from 'react-native';

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
  const { current: animatedScroll } = useRef(new Animated.Value(0));
  const totalWidth = props.slideWidth * props.pages;
  const childrenWithProps = Children.map(props.children, (child: any, index) =>
    cloneElement(child, {
      animatedScroll: animatedScroll,
      page: index,
      pages: props.pages,
      slideWidth: props.slideWidth,
      slideHeight: props.slideHeight,
      skipFrames: props.skipFrames,
      totalFrames: props.totalFrames,
    }),
  );

  const handleMomentumScrollEnd = useCallback(
    (event: any) => {
      const page = Math.round(event.nativeEvent.contentOffset.x / props.slideWidth);

      if (props.onPageChange) props.onPageChange(page);
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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animatedScroll } } }], {
          useNativeDriver: true,
        })}
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
