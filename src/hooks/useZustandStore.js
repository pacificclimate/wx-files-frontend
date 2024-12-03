import {create} from 'zustand';
import merge from 'lodash/fp/merge';

export const useStore = create((set) => {
	return {
		// stores information about table filters.
		// this allows them to be accessed from components outside the table
		// each filter is represent as an object, keyed to a unique identifier.
		// the object has properties 
		//    accessFunction: (to set the filter)
		//    options: (describes possible selectable values
		//    type: describes the "API" of the filter, 
		//          ie filters of type "list" have you pick one or more option from a provided set
		//          filters of type "range" have you pick a maximum and minimum value 
		filters: {},
		
		registerFilter: (key, type, access, options) => {
			let filter = {}
			filter[key] = {"options": options, "type": type, "accessFunction": access};
			set((state) => ({filters: merge(state.filters, filter)})); 
		},
		
		// labels for filter dropdowns. Each set should be keyed to match an "key" in 
		// .filters; they will be retreived on that basis.
		filterOptionLabels: {
			"versions": {"CMIP5": "CMIP5+CWEC2016", "CMIP6": "CMIP6+CWEC2020",},
		}	
		
		
	}
})