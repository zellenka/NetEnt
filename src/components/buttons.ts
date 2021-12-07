import * as PIXI from 'pixi.js';

export default function (buttonImage: string, app: PIXI.Application): PIXI.Sprite {
  const buttonSprite = new PIXI.Sprite(PIXI.Loader.shared.resources[buttonImage].texture);
  buttonSprite.anchor.set(0.5);
  buttonSprite.x = app.screen.width / 2;
  buttonSprite.y = app.screen.height / 2;
  return buttonSprite;
}
