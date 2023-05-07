function simpleSort(array: Array<any>, isASC: boolean): Array<any> {
    return [...array].sort((a: any, b: any) => {
        if (getComparableValue(a) > getComparableValue(b)) {
            return isASC ? 1 : -1;
        }
        if (getComparableValue(a) < getComparableValue(b)) {
            return isASC ? -1 : 1;
        }
        return 0;
    });
}

function sortByProperty(array: Array<any>, isASC: boolean, propertyName: string) {
    return [...array].sort((a: any, b: any) => {
        if (getComparableValue(a[propertyName]) > getComparableValue(b[propertyName])) {
            return isASC ? 1 : -1;
        }
        if (getComparableValue(a[propertyName]) < getComparableValue(b[propertyName])) {
            return isASC ? -1 : 1;
        }
        return 0;
    });
}

function getComparableValue(value: string | number | Date): string | number {
    if (typeof value === "string" || value instanceof String) {
        return value.toLowerCase();
    } else if (value instanceof Date) {
        return value.getTime();
    } else {
        return value;
    }
}

/** Sort the array in ascending order  */
export function orderAsc(array: Array<any>): Array<any> {
    return simpleSort(array, true);
}

/** Sort the array in descending order */
export function orderDesc(array: Array<any>): Array<any> {
    return simpleSort(array, false);
}

/** Sort the array in ascending order by the value of the object property passed in input  */
export function orderAscByProperty(array: Array<any>, propertyName: string): Array<any> {
    return sortByProperty(array, true, propertyName);
}

/** Sort the array in descending order by the value of the object property passed in input  */
export function orderDescByProperty(array: Array<any>, propertyName: string): Array<any> {
    return sortByProperty(array, false, propertyName);
}

export function orderAscDates(dates: Date[]): Array<Date> {
    return orderAsc(dates.map((d) => d.getTime())).map((t) => new Date(t));
}

export function orderDescDates(dates: Date[]): Array<Date> {
    return orderDesc(dates.map((d) => d.getTime())).map((t) => new Date(t));
}

// TODO: temp (it works only with array having primitive items)
export function arraysEqual(a: string[] | number[], b: string[] | number[]): boolean {
    if (a === b) return true;
    if (a.length !== b.length) return false;

    const aSorted = orderAsc(a);
    const bSorted = orderAsc(b);

    for (let i = 0; i < aSorted.length; ++i) {
        if (aSorted[i] !== bSorted[i]) return false;
    }
    return true;
}

/** Remove duplicate objects from array  */
export function removeDuplicateObjects(a: any[]): any[] {
    const uniqueObjects: any[] = [];
    const uniqueValues: string[] = [];

    a.filter((obj) => {
        const jsonObj = JSON.stringify(obj);
        if (!uniqueValues.includes(jsonObj)) {
            uniqueValues.push(jsonObj);
            uniqueObjects.push(obj);
        }
    });

    return uniqueObjects;
}
