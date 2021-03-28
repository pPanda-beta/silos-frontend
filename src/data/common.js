export const createEnum = (...keys) => Object.freeze(
    Object.fromEntries(keys.map(t => [t, Symbol(t)]))
);

export const skuImageUrl = skuId => `/static/images/${skuId}.jpeg`;
