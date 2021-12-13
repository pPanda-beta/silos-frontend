import Dexie from 'dexie';

export const db = new Dexie('siloDatabase');

db
    .version(1)
    .stores({
      matrimonyProfiles: 'matrimonyUserCode, matrimonyUserName, genderIdResolved, userAge, height',
    });

