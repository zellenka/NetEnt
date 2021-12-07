import * as PIXI from 'pixi.js';

export default function (image: string): PIXI.Sprite {
  return new PIXI.Sprite(PIXI.Loader.shared.resources[image].texture);
}
