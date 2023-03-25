import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MedicationIcon from '@mui/icons-material/Medication';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {

  let navigate = useNavigate();
  const changeTab = (e) => {
    localStorage.setItem("currentTab", e.target.textContent);
    window.location.reload();
  }

  return (
    <React.Fragment>
      {/* <ListItemButton name="dashboard" onClick={changeTab}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton> */}
      <ListItemButton name="account" onClick={changeTab}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
      <ListItemButton name="association" onClick={changeTab}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Associations" />
      </ListItemButton>
      <ListItemButton name="doctor" onClick={changeTab}>
        <ListItemIcon>
          <MedicationIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItemButton>
      <ListItemButton name="event" onClick={changeTab}>
        <ListItemIcon>
          <CelebrationIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      <ListItemButton name="logout" onClick={() => {
        navigate("/signin")
      }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  )
};

export const SecondaryListItems = () => {
  let navigate = useNavigate();
  const changeTab = (e) => {
    localStorage.setItem("currentTab", e.target.textContent);
    window.location.reload();
  }
  return (
    <React.Fragment >
      <ListItemButton name="account" onClick={changeTab}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
      <ListItemButton name="event" onClick={changeTab}>
        <ListItemIcon>
          <CelebrationIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItemButton>
      <ListItemButton name="logout" onClick={() => {
        navigate("/signin")
      }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment >
  )
};