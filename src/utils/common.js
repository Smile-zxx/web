export function attributeNameModify(obj, preAttribute, newAttribute) {
    obj[newAttribute] = obj[preAttribute];
    delete obj[preAttribute];
    return obj;
}

export function arrSubtraction(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.filter(i => !b.includes(i));
    }
}

