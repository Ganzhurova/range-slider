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

### **Пример использования** - привязка значения ползунка к внешнему полю ввода

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
