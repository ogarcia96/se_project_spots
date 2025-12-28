export const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageEL = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEL.textContent = errorMessage;
  inputEl.classList.add(config.inputErrorClass);
};

export const hideInputError = (formEl, inputEl, config) => {
  const errorMessageEL = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEL.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

export const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonEL, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEL, config);
  } else {
    buttonEL.disabled = false;
    buttonEL.classList.remove(config.inactiveButtonClass);
  }
};

export const disableButton = (buttonEL, config) => {
  buttonEL.disabled = true;
  buttonEL.classList.add(config.inactiveButtonClass);
};

export const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });

  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, config);
};

export const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
