import React from 'react';
import { Image, View } from 'react-native';

import Item from './item';
import Group from './group';
import Slider from './slider';

const types: any = {
  Image,
  View,
  Item,
  Group,
};

interface AssetsLibrary {
  [key: string]: any;
}

function mapChild(assets: AssetsLibrary) {
  return (item: any, index: number) =>
    createComponent({ ...item, properties: { ...item.properties, key: 'ITEM__' + index } }, assets);
}

function createComponent(json: any, assets: AssetsLibrary) {
  const { type, properties, children } = json;
  const withAssets = mapChild(assets);

  if (properties && properties.source && properties.source.require) {
    properties.source = assets[properties.source.require];
  }

  return React.createElement(types[type], properties, (children || []).map(withAssets));
}

const Parser = ({ properties, children }: any, assets: AssetsLibrary) => (
  <Slider {...properties}>{children.map(mapChild(assets))}</Slider>
);

export default Parser;
