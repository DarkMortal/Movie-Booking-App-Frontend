export function isNull(x){
    if(x === '') return true;
    if(x === null) return true;
    if(x === undefined) return true;
    if(x.length === 0) return true;
    return false;
}

export const getDefaultValue = (nullValue, defaultValue) => isNull(nullValue) ? defaultValue : nullValue;