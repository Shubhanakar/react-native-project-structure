import {JOB} from '../store/TypeConstants';

export const createJob = payload => ({
  type: JOB.CREATE_JOB_REQUEST.type,
  payload,
});
