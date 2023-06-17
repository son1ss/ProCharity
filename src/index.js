// Подключение стилей
import './styles/layout.css';
import './styles/content.css';
import 'cropperjs/dist/cropper.css'


// Подключение компонентов проекта
import {handleTextareaAutosize} from './components/textarea-autosize';
import {handleTextareaSymbolCounter} from './components/textarea-symbol-counter';
import {setFilesRemover} from './components/uploader-file-remover';
import FieldTextCleaner from './components/FieldTextCleaner';
import MobileMenu from "./components/MobileMenu";

import CustomSelect from "./components/CustomSelect";
import CustomMultiselect from "./components/CustomMultiselect";
import Popup from './components/Popup';
import TablePagination from './components/TablePagination';
import TableSort from './components/TableSort';


// Подключение сторонних библиотек
import 'cropperjs';
import Cropper from 'cropperjs';
import PwdViewer from "./components/PwdViewer";
import Avatar from "./components/Avatar";

const avatarContainer = document.querySelector('.avatar__container');
const image = document.querySelector('.popup__image');
const inputs = document.querySelectorAll('.input, .textarea');
const pwdInputs = document.querySelectorAll('.input_type_pwd');
const personalDataForm = document.forms.personalData;

if (personalDataForm) {
  const volunteerSwitcher = personalDataForm.elements.volunteerType;
  const volunteerPostInput = personalDataForm.elements.post;

  // Обработка выбора типа волонтера
  volunteerSwitcher.forEach((input) => {
    // Если происходит изменение значения переключателя типа волонтера
    input.addEventListener('input', (evt) => {
      // и выбран тип "я представляю компанию"
      if (evt.target.value === 'company') {
        // нснимаем блок с полей "выберите компанию" и "должность"
        companyNameCustomField.resetDisabled();
        volunteerPostInput.disabled = false;
      } else {
        // если выбран вариант "я физическое лицо" или ничего не выбрано
        // блокируем эти поля
        companyNameCustomField.setDisabled();
        volunteerPostInput.disabled = true;
      }
    })
  })
}

const popup = new Popup('.popup');
popup.setEventListeners();

window.addEventListener('DOMContentLoaded', function() {
  const table = document.querySelector('.table');
  if (table) {
    const loadMore = document.querySelector('.btn_load_more');
    const pagination = new TablePagination(table);
    pagination.genTables();
    pagination.loadMore(loadMore, table);
    const sorting = new TableSort({
      handleOpenPagePagination: (table, pageNum) => {
        pagination.openPage(table, pageNum);
        },
      getMobileSortingType: (optionValue) => {
        switch (optionValue) {
          case 'по правам администратора':
            return 1;
          case 'по дате регистрации':
            return 2;
          case 'по фамилии и имени':
          default:
            return 0;
          }
        }
      },
      table
    );

    // Первоначальная сортировка по индексу колонки
    sorting.sortByIndex(0);
    // Включение сортировки
    sorting.enableSorting();
  }
});

// Обеспечение работы модальных окон
if (avatarContainer) {
  avatarContainer.addEventListener('mousedown', () => {
    // Открываем popup только в том случае, если в контейнере лежит элемент изображения
    if (avatarContainer.querySelector('.avatar__img')) {
      popup.open();
    }
  });
}


// Инициализация библиотеки CropperJS (обрезка изображений)
if (image) {
  const cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 2,
    restore: false,
  });


  const avatar = new Avatar({
    imgChangeHandler: (url) => {
      // Открытие модального окна для редактирования аватара
      popup.open();

      // Замена url в случае повторной загрузки другого аватара
      cropper.replace(url)
    },
    cropHandler: () => {
      // Обработка события изменения границ выбранной области или масштаба изображения
      avatar.handleCrop(
        // Получение URL-объекта обрезанного изображения
        cropper.getCroppedCanvas().toDataURL('image/jpeg')
      );
    },
    confirmHandler: () => {
      popup.close();
    }
  });
  avatar.init();
}


// Вызов функции, реализующей автоматическое изменение высоты textarea
handleTextareaAutosize();


// Вызов функции, реализующей подсчет количества введенных в textarea символов
handleTextareaSymbolCounter();


// Вызов функции, отвечающей за удаление файлов из списка в разделе "Портфолио"
setFilesRemover();


// Инициализация кастомного выпадающего списка для поля
// "Предпочтительный способ связи"
new CustomSelect('#connection').generate();


// Инициализация кастомного выпадающего списка для поля
// "Название компании"
const companyNameCustomField = new CustomSelect('#companyName');
companyNameCustomField.generate();


const CustomSelectOfSort = new CustomSelect('#makeSort', {
  firstOptionIsTitle: false,
  isSort: true,
});
CustomSelectOfSort.generate();


// Инициализация кастомного дыухуровнего выпадающего списка для поля
// "Выбор компетенций"
new CustomMultiselect('#competencies').generate();


