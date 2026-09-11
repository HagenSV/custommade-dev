
/**
 * Removes the first occurrence of a value from a list, modifying the original list
 * @param list the list to modify
 * @param item the value to remove
 */
export function removeFirst<T>(list: T[], item: T) {
    const idx = list.findIndex( i => i === item)
    removeIndex(list,idx);
}

/**
 * Removes the last occurrence of a value from a list, modifying the original list
 * @param list the list to modify
 * @param item the value to remove
 */
export function removeLast<T>(list: T[], item: T) {
    const idx = list.findLastIndex( i => i === item)
    removeIndex(list,idx);
}

/**
 * Removes all values from the list that match a given predicate
 * @param list the list of values
 * @param predicate the predicate function
 * @returns new list without items matching the provided predicate
 */
export function removeAll<T>(list: T[], predicate: (item: T) => boolean): T[] {
    return list.filter(i => !predicate(i));
}

/**
 * Removes the value at the provided index from a list, modifiying the original list
 * @param list the list to edit 
 * @param idx the index of the item to remove
 * @returns the value removed from the list
 */
export function removeIndex<T>(list: T[], idx: number): T {
    if (idx < 0){
        throw new Error("Index cannot be less than 0")
    }
    if (idx >= list.length){
        throw new Error("Index cannot exceed list size")
    }

    return list.splice(idx,1)[0]
}