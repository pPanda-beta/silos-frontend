import {jsonFetcher, postJson} from '../../intg/client';

class ABPApi {
  static getMasterData = async () => jsonFetcher(
      `/api-images/delegate/MasterDataServlet1?file=master2_en.json&t=1638320795058`);

  static preLoggedInSearch = async (
      genderId, reqBody, refresh = 1) => postJson(
      `/api-sofreadonly/mats-notification/search/m/preloggedin/${genderId}.json?refresh=${refresh}&lang=en`,
      reqBody
  )
}

// Await 'n' no of times, it is not harmful
const masterDataPromise = ABPApi.getMasterData();

class Enricher {
  _masterData;

  constructor(masterData) {
    this._masterData = masterData;
  }

  _mappers = {
    locationId: v => this._masterData["LOCATIONS_ALL"][v],
    stateId: v => this._masterData["LOCATIONS_ALL"][v],
    religionId: v => this._masterData["RELIGION_J"][v],
    casteId: v => this._masterData["CASTE"]["castList"][v],
    highestEducationId: v => this._masterData["EDUCATION_J"][v],
    designationId: v => this._masterData["DESIGNATION_J"][v],
    occupationId: v => this._masterData["OCCUPATION_J"][v],
    cityLocId: v => this._masterData["LOCATIONS_ALL"][v],
    countryId: v => this._masterData["COUNTRY_J"][v],
    pidvHoverId: v => v,
    badgeTextId: v => v,
    btHoverId: v => v,
    dob: v => new Date(v),
    lastLogInTime: v => new Date(v),
    genderId: v => this._masterData["GENDER_J"][v],
  };

  enrichKeyValue = (k, v) => {
    if (k in this._mappers) {
      return [`${k}Resolved`, this._mappers[k](v)];
    }
    if (!!v && typeof v === "object") {
      return [k, this.enrichObject(v)];
    }
    return [k, v];
  }
  enrichObject = (obj) => Object.fromEntries(
      Object.entries(obj).map(([k, v]) => this.enrichKeyValue(k, v))
  );
}

export class AbpService {

  toAbpModel = (masterData, obj) => new Enricher(masterData).enrichObject(obj);

  searchAt = async (req) => {
    const masterData = await masterDataPromise;

    const results = await ABPApi.preLoggedInSearch(
        Object.entries(masterData["GENDER_J"])
            .find(([_, v]) => v === req.gender)[0],
        {...req, gender: undefined},
        1
    );
    return results?.docs?.map(t => this.toAbpModel(masterData, t));
  };

}

