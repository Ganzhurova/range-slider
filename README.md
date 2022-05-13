# Range-slider

- простой и легкий в использовании слайдер;
- можно привести к необходимому внешнему виду с помощью CSS;
- имеет поддержку событий и общедоступные методы;
- поддерживает сенсорные устройства;

**Demo range-slider**: https://ganzhurova.github.io/range-slider/

## Установка проекта

Инициализация:

```
npm install
```

### Запуск сборок

- в режиме development:
  ```
  npm run dev
  ```
- в режиме production:
  ```
  npm run build
  ```

### Запуск тестов

```
npm run test
```

## Установка range-slider

### Зависимости

- jQuery 3.6.x+

### Установка

- добавьте на страницу библиотеку jQuery;
- подключите следующие файлы: range-slider.js и range-slider.css;

  **Пример**

  ```
    <head>
        <link rel="stylesheet" href="range-slider.css" />
    </head>
    <body>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="range-slider.js"></script>
    </body>
  ```

### Использование

Слайдер устанавливается на div элементе

    <div class="slider"></div>

Для инициализации слайдера

- с опциями по умолчанию:

```
  $(".slider").rangeSlider();
```

- с пользовательскими опциями:

```
  $(".slider").rangeSlider({
    isDouble: true,
    isLabel: false,
    from: 5,
  });
```

### Опции

| Опция      | Тип     | По умолчанию | Описание                                                                                                                                                           |
| ---------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isDouble   | boolean | false        | Установить два ползунка - true, установить один ползунок - false                                                                                                   |
| isVertical | boolean | false        | Установить вертикальный вид - true, горизонтальный - false                                                                                                         |
| isLabel    | boolean | false        | Показать метки над ползунками - true                                                                                                                               |
| isScale    | boolean | false        | Показать шкалу со значениями - true                                                                                                                                |
| min        | number  | 0            | Минимальное значение для ползунка                                                                                                                                  |
| max        | number  | 100          | Максимальное значение для ползунка                                                                                                                                 |
| from       | number  | 25           | Начальная позиция первого ползунка                                                                                                                                 |
| to         | number  | 75           | Начальная позиция второго ползунка                                                                                                                                 |
| step       | number  | 0            | Шаг, с которым движется ползунок                                                                                                                                   |
| scaleParts | number  | 4            | Количество частей на которое делится шкала. Используется для расчета значений шкалы. С опциями по умолчанию будут показаны следующие значения - 0, 25, 50, 75, 100 |

## Публичные методы

Для использования публичных методов, сначала необходимо сохранить экземпляр слайдера в переменную.

```
$(".slider").rangeSlider();

// получаем экземпляр слайдера
const slider = $(".slider").data("rangeSlider");

// вызываем метод
slider.destroy();
```

Всего есть 2 публичных метода:

**update** - позволяет обновить опции слайдера;

```
slider.update({from: 5.5, max: -50, isScale: true});
```

**destroy** - удаляет экземпляр слайдера, возвращая элемент инициализации к исходному состоянию.

```
slider.destroy();
```

## Callbacks

Плагин предоставляет возможность использовать функции обратного вызова: onStart и onChange.

```
$(".slider").rangeSlider({

  onStart(data) {
    // ...
  },

  onChange(data) {
    // ...
  }
});
```

Вызовы получают доступ к обекту data, который содержит все актуальные опции слайдера.

**onStart** срабатывает в момент инициализации слайдера или при его обновлении через метод update.

**onChange** вызывается при каждом движении ползунка.

#### **Пример использования** - привязка значения ползунка к внешнему полю ввода

```
const $slider = $("#slider");

const $input = $("#input");

let instance;

$slider.rangeSlider({
        onStart: function(data) {
            $input.prop("value", data.from);
        },
        onChange: function(data) {
            $input.prop("value", data.from);
        }
    });

instance = $slider.data("rangeSlider");

$input.on("change", function() {
    const value = +$(this).prop("value");

    instance.update({
        from: value,
    });
});

```

## Диаграмма классов UML

