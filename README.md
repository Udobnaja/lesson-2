# Домашнее задание ко второй лекции ШРИ
## Работа с сенсорным пользовательским вводом

### Команды

Поставить зависимости `npm install`

Линт `npm run lint`

Деплой проекта на github-pages `npm run deploy`

**Демо**: https://udobnaja.github.io/lesson-2/index.html

### Описание работы игры

**Первая дверь**: Нажать три кнопки одновременно.

**Вторая дверь**: Нужно кликать по кнопке и Успеть заполнить шкалу за 10 секунд, если долго не кликать, шкала обнуляется.

**Третья дверь**: Нужно потянуть рычаг, тогда появятся шестеренки, если рычаг отпустить, то шестиренки снова исчезнут.
Нужно поставить шестеренки у нужные пазы, к сожалению, пиксель в пиксель. 

**Четвертый шаг**: Нужно открыть плашки, под которыми скрыт ключ,
если ширина раскрытого пространства равна или больше замочной скважине,
то появляется плашка с ключом,
если сдвинуть вместе плашки, то ключ опять спрячется.
Чтобы взять ключ нужно тапнуть по нему,
тогда измениться его внешний вид и после тапа по ключу нельзя будет больше сдвинуть плашки,
в которых прячется замочная скважина, после этого нужно 
дотянуть ключ до замочной скважины.

#### Проблемы:

Дверь 3<br>
Действие: Опустить рычаг, зажать шестеренку, опустить рычаг.<br>
Ожидаемое поведение: Шестеренки скроются и рычаг поднимется вверх.<br>
Проблема: Этого иногда не происходит, не разобралась почему.<br>

Дверь 3<br>
Действие: При опущеном рычаге двигать шестеренку, потом отпустить ее.<br>
Ожидаемое поведение: Шестеренка опуститься в исходное положение.<br>
Проблема: Шестеренка иногда остается на месте в которое ее переместили тачем + как то туго двигается, не разобралась почему.

Дверь 4<br>
Действие: Плашки скрывающие замочную скважину, нужно открыть двумя пальцами.<br>
Ожидаемое поведение: Плашки раскрываются только при одновременном зажатии или муве.<br>
Проблема: Можно тапнуть по одной, а затем потянуть другую.