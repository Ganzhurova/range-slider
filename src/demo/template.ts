const template = `
<form action="#" class="panel__form" autocomplete="off">
    <div class="panel__list panel__list--checkbox">
    <label class="panel__item panel__item--checkbox">
        Вертикальный вид
        <input
        class="panel__input visually-hidden"
        type="checkbox"
        name="isVertical"
        />
        <span></span>
    </label>
    <label class="panel__item panel__item--checkbox">
        Интервал
        <input
        class="panel__input visually-hidden"
        type="checkbox"
        name="isDouble"
        />
        <span></span>
    </label>
    <label class="panel__item panel__item--checkbox">
        Показать метки
        <input
        class="panel__input visually-hidden"
        type="checkbox"
        name="isLabel"
        />
        <span></span>
    </label>
    <label class="panel__item panel__item--checkbox">
        Показать шкалу
        <input
        class="panel__input visually-hidden"
        type="checkbox"
        name="isScale"
        />
        <span></span>
    </label>
    </div>
    <div class="panel__list panel__list--text">
    <label class="panel__item panel__item--text">
        <span>Min</span>
        <input class="panel__input" value="" type="text" name="min" />
    </label>
    <label class="panel__item panel__item--text">
        <span>Max</span>
        <input class="panel__input" value="" type="text" name="max" />
    </label>
    <label class="panel__item panel__item--text">
        <span>От</span>
        <input class="panel__input" value="" type="text" name="from" />
    </label>
    <label class="panel__item panel__item--text">
        <span>До</span>
        <input class="panel__input" value="" type="text" name="to" />
    </label>
    <label class="panel__item panel__item--text">
        <span>Шаг</span>
        <input class="panel__input" value="" type="text" name="step" />
    </label>
    <label class="panel__item panel__item--text">
        <span>
        Разделить<br />
        шкалу на
        </span>
        <input class="panel__input" value="" type="text" name="scaleParts" />
    </label>
    </div>
</form>
`;

export default template;
