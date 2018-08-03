export default class ImmutabilityUtil {
    /**
     * Returns new Set with the given element added
     * @param {*} element
     * @param {Set} set
     */
    static addElementToSet(set, element) {
      const setClone = new Set([...set]);
      setClone.add(element);
      return setClone;
    }
  
    /**
     * Returns a new Set with the given element removed
     * @param {*} element
     * @param {Set} set
     */
    static removeElementFromSet(set, element) {
      const setClone = new Set([...set]);
      setClone.delete(element);
      return setClone;
    }
  
    /**
     * Returns a new Map with the given key-value pair added (or overwritten if the key already exists)
     * @param {Map} map
     * @param {*} key
     * @param {*} value
     */
    static setValueInMap(map, key, value) {
      const mapClone = new Map([...Array.from(map)]);
      mapClone.set(key, value);
  
      return mapClone;
    }
  
    /**
     * Returns a new Map with the value at the given key processed through the updater function
     * e.g. to increment the value at a given key, you could do something like this:
     * updateValueInMap('numApples', fruitCountsMap, (currentValue) => { return currentValue !== undefined ? currentValue + 1 : 1 })
     * @param {Map} map
     * @param {*} key
     * @param {(currentValue) => newValue} updater
     */
    static updateValueInMap(map, key, updater) {
      const mapClone = new Map([...Array.from(map)]);
      const updatedValue = updater(mapClone.get(key));
      mapClone.set(key, updatedValue);
  
      return mapClone;
    }
  
    /**
     * Returns a new Map with the given key removed
     * @param {Map} map
     * @param {*} key
     */
    static removeKeyFromMap(map, key) {
      const mapClone = new Map([...Array.from(map)]);
      mapClone.delete(key);
  
      return mapClone;
    }
  
    /**
     * Returns a new Map containing all of the keys from both maps with the values of map2 overwriting values in map1 in the case of conflicts
     * @param {Map} map1
     * @param {Map} map2
     */
    static mergeMaps(map1, map2) {
      return new Map([...Array.from(map1), ...Array.from(map2)]);
    }
  }
