import React from 'react';
import { Image, View, ViewProps, ImageProps, ImageSourcePropType } from 'react-native';

import Item, { ItemProps } from './item';
import Group, { GroupProps } from './group';
import Slider, { SliderProps } from './slider';

type ChildJSON =
  | {
      type: 'Item';
      properties: Omit<ItemProps, 'children'> & { key: string };
      children: ChildJSON[];
    }
  | {
      type: 'Group';
      properties: Omit<GroupProps, 'children'> & { key: string };
      children: ChildJSON[];
    }
  | {
      type: 'View';
      properties: Omit<ViewProps, 'children'> & { key: string };
      children: ChildJSON[];
    }
  | {
      type: 'Image';
      properties: Omit<ImageProps, 'source'> & { key: string; source: { require: string } };
    };

export interface SliderJSON {
  properties: Omit<SliderProps, 'children'>;
  children: ChildJSON[];
}

export interface AssetLibrary {
  [key: string]: ImageSourcePropType;
}

const mapChild = (assets: AssetLibrary) => (item: ChildJSON, index: number) =>
  createComponent(
    { ...item, properties: { ...item.properties, key: `ITEM__${index}` } } as ChildJSON,
    assets,
  );

function createComponent(json: ChildJSON, assets: AssetLibrary) {
  const withAssets = mapChild(assets);

  switch (json.type) {
    case 'Group':
      return <Group {...json.properties}>{json.children.map(withAssets)}</Group>;
    case 'Item':
      return <Item {...json.properties}>{json.children.map(withAssets)}</Item>;
    case 'View':
      return <View {...json.properties}>{json.children.map(withAssets)}</View>;
    case 'Image': {
      const { source, ...imageProps } = json.properties;

      return <Image {...imageProps} source={assets[source.require]} />;
    }
    default:
      return null;
  }
}

const FromJSON = ({ properties, children }: SliderJSON, assets: AssetLibrary) => (
  <Slider {...properties}>{children.map(mapChild(assets))}</Slider>
);

export default FromJSON;
