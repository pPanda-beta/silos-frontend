import {AbpService} from '../data/providers/abp';

export default class SearchService {
  _abpService = new AbpService();

  searchAt = (req) => this._abpService.searchAt(req);
}

// TODO: Use dependency injection
export const searchService = new SearchService();