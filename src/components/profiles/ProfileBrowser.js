import MUIDataTable from "mui-datatables";

import {profileService} from '../../services/profile';
import {Grid, Paper, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Facebook, LinkedIn} from '@material-ui/icons';
import {multiSelectFilter, range} from '../../data/common';

const ProfileCard = ({profile}) => {

  return (
      <Paper elevation={6}>
        <Grid container direction="column"
              alignItems="center" justify="space-evenly">
          <img src={profile?.imagePath} alt={profile?.matrimonyUserName}
               height={90} // TODO: start using sx
          />
          <Grid container direction="row"
                alignItems="center" justify="space-evenly">
            <IconButton size="small"><Facebook/></IconButton>
            <IconButton size="small"><LinkedIn/></IconButton>
          </Grid>
        </Grid>
      </Paper>
  );
};

const ProfileBrowser = () => {
  const allProfiles = profileService.useAllProfiles();

  const options = {
    filter: true,
    filterArrayFullMatch: false,
    filterType: 'dropdown',
    //TODO: use  responsive: 'scrollMaxHeight', to enable fixed height and inner scroll, but that will break the mobile mode
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
    {
      name: 'userAge',
      label: "Age",
      options: range({
        initialRange: [18, 40],
        filterSliderLabel: () => (<Typography> Age</Typography>),
        renderAppliedFilter: ([minAge, maxAge]) => `${minAge} <= Age <= ${maxAge}`,
      })
    },
    {
      name: 'height',
      label: "Height",
      options: range({
        initialRange: [3, 12],
        filterSliderLabel: () => (<Typography> Height</Typography>),
        renderAppliedFilter: ([minHeight, maxHeight]) => `${minHeight} <= Height <= ${maxHeight}`,
      })
    },
    {
      name: 'highestEducationVal',
      label: "Education",
      options: multiSelectFilter()
    },
    {name: 'occupationVal', label: "Occupation", options: multiSelectFilter()},
    {
      name: 'annualIncomeVal',
      label: "Annual Income",
      options: multiSelectFilter()
    },
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