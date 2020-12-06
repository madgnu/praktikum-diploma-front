import signin from "./signin";
import { signup } from "./signup";
import { MODAL_OPEN } from "./types";

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
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Введите почту',
      required: true,
      errMessage: 'Неправильный формат email',
    }, {
      type: 'password',
      label: 'Пароль',
      name: 'password',
      placeholder: 'Введите пароль',
      required: true,
      errMessage: 'Пароль должен содержать от 8 до 15 символов, а также минимум 1 латинскую заглавную букву, 1 цифру и 1 латинскую строчную букву',
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
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Введите почту',
      required: true,
      errMessage: 'Неправильный формат email',
    }, {
      type: 'password',
      label: 'Пароль',
      name: 'password',
      placeholder: 'Введите пароль',
      required: true,
      errMessage: 'Пароль должен содержать от 8 до 15 символов, а также минимум 1 латинскую заглавную букву, 1 цифру и 1 латинскую строчную букву',
    }, {
      type: 'text',
      label: 'Имя',
      name: 'name',
      placeholder: 'Введите своё имя',
      required: true,
      minlength: 2,
      maxlength: 30,
      errMessage: 'Имя должно содержать от 2 до 30 символов',
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
