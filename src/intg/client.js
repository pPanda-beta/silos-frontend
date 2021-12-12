export const jsonFetcher = (resource, init) => fetch(
    resource, init
).then(res => res.json());

export const postJson = (resource, body, extraInitProps = {}) => jsonFetcher(
    resource, {
      ...extraInitProps,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }
);

export const swrConfigs = {
    refreshInterval: 500,
    dedupingInterval: 500,
    fetcher: jsonFetcher
};
