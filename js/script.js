'use strict';
(function () {
  var callFormTemplate = document.querySelector('#callback-popup')
      .content
      .querySelector('.callback-popup__container');

  // модальное окно "Заказать звонок"
  var callRequestButton = document.querySelector('#call-request-button');
  var windowExistFlag = false;
  callRequestButton.addEventListener('click', function () {
    var nonModalNodes;
    // открытие окна
    if (!windowExistFlag) {
      var callRequestWindow = callFormTemplate.cloneNode(true);
      document.body.classList.add('body-no-scroll');
      document.body.appendChild(callRequestWindow);
      callRequestWindow.querySelector('#popup-name').focus();
      // ввод телефона в соответствии с маской
      applyDataMask(callRequestWindow.querySelector('[data-mask]'));
      var closeButton = document.querySelector('.callback-popup__close-button');
      windowExistFlag = true;
      // закрытие по клику вне модального окна
      window.addEventListener('click', function (evt) {
        var isPathContainForm = function (x) {
          return (typeof x.className === 'string') ? x.className.includes('callback-popup__container') || x.id.includes('call-request-button') : false;
        };
        if (!evt.path.some(isPathContainForm)) {
          removeModal(evt);
        }
      });
      // недоступность элементов вне модального окна
      var modalNodes = Array.from(document.querySelectorAll('.callback-popup__container *'));
      nonModalNodes = document.querySelectorAll('body *:not([tabindex="-1"]');
      for (var i = 0; i < nonModalNodes.length; i++) {
        var node = nonModalNodes[i];
        if (!modalNodes.includes(node) && node !== callRequestWindow) {
          node._prevTabindex = node.getAttribute('tabindex');
          node.setAttribute('tabindex', -1);
          node.style.pointerEvents = 'none';
          node.style.outline = 'none';
        }
      }
    }
    // закрытие окна
    var isEscEvent = function (evt) {
      return (evt.key === 'Escape' || evt.key === 'Esc');
    };
    var onEscRemoveModal = function (evt) {
      if (isEscEvent(evt)) {
        removeModal(evt);
      }
    };
    var removeModal = function (evt) {
      evt.preventDefault();
      callRequestWindow.remove();
      document.body.classList.remove('body-no-scroll');
      // восстанавливаем tabindex
      for (i = 0; i < nonModalNodes.length; i++) {
        node = nonModalNodes[i];
        if (node._prevTabindex) {
          node.setAttribute('tabindex', node._prevTabindex);
          node._prevTabindex = null;
        } else {
          node.removeAttribute('tabindex');
        }
        node.style.pointerEvents = 'auto';
        node.style.outline = null;
      }

      document.removeEventListener('keydown', onEscRemoveModal);
      closeButton.removeEventListener('click', removeModal);
      windowExistFlag = false;
    };
    document.addEventListener('keydown', onEscRemoveModal);
    closeButton.addEventListener('click', removeModal);
  });

  // Реализация аккордеона
  var maBlock = document.querySelector('.page-footer__menu-address-wrapper');
  maBlock.classList.remove('no-js');
  var menuBlock = document.querySelector('.page-footer__menu-block');
  menuBlock.classList.add('page-footer__menu-block--closed');
  var addressBlock = document.querySelector('.page-footer__address-block');
  addressBlock.classList.add('page-footer__address-block--closed');

  var footerMenuHeader = document.querySelector('.page-footer__header--menu');
  footerMenuHeader.addEventListener('click', function () {
    if (menuBlock.classList.contains('page-footer__menu-block--closed')) {
      menuBlock.classList.remove('page-footer__menu-block--closed');
      menuBlock.classList.add('page-footer__menu-block--opened');
      if (addressBlock.classList.contains('page-footer__address-block--opened')) {
        addressBlock.classList.add('page-footer__address-block--closed');
        addressBlock.classList.remove('page-footer__address-block--opened');
      }
    } else {
      menuBlock.classList.add('page-footer__menu-block--closed');
      menuBlock.classList.remove('page-footer__menu-block--opened');
    }
  });

  var footerAddressHeader = document.querySelector('.page-footer__header--address');
  footerAddressHeader.addEventListener('click', function () {
    if (addressBlock.classList.contains('page-footer__address-block--closed')) {
      addressBlock.classList.remove('page-footer__address-block--closed');
      addressBlock.classList.add('page-footer__address-block--opened');
      if (menuBlock.classList.contains('page-footer__menu-block--opened')) {
        menuBlock.classList.add('page-footer__menu-block--closed');
        menuBlock.classList.remove('page-footer__menu-block--opened');
      }
    } else {
      addressBlock.classList.add('page-footer__address-block--closed');
      addressBlock.classList.remove('page-footer__address-block--opened');
    }
  });

  // Ввод номера телефона в соотв.с маской
  Array.prototype.forEach.call(document.querySelectorAll('[data-mask]'), applyDataMask);
  function applyDataMask(field) {
    var mask = field.dataset.mask.split('');

    // Принимает строку значения, возвращает массив из цифр, содержащихся в строке
    function stripMask(maskedData) {
      function isDigit(char) {
        return /\d/.test(char);
      }
      return maskedData.split('').filter(isDigit);
    }

    // Replace `_` characters with characters from `data`
    function applyMask(data) {
      var flag = (data.length < 3);
      return mask.map(function (char) {
        if (flag) {
          if (char !== '_' && char !== ')') {
            return char;
          }
        } else {
          if (char !== '_') {
            return char;
          }
        }
        if (data.length === 0) {
          return '';
        }
        return data.shift();
      }).join('');
    }

    function reapplyMask(data) {
      return applyMask(stripMask(data));
    }

    function changed() {
      var oldStart = field.selectionStart;
      var oldEnd = field.selectionEnd;

      field.value = reapplyMask(field.value.replace(/7/, ''));

      field.selectionStart = oldStart;
      field.selectionEnd = oldEnd;
    }

    field.addEventListener('click', changed);
    field.addEventListener('keyup', changed);
  }

  // скролл при нажатии "Получить бесплатную консультацию"
  var headerButton = document.querySelector('.page-header__promo-button');
  headerButton.addEventListener('click', function () {
    window.location.href = '#form';
  });
})();
