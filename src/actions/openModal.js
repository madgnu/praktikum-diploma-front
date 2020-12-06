import { MODAL_OPEN } from "./types";

const login = {
  title: 'Вход',
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
  }
};

const templates = { login };

const openModal = (modalType) => {
  return {
    type: MODAL_OPEN,
    payload: templates[modalType],
  }
}

export default openModal;
