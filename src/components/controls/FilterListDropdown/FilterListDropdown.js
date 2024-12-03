// This component is a dropdown list from which a user picks an option
// The option is then supplied to a filter in the data table, which filters
// the data accordingly.
// This allows filtering the data on additional attributes without adding 
// more columns to an already-complicated table. Additional columns may
// be added to the table and hidden, then this dropdown can be used to 
// filter on the hidden column in a space-effient way.

import React, {useEffect, useState} from 'react';
import {useStore} from '../../../hooks/useZustandStore'; 
import map from 'lodash/fp/map';
import Select from 'react-select';

export default function FilterListDropdown( {filter_id, initialize, label} ) {
  // list of available filters	
  const filters = useStore((state) => state.filters);
  const optionLabels = useStore((state) => state.filterOptionLabels);
  const [items, setItems] = useState([]);
  const [filterAccess, setFilterAccess] = useState("fake!");
  const [selected, setSelected] = useState("");
  
  
  const makeItem = (value) => {
	if((filter_id in optionLabels) && (value in optionLabels[filter_id])) {
		return {"value": value, "label": optionLabels[filter_id][value]};
	} 
	return {"value": value, "label": value}
  }
  
  
  const onSelect = (option) => {
	// set locally so UI updates
	setSelected(option);
	// update in table filter
	filterAccess(option["value"]);
  }
  
  //once the access function is available, set the filter to the default. Only 
  // done once.
  useEffect(() => {
	if(filterAccess && items.length > 0) {
		const elem = items.find((option) => option["value"] === initialize);	
		if(elem) {
			onSelect(elem);
		}
	}
  }, [filterAccess, items]);
  
  //set up  the selector items and callback function, only run once.
  useEffect(() => {
	if (filters && (filter_id in filters) && (items.length == 0)) {
		
		// this bit of minor weirdness is necessary because 
		// if you pass React a function via useState, it 
		// assumes you want it to invoke that function to calculate
		// the next iteration of the state attribute, and calls it
		// for you, passing in the current state and storing the output
		// as the new state.
		// if you want to actually store the function itself, you need
		// to work within this functionality by passing a function
		// that returns the function you actually want to store.
		// react will invoke the wrapper function, and dutifully
		// store the result (the desired function).
		const af = filters[filter_id]["accessFunction"];
		setFilterAccess(() => af);

		setItems(filters[filter_id]["options"].map(makeItem));
		}
  }, [filters]);

  
  return (	
	<div className={`${filter_id}-selector`}>
	  <Select
	    isLoading={items.length === 0}
		options={items}
		value={selected}
		onChange={onSelect}
	  />
	</div>
	);
	
  }