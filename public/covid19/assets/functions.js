// funcion para seleccion de elementos del DOM por su selector
export const getElementBySelector = (element) => document.querySelector(element)
// funcion para objetener el valor de los elementos del DOM por su selector
export const getValueByElement = (element) => getElementBySelector(element).value