import MUIDataTable from "mui-datatables";

import {profileService} from '../../services/profile';
import {Card, CardActions, CardContent, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Facebook, LinkedIn} from '@material-ui/icons';

const ProfileCard = ({profile}) => {

  return (
      <Card raised variant='elevation' sx={{spacing: 'gap(1)'}}>
        <CardContent>
          <img src={profile?.imagePath} alt={profile?.matrimonyUserName}
               height={120} // TODO: start using sx
          />
        </CardContent>
        <CardActions>
          <IconButton><Facebook/></IconButton>
          <IconButton><LinkedIn/></IconButton>
        </CardActions>
      </Card>
  );
};

const ProfileBrowser = () => {
  const allProfiles = profileService.useAllProfiles();

  const options = {
    filter: true,
    filterArrayFullMatch: false,
    filterType: 'dropdown',
    responsive: 'vertical',
    selectableRows: false,
    print: false,
  };

  const columns = [
    {
      name: 'imagePath',
      label: "Image",
      options: {
        customBodyRenderLite: (dataIndex) => (
            <ProfileCard profile={allProfiles[dataIndex]}/>
        )
      }
    },
    {
      name: 'matrimonyUserName',
      label: "Name",
      options: {
        customBodyRender: (t) => (
            <Typography variant='h6'>{t}</Typography>
        )
      }
    },
    {name: 'userAge', label: "Age"},
    {name: 'height', label: "Height"},
    {name: 'highestEducationVal', label: "Education"},
    {name: 'occupationVal', label: "Occupation"},
    {name: 'annualIncomeVal', label: "Annual Income"},
    {
      name: 'lastLogInTimeResolved',
      label: "Last Active",
      options: {customBodyRender: t => t?.toDateString()}
    },
  ];

  return (
      <div style={{"display": "block"}}>
        <MUIDataTable title={"Profiles"}
                      options={options}
                      data={allProfiles}
                      columns={columns}
        />
      </div>
  );

};

export default ProfileBrowser;