import * as PIXI from 'pixi.js';
import background from './components/background';
import images from './components/images';
import button from './components/buttons';

const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);
document.getElementsByTagName('canvas')[0].style.cssText = 'max-width: 100%';

let state = 'initial';
const speed = 0.01;
const circleRadius = 200;
let acceleration = 1;

PIXI.Loader.shared
  .add([
    './assets/img/background.jpg',
    './assets/img/background-portrait.jpg',
    './assets/img/SYM1.png',
    './assets/img/SYM3.png',
    './assets/img/SYM4.png',
    './assets/img/SYM5.png',
    './assets/img/SYM6.png',
    './assets/img/SYM7.png',
    './assets/img/btn-active.png',
    './assets/img/btn-inactive.png',
  ])
  .load(setup);

function setup() {
  const container = new PIXI.Container();
  const bg = background('./assets/img/background.jpg');
  const buttonActive = button('./assets/img/btn-active.png', app);
  const buttonInactive = button('./assets/img/btn-inactive.png', app);

  const imagesArr = ['./assets/img/SYM1.png',
    './assets/img/SYM3.png',
    './assets/img/SYM4.png',
    './assets/img/SYM5.png',
    './assets/img/SYM6.png',
    './assets/img/SYM7.png'];

  const imgSprites = imagesArr.map((img: string) => images(img));
  const angleStep = 360 / imgSprites.length;
  for (let i = 0; i < imgSprites.length; i++) {
    if (i === 0) {
      imgSprites[i].anchor.set(0.5);
      imgSprites[i].x = 0;
      imgSprites[i].y = circleRadius;
      container.addChild(imgSprites[i]);
    } else {
      const angleInRadians = angleStep * i * (Math.PI / 180);
      imgSprites[i].anchor.set(0.5);
      imgSprites[i].x = circleRadius * Math.sin(angleInRadians);
      imgSprites[i].y = circleRadius * Math.cos(angleInRadians);
      container.addChild(imgSprites[i]);
    }
  }

  buttonActive.interactive = true;
  buttonActive.buttonMode = true;

  buttonInactive.interactive = false;
  buttonInactive.alpha = 0;
  buttonInactive.buttonMode = true;

  function onClick() {
    if (state === 'initial') {
      state = 'active';
      buttonActive.alpha = 0;
      buttonActive.interactive = false;
      buttonInactive.alpha = 1;
      app.ticker.add((delta) => {
        if (acceleration >= 4) {
          return;
        }
        acceleration += (4 / app.ticker.FPS * delta);
      });

      setTimeout(() => {
        buttonStateChanger(4, buttonActive);
      }, 1000);
    } else {
      state = 'initial';
      buttonActive.alpha = 0;
      buttonActive.interactive = false;
      buttonInactive.alpha = 1;
      app.ticker.add((delta) => {
        if (acceleration <= 1) {
          return;
        }
        acceleration -= (4 / app.ticker.FPS * delta);
      });

      setTimeout(() => {
        buttonStateChanger(1, buttonActive);
      }, 1000);
    }
  }

  buttonActive.on('pointerdown', onClick);

  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  app.stage.addChild(bg);
  app.stage.addChild(container);
  app.stage.addChild(buttonInactive);
  app.stage.addChild(buttonActive);

  app.ticker.add((delta) => {
    container.rotation += speed * acceleration * delta;
    for (let i = 0; i < imgSprites.length; i++) {
      imgSprites[i].rotation -= speed * acceleration * delta;
    }
  });
}

function buttonStateChanger(accelerationValue: number, button: PIXI.Sprite) {
  acceleration = accelerationValue;
  button.alpha = 1;
  button.interactive = true;
}
