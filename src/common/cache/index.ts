import { isNull, isUndefined } from 'lodash-es';

export interface CacheEntity<T> {
  value: T;
  start: number;
  expire: number;
}

type Key = string;

/**
 * 设置普通KV
 * @param key
 * @param value
 */
export function setValue<T = any>(key: Key, value: CacheEntity<T>) {
  if (isNull(value) || isUndefined(value)) {
    localStorage.setItem(key, '');
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 获取普通KV
 * @param key
 * @returns {any}
 */
export function getValue<T>(key: Key): CacheEntity<T> | undefined {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as CacheEntity<T>;
  }
}

/**
 * 设置具有有效期的KV，默认有效期为1周
 * @param key
 * @param value
 * @param expire
 */
export function setAliveValue<T>(key: Key, value: CacheEntity<T>, expire = 7 * 24 * 60 * 60 * 1000) {
  setValue(key, {
    value,
    start: Date.now().valueOf(),
    expire,
  });
}

/**
 * token 是否有效
 * @returns {boolean}
 */
type ExpireResult<T> = { isValid: boolean; value: CacheEntity<T> | undefined };

export function isExpire<T>(key: string): ExpireResult<T>;
export function isExpire(value: CacheEntity<any>): boolean;
export function isExpire<T>(kv: string | CacheEntity<T>): ExpireResult<T> | boolean {
  if (typeof kv === 'string') {
    const value = getValue<T>(kv);
    let isValid = !!value;
    if (value && Date.now().valueOf() - value.start < value.expire) {
      isValid = false;
    }
    return {
      isValid,
      value,
    };
  } else {
    return Date.now().valueOf() - kv.start < kv.expire;
  }
}

/**
 * 清除key
 */
export function removeValue(key: Key) {
  localStorage.removeItem(key);
}

/**
 * 清除所有key
 */
export function clearValue() {
  localStorage.clear();
}
