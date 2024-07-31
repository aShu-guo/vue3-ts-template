import { Ref } from 'vue';

export const getEl = (el: string | HTMLElement | Ref<HTMLElement | undefined>) => {
  if (typeof el === 'string') {
    return document.querySelector(el);
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    return el.value;
  }
};
