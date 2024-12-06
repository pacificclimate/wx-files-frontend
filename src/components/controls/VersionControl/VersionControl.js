// Controlled selector that allows a user to switch between CMIP5 and
// CMIP6 datasets. 

import React from 'react';
import Select from 'react-select';

export default function VersionControl( { onSelect, selected } ) {
	// this is all just hard-coded, it's complocated to
	// get it from the API.
	const items = [
		{"value": "CMIP6", "label": "CMIP6+CWEC2020"},
		{"value": "CMIP5", "label": "CMIP5+CWEC2016"}
	];
	
	const label = "Future-shifted Dataset";
	
	const value = () => {
		return items.find((o) => o["value"] === selected)
	};
	
	return (
		<div>
		{label}
		<Select
		  isLoading={items.length === 0}
		  options={items}
		  value={value()}
		  onChange={onSelect}
		/>
		</div>
	);
}