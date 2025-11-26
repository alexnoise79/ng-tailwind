/**
 * Abstract class representing a universal storage interface.
 * It implements the Storage interface and provides a basic structure for storage operations.
 */
abstract class UniversalStorage implements Storage {
  /**
   * The number of items in the storage.
   */
  readonly length!: number;

  /**
   * Clears all items from the storage.
   */
  clear() {}

  /**
   * Retrieves an item from the storage.
   * @param _key - The key of the item to retrieve.
   * @returns The value of the item, or null if the item does not exist.
   */
  getItem(_key: string): string | null {
    return null;
  }

  /**
   * Retrieves the key of an item at a given index in the storage.
   * @param _index - The index of the item to retrieve the key for.
   * @returns The key of the item, or null if the index is out of range.
   */
  key(_index: number): string | null {
    return null;
  }

  /**
   * Removes an item from the storage.
   * @param _key - The key of the item to remove.
   */
  removeItem(_key: string) {}

  /**
   * Sets the value of an item in the storage.
   * @param _key - The key of the item to set.
   * @param _value - The value to set the item to.
   */
  setItem(_key: string, _value: string) {}
}

/**
 * Abstract class representing session storage.
 * It extends the UniversalStorage class and provides a structure for session storage operations.
 */
export abstract class SessionStorage extends UniversalStorage {
  /**
   * This property allows for dynamic key-value pairs to be added to the object.
   */
  [name: string]: unknown;
}

/**
 * Abstract class representing local storage.
 * It extends the UniversalStorage class and provides a structure for local storage operations.
 */
export abstract class LocalStorage extends UniversalStorage {
  /**
   * This property allows for dynamic key-value pairs to be added to the object.
   */
  [name: string]: unknown;
}

/**
 * Function to get the local storage object.
 * It returns the window.localStorage object if available, otherwise it returns a mock storage object.
 * @returns The local storage object.
 */
export function getLocalStorage(): Storage {
  return typeof window !== 'undefined' ? window.localStorage : mockStorage;
}

/**
 * Function to get the session storage object.
 * It returns the window.sessionStorage object if available, otherwise it returns a mock storage object.
 * @returns The session storage object.
 */
export function getSessionStorage(): Storage {
  return typeof window !== 'undefined' ? window.sessionStorage : mockStorage;
}

/**
 * Mock storage object for use when window.localStorage or window.sessionStorage is not available.
 */
const mockStorage: Storage = {
  getItem(): string | null {
    return null;
  },
  setItem() {
    return null;
  },
  removeItem() {},
  clear() {},
  key(): string | null {
    return null;
  },
  length: 0
};

export const universalProviders = () => {
  return [
    {
      provide: SessionStorage,
      useFactory: getSessionStorage
    },
    {
      provide: LocalStorage,
      useFactory: getLocalStorage
    }
  ];
};
