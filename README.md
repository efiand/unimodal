# pineglade-modal [![npm version](https://img.shields.io/npm/v/pineglade-modal.svg)](https://www.npmjs.com/package/pineglade-modal)

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

Если используются postcss-import и БЭМ-блок `modal`, можно импортировать часть переиспользуемых стилей модального окна:

```css
@import url("../node_modules/pineglade-modal/modal.css");
```


### Использование готового скрипта

```html
<script>
  window.MODAL_PREFIX = 'modal--'; // modal-- - значение по уполчанию
</script>
<script src="https://efiand.github.io/pineglade-modal/pineglade-modal.min.js"></script>
```

### Кастомное подключение модуля в систему сборки

```js
import Modal from 'pineglade-modal';

for (const modalElement of document.querySelectorAll('[data-modal]')) {
  new Modal(modalElement, 'modal--'); // modal-- - значение по уполчанию
}
```

или:


```js
import { initModals } from 'pineglade-modal';

initModals('modal--'); // modal-- - значение по уполчанию

```

Второй параметр конструктора - префикс имён классов-модификаторов:

* `*ready` - для стилизации модальных особенностей. Полезно для прогрессивного улучшения, когда до загрузки JS модальное окно в потоке.
* `*opened` - для стилизации состояния открытого окна.
