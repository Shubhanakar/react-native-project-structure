import {JOB} from '../store/TypeConstants';

export const createJob = payload => ({
  type: JOB.CREATE_JOB_REQUEST.type,
  payload,
});
export const createSheet = payload => ({
  type: JOB.CREATE_SHEET_REQUEST.type,
  payload,
});
export const createSupplier = payload => ({
  type: JOB.CREATE_SUPPLIER_REQUEST.type,
  payload,
});

export const getSheetType = () => ({
  type: JOB.SHEET_TYPE_REQUEST.type,
});

export const getSheetList = () => ({
  type: JOB.GET_SHEETS_SUCCESS.type,
});

export const getJobList = () => ({
  type: JOB.JOB_LIST_REQUEST.type,
});

export const deleteSheetReq = payload => ({
  type: JOB.DELETE_SHEET_REQUEST.type,
  payload,
});
export const deleteJobReq = payload => ({
  type: JOB.DELETE_JOB_REQUEST.type,
  payload,
});
export const deleteSupplyReq = payload => ({
  type: JOB.DELETE_SUPPLIER_REQUEST.type,
  payload,
});

export const keepJobReq = payload => ({
  type: JOB.KEEP_JOB_REQUEST.type,
  payload,
});
export const getSingleJobDetails = payload => ({
  type: JOB.GET_SINGLE_JOB_DETAILS_REQUEST.type,
  payload,
});
export const updateJob = payload => ({
  type: JOB.EDIT_JOB_REQUEST.type,
  payload,
});

{
  /* JOB AREA */
}
export const createJobAreaReq = payload => ({
  type: JOB.CREATE_JOB_AREA_REQUEST.type,
  payload,
});
export const updateJobAreaReq = payload => ({
  type: JOB.UPDATE_JOB_AREA_REQUEST.type,
  payload,
});

export const deleteJobAreaReq = payload => ({
  type: JOB.DELETE_JOB_AREA_REQUEST.type,
  payload,
});

export const getJobAreaList = payload => ({
  type: JOB.GET_JOB_AREA_REQUEST.type,
  payload,
});

export const getJobAreaById = payload => ({
  type: JOB.GET_JOB_AREA_BY_ID_REQUEST.type,
  payload,
});
export const saveSelectedJobAreaDetails = payload => ({
  type: JOB.SELECTED_JOB_AREA_REQUEST.type,
  payload,
});
export const filterJobs = payload => ({
  type: JOB.FILTER_JOB_REQUEST.type,
  payload,
});

export const searchJobs = payload => ({
  type: JOB.SEARCH_JOB_REQUEST.type,
  payload,
});

export const getJobSummary = payload => ({
  type: JOB.JOB_SUMMARY_REQUEST.type,
  payload,
});

// export const cleanJobData = () => ({
//   type: JOB.CLEAN_JOB_REDUCER_REQUEST.type,
// });
