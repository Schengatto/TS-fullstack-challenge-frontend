export const getFieldValue = (source: Record<string, any>, fieldPath: string): any => {
    const parts = fieldPath.split(".");
    const target = parts.shift();
    if (!target) return undefined;
    return parts.length > 0 ? getFieldValue(source[target], parts.join(".")) : source[target];
};