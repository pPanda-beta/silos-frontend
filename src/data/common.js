import React, {useState} from "react";
import {Slider} from '@material-ui/core';

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


export const multiSelectFilter = () => ({
  filter: true,
  filterType: 'multiselect',
});

export const range = ({initialRange, renderAppliedFilter, filterSliderLabel}) => {
  return ({
        filter: true,
        filterType: 'custom',

        customFilterListOptions: {
          render: renderAppliedFilter,
        },
        filterOptions: {
          names: [],
          logic(value, range) {
            if (range.length === 0) {
              return false;
            }
            const [minValue, maxValue] = range;
            return !(minValue <= value && value <= maxValue);
          },
          display: (filterList, onChange, index, column) => {
            const filter = filterList[index];
            const selectedRange = filter.length ? filter : initialRange;
            return (
                <div>
                  {filterSliderLabel()}
                  <Slider
                      value={selectedRange}
                      onChange={(_, r) => onChange(r, index, column)}
                      valueLabelDisplay="auto"
                      min={initialRange[0]}
                      max={initialRange[1]}
                  />
                </div>
            );
          },
        },
        print: false,
      }
  );
};

