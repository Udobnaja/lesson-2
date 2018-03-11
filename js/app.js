/**
 * @class App
 * @param {Element} el
 */

class App {
  constructor(el) {
    this.doors = [
      // new Door0(0, onUnlock.bind(this)),
      // new Door1(1, onUnlock.bind(this)),
      new Door2(2, onUnlock.bind(this)),
      new Box(3, onUnlock.bind(this))
    ];

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
      let previousUnlocked;

      // Даем открыть следующую дверь
      for (let i = 2; i < this.doors.length; i++) {
        if (!this.doors[i].isLocked) {
          previousUnlocked = true;
        } else {
          if (previousUnlocked && this.doors[i].isLocked) {
            this.doors[i].enable();
            break;
          }
        }
      }
    }
  }
}

// Start the app
var app = new App(document.querySelector('.app'));
