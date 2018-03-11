/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */


class Door0 extends DoorBase {
  constructor(...args) {
    super(...args);

    this.buttons = [
      this.popup.querySelector('.door-riddle__button_0'),
      this.popup.querySelector('.door-riddle__button_1'),
      this.popup.querySelector('.door-riddle__button_2')
    ];

    this.buttons.forEach(function (b) {
      b.addEventListener('pointerdown', this._onButtonPointerDown.bind(this));
      b.addEventListener('pointerup', this._onButtonPointerUp.bind(this));
      b.addEventListener('pointercancel', this._onButtonPointerUp.bind(this));
      b.addEventListener('pointerleave', this._onButtonPointerUp.bind(this));
    }.bind(this));
  }

  _onButtonPointerDown(e) {
    e.target.classList.add('door-riddle__button_pressed');
    this.checkCondition();
  }

  _onButtonPointerUp(e) {
    e.target.classList.remove('door-riddle__button_pressed');
  }

  /**
   * Проверяем, можно ли теперь открыть дверь
   */
  checkCondition() {
    var isOpened = true;
    this.buttons.forEach(function (b) {
      if (!b.classList.contains('door-riddle__button_pressed')) {
        isOpened = false;
      }
    });

    // Если все три кнопки зажаты одновременно, то откроем эту дверь
    if (isOpened) {
      this.unlock();
    }
  }
}

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

class Door1 extends DoorBase {
  constructor(...args) {
    super(...args);

    const button = this.popup.querySelector(".button");

    button.addEventListener('pointerdown', this._onButtonPointerDown.bind(this));


    this.scaleValue = this.popup.querySelector(".scale__value");
    this.scale = this.popup.querySelector(".scale");
    this.seconds = 10;
    this.timerId;


  }

  _resetResult(){
    this.popup.querySelector(".time-headline").textContent = '10 sec';
    this.seconds = 10;
    this.scaleValue.style.height = 0;
    this.timerId = null;
  }

  _onButtonPointerDown(e){

    let target = e.target;
    let oldHeight = this.scaleValue.offsetHeight;


    if (!this.timerId){
      this.timerId = setInterval(() => {
        if (oldHeight < this.scaleValue.offsetHeight){
          oldHeight = this.scaleValue.offsetHeight;
        } else {
          this.scaleValue.style.height = 0;
        }

        this.popup.querySelector(".time-headline").textContent = `${--this.seconds} sec`;

        if (this.seconds <= 0) {
          clearInterval(this.timerId);

          if (this.scaleValue.offsetHeight < this.scale.offsetHeight){
            target.disabled = true;
            alert('Проиграли!');
            this.closePopup();
            this._resetResult();
          }
        }

      }, 1000);
    }

    this.scaleValue.style.height = this.scaleValue.offsetHeight + 9 + 'px';

    if (this.scaleValue.offsetHeight >= this.scale.offsetHeight && this.timerId){
      clearInterval(this.timerId);
      this.unlock();
    }

  }
}


/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
class Door2 extends DoorBase {
  constructor(...args) {
    super(...args);

    const lever = this.popup.querySelector(".lever__button");

    lever.addEventListener('pointerdown', this._onLeverPointerDown.bind(this));
    lever.addEventListener('pointerup', this._onLeverPointerUp.bind(this));
    lever.addEventListener('pointercancel', this._onLeverPointerUp.bind(this));
    lever.addEventListener('pointermove', this._onLeverPointerMove.bind(this));

    this.gears = this.popup.querySelectorAll('.gears__item');
    let placeholders = [...this.popup.querySelectorAll('.gears__placeholder')];
    this.gearsLeft = placeholders.map((el) => el.offsetLeft);
    this.gearsTop = placeholders.map((el) => el.offsetTop);
    this.scores = 0;

    for (let gear of this.gears) {
      gear.addEventListener('pointerdown', this._onGearPointerDown);
      gear.addEventListener('pointerup', this._onGearPointerUp);
      gear.addEventListener('pointercancel', this._onGearPointerUp);
      gear.addEventListener('pointermove', this._onGearPointerMove.bind(this));
    }
  }

  _onGearPointerDown(e) {
    let target = e.target;

    if ([...this.gears].some(g => g.classList.contains('gears__item_pressed'))){
      return;
    }

    target.classList.add('gears__item_pressed');
    target.setPointerCapture(e.pointerId);

  }

  _onGearPointerUp(e) {
    let target = e.target;

    target.classList.remove('gears__item_pressed');

    if (!target.classList.contains('gears__item_done')) {
      target.style.transform = `translateX(${target.dataset.left}px) translateY(0)`;
    }
  }

  _onGearPointerMove(e) {
    let target = e.target;

    if (target.classList.contains('gears__item_done')) {
      return;
    }

    let posX = e.clientX - target.parentElement.offsetLeft - (target.offsetWidth / 2);
    let posY = target.parentElement.offsetHeight - (e.clientY - target.parentElement.offsetTop - (target.offsetHeight / 2));

    target.style.transform = `translateX(${posX}px) translateY(-${posY}px)`;

    let left = Math.trunc(posX);
    let top = target.parentElement.offsetHeight - Math.trunc(posY);

    if (this.gearsLeft.includes(left) && this.gearsTop.includes(top)) {
      target.style.transform = `translateX(${left}px) translateY(-${posY}px)`;
      target.classList.add('gears__item_done');
      target.classList.remove('gears__item_pressed');
      this.scores += 1;
      this.checkCondition();
      // не успеваю побороть
      // let snd = new Audio("../sound.mp3");
      // snd.play();
    }

  }

