import React, {useState} from "react";

export const createEnum = (...keys) => Object.freeze(
    Object.fromEntries(keys.map(t => [t, Symbol(t)]))
);

export const skuImageUrl = skuId => `/static/images/${skuId}.jpeg`;

export const dateTimeFormatter = (t) => new Date(parseInt(t)).toDateString();

export const asImage = (urlBuilder, props) => (t) => (
    <img src={urlBuilder(t)} {...props}/>);

export const asSkuImage = (props) => asImage(skuImageUrl, props);

export const combineFns = (...fns) => (arg) => fns.reduce(
    (resultSoFar, nextFn) => nextFn(resultSoFar), arg);

export const unpackEvent = ev => ev.target.value;

export const eventAware = (fn) => combineFns(unpackEvent, fn);

//TODO: Simplify HOFs
export const useBoundStateObject = (initialObj = {}) => {
  const [state, setState] = useState(initialObj);
  const fieldSetter = (key) => (v) => setState({
    ...state, [key]: v,
  });

  const keyBasedStateSetter = (key, ...preFns) => combineFns(
      ...preFns, fieldSetter(key));

  const keyBinder = ({
    listenerType = "onChange",
    injectProp = "value",
    preProcessors = [unpackEvent],
    ...others
  }) => (key, ...additionalProcessors) => ({
    [injectProp]: state[key],
    [listenerType]: keyBasedStateSetter(key,
        ...preProcessors, ...additionalProcessors),
    ...others,
  });

  return {state, keyBasedStateSetter, setState, keyBinder};
}

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
