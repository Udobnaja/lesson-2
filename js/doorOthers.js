// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
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

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

class Door1 extends DoorBase {
    constructor(...args){
        super(...args);

        const lever = this.popup.querySelector(".lever__button");

        lever.addEventListener('pointerdown', this._onLeverPointerDown);
        lever.addEventListener('pointerup', this._onLeverPointerUp);
        lever.addEventListener('pointermove', this._onLeverPointerMove);
    }

    _onLeverPointerDown(e){
        let target = e.target;
        target.setPointerCapture(e.pointerId);
        target.classList.add('lever__button_pressed');
    }

    _onLeverPointerUp(e){
      let target = e.target;
      target.classList.remove('lever__button_pressed');
      target.releasePointerCapture(e.pointerId);
      target.style.transform = 'translateY(15px)';
    }

    _onLeverPointerMove(e){
      let target = e.target;

      const gap = 15;

      // Проверям класс, так как сафари не поддерживает setPointerCapture
      if ((target.hasPointerCapture && target.hasPointerCapture(e.pointerId)) || target.classList.contains('lever__button_pressed')) {
        let newpos = e.clientY - target.parentElement.offsetTop - (target.offsetHeight/2);
        let distance = target.parentElement.offsetHeight - target.offsetHeight;

        if (newpos < gap) {
          newpos = gap;
        } else if (newpos > (distance - gap)) {
          newpos = distance - gap;
        } else if (newpos > distance){
          newpos = distance;
        }

        console.log({parentH: target.parentElement.offsetHeight, targetH: target.offsetHeight, newP: newpos});

        // request animation frame
        target.style.transform = `translateY(${newpos}px)`;
      }
    }


}


/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
