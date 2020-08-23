import React from 'react';
import DataTable from '../DataTable'

const CustomTab = ({type, label, service, hideHeader}) => 
	<React.Fragment>
			<DataTable type={type} label={label} service={service} hideHeader={hideHeader} />
	</React.Fragment>

export default CustomTab