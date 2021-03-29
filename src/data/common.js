import React from "react";

export const createEnum = (...keys) => Object.freeze(
    Object.fromEntries(keys.map(t => [t, Symbol(t)]))
);

export const skuImageUrl = skuId => `/static/images/${skuId}.jpeg`;


export const dateTimeFormatter = (t) => new Date(parseInt(t.value)).toLocaleString();


export const asImage = (urlBuilder, props) => (t) => (<img src={urlBuilder(t?.row)} {...props}/>);
export const asSkuImage = (props) => asImage(t => skuImageUrl(t?.sku_id), props);

export const toDataset = (items, columnMappings = null) => ({
        columns: (columnMappings ?? Object.keys(items[0]).map(k => [k, k]))
            .map(([k, v]) => ({
                field: k,
                headerName: (v?.headerName || v?.toString() || k),
                ...((typeof v === 'string') ? {} : v)
            })),
        rows: items.map((t, i) => Object.fromEntries(
            Object.entries({id: i, ...t})
                .map(([k, v]) => [k, ((typeof v === 'object') ? JSON.stringify(v) : v)])
        )),
    })
;
