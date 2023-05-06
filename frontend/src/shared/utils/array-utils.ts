/** Remove duplicate objects from array  */
export function getUniqueValues(array: any[]): any[] {
    return array.filter((value, index, array) => array.indexOf(value) === index);
}