// Инициализация выпадающего списка для поля выбора деятельности НКО
new CustomMultiselect('#npo-activity',{
  fieldClass: ['custom-select__field', 'custom-select__field_style_multiselect','custom-select_style_simple'],
  selectBtnClass: ['btn', 'btn_style_primary', 'custom-select__btn', 'custom-select__btn_type_select'],
  resetBtnClass: ['btn', 'btn_style_secondary', 'custom-select__btn', 'custom-select__btn_type_reset'],
  optionsListClass: ['custom-select__list', 'custom-select__list_type_multiselect-full'],
  firstOptionIsTitle: true,
  useSelectCounter: true,
  isSplash: false
}).generate();


// Подключение класса сброса значений полей формы
if (inputs && inputs.length > 0) {
  inputs.forEach((input) => {
    new FieldTextCleaner(input).setEventListeners();
  })
}


// Подключение класса для показа/скрытия пароля
if (pwdInputs && pwdInputs.length > 0) {
  pwdInputs.forEach((input) => {
    new PwdViewer(input).setEventListeners();
  })
}


// Управление показом / скрытием меню в мобильной версии
new MobileMenu({
  menuBtnClass: 'menu-icon',
  menuBtnActiveClass: 'menu-icon_active',
  menuContainerClass: 'header__nav',
  menuContainerOpenedClass: 'header__nav_opened'
}).setEventListeners();



// ================ LK - ACCESS.HTML 23 cogort ==============//
const popupSelector = {
  popupNewWorker: '#popupNewWorker',
  popupDataWorker: '#popupDataWorker',
  popupResetPassword: '#popupReset',
  popupDelDataUser: '#popupDelete',
}
const btnSelector = {
  btnAddWorker: '#btnAddWorker',
  btnDataWorker: '.table__btn-edit',
  btnContextMenu: '.table__btn-redact',
  btnReset: '.btnReset',
  btnDelete: '.btnDelete',
}

const menuSelector ={
  contextMenu: '.table__menu-body',
  opened: 'table__menu-body_opened',
  menuContainer: '.table__menu-container',
  menuList: 'table__menu-body',
}

//Инстанс попапа добавления нового работника:
const popupNewWorker = new Popup(popupSelector.popupNewWorker)

popupNewWorker.setEventListeners()

const btnAddWorker = document.querySelector(btnSelector.btnAddWorker)

if (btnAddWorker) {
  btnAddWorker.addEventListener('click', () => {
    popupNewWorker.open()
  })
}

//Инстанс попапа добавления данных сотрудника:
const popupDataWorker = new Popup(popupSelector.popupDataWorker)

popupDataWorker.setEventListeners()

const btnDataWorker = document.querySelectorAll(btnSelector.btnDataWorker)

if (btnDataWorker) {
  btnDataWorker.forEach(item => {
    item.addEventListener('click', () => popupDataWorker.open())
  });
}


//Логика открытия контекстного меню
const btnContextMenu = document.querySelectorAll(btnSelector.btnContextMenu)
const contextMenu = document.querySelectorAll(menuSelector.contextMenu)
const btnReset = document.querySelectorAll(btnSelector.btnReset)
const btnDelete = document.querySelectorAll(btnSelector.btnDelete)

if(btnContextMenu) {
  btnContextMenu.forEach(item => {
    item.addEventListener('click', () => {
      item.closest(menuSelector.menuContainer)
        .querySelector(menuSelector.contextMenu)
        .classList.add(menuSelector.opened)
    })
  });
}

if(contextMenu) {
  contextMenu.forEach(item => {
    item.addEventListener('click', e => {
      if (!e.target.classList.contains(menuSelector.menuList)) {
        item.classList.remove(menuSelector.opened)
      }  
    })
  })
}

//Инстанс попапа сброса пароля сотрудника
const popupReset = new Popup(popupSelector.popupResetPassword)
popupReset.setEventListeners()

if(btnReset) {
  btnReset.forEach(item => {
    item.addEventListener('click', () => popupReset.open())
  })
}

//Инстанс попапа удаления сотрудника
const popupDelete = new Popup(popupSelector.popupDelDataUser)
popupDelete.setEventListeners()

if(btnDelete) {
  btnDelete.forEach(item => {
    item.addEventListener('click', () => popupDelete.open())
  })
}

// -----
const changeDataBtn = document.querySelector('#changeData');
const resetPasswordBtn = document.querySelector('#resetPassword');
const deleteUserBtn = document.querySelector('#deleteUser');

if(changeDataBtn) {
  changeDataBtn.addEventListener('click', () => popupDataWorker.open());
}

if(resetPasswordBtn) {
  resetPasswordBtn.addEventListener('click', () => popupReset.open());
}

if(deleteUserBtn) {
  deleteUserBtn.addEventListener('click', () => popupDelete.open());
}

// -----
const popupAlertPassword = new Popup('#popupAlertPassword');
popupAlertPassword.setEventListeners();

const popupAlertError = new Popup('#popupAlertError');
popupAlertError.setEventListeners();

const popupAlertData = new Popup('#popupAlertData');
popupAlertData.setEventListeners();