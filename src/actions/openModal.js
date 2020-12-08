import signin from './signin';
import { signup } from './signup';
import { MODAL_OPEN } from './types';

const templates = { };

const openModal = (modalName) => {
  return {
    type: MODAL_OPEN,
    payload: { ...templates[modalName] },
  }
}

templates.login = {
  title: 'Вход',
  switchActionText: 'Зарегистрироваться',
  switchActionSubText: 'или ',
  switchAction: () => openModal('register'),
  form: {
    fields: [{
      name: 'email',
      label: 'Email',
      errMessage: 'Неправильный формат email',
      definition: {
        type: 'email',
        placeholder: 'Введите почту',
        required: true,
      }
    }, {
      name: 'password',
      label: 'Пароль',
      errMessage: 'Пароль должен содержать от 8 до 15 символов, а также минимум 1 латинскую заглавную букву, 1 цифру и 1 латинскую строчную букву',
      definition: {
        type: 'password',
        placeholder: 'Введите пароль',
        required: true,
        pattern: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$',
        minlength: 8,
        maxlength: 15,
      }
    }],
    submitName: 'Войти',
    submitAction: signin,
  }
};

templates.register = {
  title: 'Регистрация',
  switchActionText: 'Войти',
  switchActionSubText: 'или ',
  switchAction: () => openModal('login'),
  form: {
    fields: [{
      name: 'email',
      label: 'Email',
      errMessage: 'Неправильный формат email',
      definition: {
        type: 'email',
        placeholder: 'Введите почту',
        required: true,
      }
    }, {
      name: 'password',
      label: 'Пароль',
      errMessage: 'Пароль должен содержать от 8 до 15 символов, а также минимум 1 латинскую заглавную букву, 1 цифру и 1 латинскую строчную букву',
      definition: {
        type: 'password',
        placeholder: 'Введите пароль',
        required: true,
        pattern: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$',
        minlength: 8,
        maxlength: 15,
      }
    }, {
      label: 'Имя',
      name: 'name',
      errMessage: 'Имя должно содержать от 2 до 30 символов',
      definition: {
        type: 'text',
        placeholder: 'Введите своё имя',
        required: true,
        minlength: 2,
        maxlength: 30,

      }
    }],
    submitName: 'Зарегистрироваться',
    submitAction: signup,
  }
};

templates.registerSuccess = {
  title: 'Пользователь успешно зарегистрирован!',
  switchActionText: 'Войти',
  switchActionSubText: '',
  form: null,
  switchAction: () => openModal('login'),
}

export default openModal;
