import './styles/layout.css';
import './styles/content.css';
import {handleTextarea} from './components/textarea-autosize';
import CustomSelect from "./components/CustomSelect";
import CustomMultiselect from "./components/CustomMultiselect";
import Popup from './components/Popup';


// Автоматическое увеличение высоты поля
// от количества введенного текста
handleTextarea();


new CustomSelect('#connection').generate();
new CustomSelect('#companyName').generate();
new CustomMultiselect('#competencies').generate();

const popup = new Popup('.popup-edit');
popup.setEventListeners();

const avatarImg = document.querySelector('.avatar:has(.avatar__img)');

if (avatarImg) {
  avatarImg.addEventListener('mousedown', () => {
    console.log(321)
    popup.open();
  });
}