  _onLeverPointerDown(e) {
    let target = e.target;
    target.setPointerCapture(e.pointerId);
    target.classList.add('lever__button_pressed');
  }

  _onLeverPointerUp(e) {
    let target = e.target;
    target.classList.remove('lever__button_pressed');
    target.releasePointerCapture(e.pointerId);
    target.style.transform = 'translateY(15px)';
    this.hideGears();
  }

  _onLeverPointerMove(e) {
    let target = e.target;

    const gap = 15;

    // Проверям класс, так как сафари не поддерживает setPointerCapture
    if ((target.hasPointerCapture && target.hasPointerCapture(e.pointerId)) || target.classList.contains('lever__button_pressed')) {
      let newpos = e.clientY - target.parentElement.parentElement.offsetTop - (target.offsetHeight / 2);
      let distance = target.parentElement.offsetHeight - target.offsetHeight;
      let isHideGears = false;

      if (newpos < gap) {
        newpos = gap;
      } else if (newpos > (distance - gap)) {
        newpos = distance - gap;
        isHideGears = true;
      } else if (newpos > distance) {
        newpos = distance;
      }

      if (!isHideGears) {
        this.hideGears()
      } else {
        this.showGears();
      }

      // request animation frame мб
      target.style.transform = `translateY(${newpos}px)`;
    }
  }

  hideGears() {
    for (let gear of this.gears) {
      if (gear.classList.contains('gears__item_done')) {
        gear.classList.remove('gears__item_done');
        gear.style.transform = `translateX(${gear.dataset.left}px) translateY(0)`;
      }

      if (gear.classList.contains('gears__item_show')) gear.classList.remove('gears__item_show');
    }
    if (this.scores) this.scores = 0;
  }

  showGears() {
    for (let gear of this.gears) {
      gear.classList.add('gears__item_show');
    }
  }

  checkCondition() {
    if (this.scores === 3) {
      this.unlock();
    }
  }
}

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

class Box extends DoorBase {
  constructor(...args) {
    super(...args);

    this.panels = this.popup.querySelectorAll('.panel');

    this.panels.forEach((p) => {
      p.addEventListener('pointerdown', this._onPanelPointerDown.bind(this));
      p.addEventListener('pointerup', this._onPanelPointerUp.bind(this));
      p.addEventListener('pointermove', this._onPanelPointerMove.bind(this));
    });

    let key = this.popup.querySelector('.keypanel__key');
    key.addEventListener('pointerdown', this._onKeyPointerDown.bind(this))
    key.addEventListener('pointermove', this._onKeyPointerMove.bind(this))
  }

  _onKeyPointerDown(e) {
    let target = e.target;
    target.classList.add('keypanel__key_pressed')
  }

  _onKeyPointerMove(e) {
    let target = e.target;
    if (target.classList.contains('keypanel__key_inserted')) {
      return;
    }

    let newPos = e.clientY - target.parentElement.offsetTop - (target.offsetHeight / 2);
    if (target.getBoundingClientRect().top <= target.parentElement.parentElement.offsetTop + this.popup.querySelector('.keypanel__keyhole').offsetTop) {
      target.classList.add('keypanel__key_inserted');
      this.unlock();
    }
    target.style.transform = `translateX(-50%) translateY(${newPos}px)`;

  }

  _onPanelPointerDown(e) {
    let target = e.target;
    target.classList.add('panel_pressed');
  }

  _onPanelPointerUp(e) {

    this.panels.forEach((p) => {
      p.classList.remove('panel_pressed');
    });
  }

  _onPanelPointerMove(e) {
    if (this.popup.querySelector('.keypanel__key').classList.contains('keypanel__key_pressed')) {
      return;
    }

    let target = e.target;

    if ([...this.panels].every(p => p.classList.contains('panel_pressed'))) {
      let newPos = e.clientX - target.parentElement.parentElement.offsetLeft - (target.offsetWidth / 2);
      if (target.dataset.pos === 'left') {
        if (newPos >= target.offsetWidth) {
          newPos = target.offsetWidth;
        }

        if (newPos <= 0) {
          newPos = 0;
        }
      }
      if (target.dataset.pos === 'right') {
        if (newPos <= target.parentElement.offsetWidth / 2) {
          newPos = target.parentElement.offsetWidth / 2;
        }

        if (newPos >= target.parentElement.offsetWidth - target.offsetWidth) {
          newPos = target.parentElement.offsetWidth - target.offsetWidth;
        }
      }
      target.style.transform = `translateX(${newPos}px)`;
    }

    let left = 0;
    let right = 0;

    this.panels.forEach((p) => {
      if (p.dataset.pos === 'left') {
        left = p.parentElement.offsetWidth / 2 + p.parentElement.getBoundingClientRect().left - p.getBoundingClientRect().left - p.offsetWidth;
      } else {
        right = p.getBoundingClientRect().left - p.parentElement.getBoundingClientRect().left - p.parentElement.offsetWidth / 2;
      }

    });

    let keyhole = this.popup.querySelector('.keypanel__keyhole');
    let keyContainer = this.popup.querySelector('.keypanel__footer');
    if ((left >= keyhole.offsetWidth / 2) && (right >= keyhole.offsetWidth / 2)) {
      if (!keyContainer.classList.contains('keypanel__footer_visible')) {
        keyContainer.classList.add('keypanel__footer_visible');
      }
    } else {
      keyContainer.classList.remove('keypanel__footer_visible');
    }

  }

  showCongratulations() {
    alert('Поздравляю! Игра пройдена!');
  }
}
