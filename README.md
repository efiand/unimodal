# pineglade-modal [![npm version](https://img.shields.io/npm/v/pineglade-pp.svg)](https://www.npmjs.com/package/pineglade-pp)

Модальное окно с произвольной разметкой и стилизацией.


## Установка

`npm i -DE pineglade-modal`


## Использование


### Разметка

Элементы разметки помечаются дата-атрибутами с одинаковым значением:

* `data-modal` - на узел модального окна.
* `data-modal-open` - на все узлы, открывающие это окно.
* `data-modal-close` - на все узлы, закрывающие это окно.


### Стили

Для выравнивания содержимого по вьюпорту рекомендуются следующие стили: [modal.css](https://efiand.github.io/pineglade-modal/modal.css).

Если используется postcss-import и БЭМ-блок `modal`, можно импортировать часть переиспользуемых стилей модального окна:

```css
@import url("../node_modules/pineglade-modal/modal.css");
```


### Использование готового скрипта

В примере показаны значения по умолчанию для `window.MODAL_SELECTOR` и window.MODAL_PREFIX`.

```html
<script>
  window.MODAL_SELECTOR = '.modal';
  window.MODAL_PREFIX = 'modal--';
</script>
<script src="https://efiand.github.io/pineglade-modal/pineglade-modal.min.js"></script>
```

### Кастомное подключение модуля в систему сборки

```js
import Modal fron 'pineglade-modal';

for (const modalElement of document.querySelectorAll('.modal')) {
  new Modal(modalElement, 'modal-');
}
```

Второй параметр конструктора - префикс имён классов-модификаторов:

* `*ready` - для стилизации модальных особенностей. Полезно для прогрессивного улучшения, когда до загрузки JS модальное окно в потоке.
* `*opened` - для стилизации состояния открытого окна.

По умолчанию значение второго параметра - `modal--` (БЭМ).

