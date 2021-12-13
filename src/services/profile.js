import {AbpService} from '../data/providers/abp';
import {db} from '../data/repositories/db';
import {useLiveQuery} from 'dexie-react-hooks';

export default class ProfileService {
  _abpService = new AbpService();

  searchAndGather = async (req) => {
    const profiles = await this._abpService.searchAt(req);
    await db.matrimonyProfiles.bulkPut(profiles);
    return profiles;
  };

  useAllProfiles = () => useLiveQuery(
      () => db.matrimonyProfiles.toArray()
  );
}

// TODO: Use dependency injection
export const profileService = new ProfileService();