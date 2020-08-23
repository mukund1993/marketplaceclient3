import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {Tab, Tabs, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CustomTab from './custom-tab'
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from './styles'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  root: {
    padding: "0 0px",
    "& div.MuiTabs-scrollButtons": {
      width: '20px'
    },
    "& div.MuiTabs-scroller": {
      background: "#C8C8C8",
      "& .MuiTab-root": {
        minWidth: '110px'
      },
      '& .MuiButton-label': {
        color: '#000'
      },
      '& .MuiTab-textColorInherit': {
        color: '#000'
      },
      "& .MuiTabs-flexContainer": {
        backgroundColor: '#DEE1E6',
        color: '#fff',
        "& .MuiButtonBase-root":{
          cursor: 'pointer',
          padding: '6px 6px',
          borderRadius: '14px 14px 0 0',
          marginLeft: '6px',
          marginTop: '5px',
          zIndex: 1,
          "&:hover":{
            backgroundColor: '#e8eaed',
            opacity: 0.8
          }
        },
        "& .Mui-selected": {
          background: '#fff',
          borderColor: '#aaa',
          color: 'black',
          borderRadius: '14px 14px 0 0',
          zIndex: 6
        }
      }
    }
  }
})(Tabs);

const AdminTabs = ({list, value, handleChange}) => {
    const classes = useStyles();
		const [selectedService, setSelectedService] = useState(null)

		useEffect(()=> {
			if (list) {
				setSelectedService(list[value])
			}
		}, [list, value])

		return <React.Fragment>
        { list && <StyledTabs indicatorColor="none" value={value} textColor={'inherit'} className={classes.root}  aria-label="simple tabs example" onChange={handleChange}>
            {list.map(({key, label, tooltip}, index) => {
                return <Tab key={key} textColor={'inherit'} {...a11yProps(index)} 
                label={
                  tooltip
                    ? 
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">{tooltip}</Typography>
                        </React.Fragment>
                      } >
                        <Button>{label}</Button>
                    </HtmlTooltip>
                    :
                    label
                }/>
            })}
        </StyledTabs>}
				{
					selectedService && <CustomTab type={selectedService.type} label={selectedService.label} service={selectedService.key} hideHeader={true}/>
				}
    </React.Fragment>    
}
export default AdminTabs