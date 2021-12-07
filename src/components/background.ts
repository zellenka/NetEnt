import * as PIXI from 'pixi.js';

export default function (bgImage: string): PIXI.Sprite {
  return new PIXI.Sprite(PIXI.Loader.shared.resources[bgImage].texture);
}