```mermaid
classDiagram
  EventEmitter <|-- Model
  EventEmitter <|-- View
  EventEmitter <|-- Component
  EventEmitter <|-- Template

  Model --* Presenter
  Presenter *-- View

  Template --* View
  Calculation --* View
  BarView --* View
  LabelView --* View
  LineView --* View
  RootView --* View
  ScaleView --* View
  ThumbView --* View

  Component <|-- BarView
  Component <|-- LabelView
  Component <|-- LineView
  Component <|-- RootView
  Component <|-- ScaleView
  Component <|-- ThumbView

  class EventEmitter{
    -events: Events
    +constructor()
    +subscribe(eventName: string, callback: FunctionType)
    +unsubscribe(eventName: string, callback: FunctionType)
    +emit(eventName: string, ...args: any[])
  }

  class Presenter{
    -model: Model
    -view: View
    -options: Partial~IOptions~
    +constructor(element: HTMLElement, options?: Partial~IOptions~)
    -init()
    -callCallback(callbackName: CallbackNames)
    +update(options?: Partial~IOptions~)
    +destroy()
  }

  class Model{
    -state: IStateModel
    +updateState(options: Partial~IStateModel~)
    +getState() IStateModel
    -getChangedKeys(options: IStateModel) OptionsKeys[]
    -validate()
    -validateLimits()
    -validatePos()
    -validateStep()
    -validateScaleParts()
  }

  class View{
    -el: HTMLElement
    -template: Template
    -calculation: Calculation
    +options: IStateModel
    +data: IDataView
    +root: RootView
    +line: LineView
    +bar: BarView
    +fromThumb: ThumbView
    +toThumb: ThumbView
    +fromLabel: LabelView
    +toLabel: LabelView
    +commonLabel: LabelView
    +scale: ScaleView
    +constructor(element: HTMLElement, options: IStateModel)
    -updatePosition(position: number, key: PositionKeys)
    -subscribeToThumbEvent(key: PositionKeys)
    -subscribeToScaleEvent()
    -handlerUpdateOnResize()
    -handlerThumbDragStart(e: MouseEvent | TouchEvent)
    -handlerScaleValueClick(e: MouseEvent | TouchEvent)
    -addEventListeners()
    -removeEventListeners()
    -getPositionText(key: PositionKeys)
    -updateThumbPosition(key: PositionKeys)
    -setup()
    +update(keys: OptionsKeys[])
    +destroy()
  }

  class Calculation{
    -view: View
    -data: IDataView
    -options: IStateModel
    +constructor(view: View)
    -convertLinePxToPercent()
    -calcLimitSizeOfLine()
    -calcPercentPerPosition()
    -calcFractionLength()
    +makeBaseCalc()
    +getLimitCoords(key: PositionKeys) ILimitCoords
  }

  class Template{
    -view: View
    -options: IStateModel
    +constructor(view: View)
    -init()
    -setDirection(isVertical: boolean)
    -setType(isDouble: boolean)
    -setLabel(isLabel: boolean)
    -setScale(isScale: boolean)
    -subscribeToEvents()
    +update(keys: OptionsKeys[])
  }

  class Component{
    #data: IDataView
    #options: IStateModel
    #el: HTMLElement
    +isElExists: boolean
    +constructor(html: Html, settings: Settings, el?: HTMLElement)
    +init(html: Html, el?: HTMLElement)
    +addClass(className: string)
    +removeClass(className: string)
    +addChild(child: Component)
    +remove()
    +hidden()
    +show()
    +getEl()
    -getBox()
    +getSize()
    +getCoord()
    +positionToPercent(position: number) number
    +percentToPosition(percent: number) number
    +percentToPx(percent: number) number
    +pxToPercent(px: number) number
    +checkOverlay(componentA: Component, componentB: Component) boolean
  }

  class BarView{
    -correctValue: number
    +setup(thumbSize: number)
    +update(fromPosition: number, toPosition: number)
  }

  class LabelView{
    -thumbSizePercent: number
    -percentPosition: number
    -text: string
    -setPercentPosition(thumbPosition: number)
    -getPercentPosition() number
    -setText(positionText: string)
    -getText() string
    +setup(thumbSize: number)
    +update(thumbPosition: number, positionText: string)
    +switchCommonLabel(commonLabel: LabelView,
    fromLabel: LabelView, toLabel: LabelView)
  }

  class LineView

  class RootView{
    +setDirection(isVertical: boolean)
    +clear()
  }

  class ScaleView{
    -values: Component[]
    -points: Component[]
    -getScaleValues() string[]
    -createComponent(html: Html, text?: string) Component
    -renderComponent(html: Html, percentPosition: number, array: Component[], text?: string)
    -setVisibilityOfValues()
    +renderDivisions()
    +setup()
    +handlerScaleValueClick(event: MouseEvent | TouchEvent)
  }

  class ThumbView{
    -percentPosition: number
    -limitCoords: ILimitCoords
    +constructor(html: Html, settings: Settings)
    -setLimitCoords(limitCoords: ILimitCoords)
    -calcPercentPositionWithStep(percent: number) number
    -getValidPercentCoord(coord: number) number
    +setPercentPosition(percentPosition: number)
    +getPercentPosition() number
    +getPosition() number
    +setup(key: PositionKeys)
    +update()
    +handlerThumbDragStart(event: MouseEvent | TouchEvent, limitCoords: ILimitCoords)
    -handlerThumbDrag(shiftPx: number, event: MouseEvent | TouchEvent)
  }

```
