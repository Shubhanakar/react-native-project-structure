import {put, call, takeLatest} from 'redux-saga/effects';
import {JOB} from '../redux/store/TypeConstants';
import {GET, POST, getToken, DELETE, PATCH} from './setup/method';

function* createJob(action) {
  try {
    let response = yield call(
      POST,
      'job/create-job',
      action.payload,
      yield getToken(),
    );
    if (response?.message.includes('successfully')) {
      try {
        let jobListResponse = yield call(GET, `job/get-jobs`, yield getToken());
        yield put({
          type: JOB.JOB_LIST_SUCCESS.type,
          data: {
            [JOB.JOB_LIST_SUCCESS.value]: jobListResponse?.jobs,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.JOB_LIST_FAILURE.type,
          data: {error: error},
        });
      }
    }
    yield put({
      type: JOB.CREATE_JOB_SUCCESS.type,
      data: {
        [JOB.CREATE_JOB_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.CREATE_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* updateJob(action) {
  try {
    let response = yield call(
      PATCH,
      `job/update-job/${action.payload.job_id}`,
      action.payload,
      yield getToken(),
    );
    if (response?.message.includes('successfully')) {
      try {
        let jobListResponse = yield call(GET, `job/get-jobs`, yield getToken());
        yield put({
          type: JOB.JOB_LIST_SUCCESS.type,
          data: {
            [JOB.JOB_LIST_SUCCESS.value]: jobListResponse?.jobs,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.JOB_LIST_FAILURE.type,
          data: {error: error},
        });
      }
    }

    yield put({
      type: JOB.EDIT_JOB_SUCCESS.type,
      data: {
        [JOB.EDIT_JOB_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.EDIT_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* deleteJob(action) {
  try {
    let response = yield call(
      DELETE,
      `job/delete-job/${action.payload}`,
      yield getToken(),
    );

    if (response?.message.includes('successfully')) {
      try {
        let jobListResponse = yield call(GET, `job/get-jobs`, yield getToken());
        yield put({
          type: JOB.JOB_LIST_SUCCESS.type,
          data: {
            [JOB.JOB_LIST_SUCCESS.value]: jobListResponse?.jobs,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.JOB_LIST_FAILURE.type,
          data: {error: error},
        });
      }
    }

    yield put({
      type: JOB.DELETE_JOB_SUCCESS.type,
      data: {
        [JOB.DELETE_JOB_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.DELETE_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* createSheet(action) {
  try {
    let response = yield call(
      POST,
      'sheet/create-sheet',
      action.payload,
      yield getToken(),
    );
    console.log('res', response);
    if (response?.message.includes('successfully')) {
      try {
        let sheetResponse = yield call(
          GET,
          `/sheet/get-sheets`,
          yield getToken(),
        );
        yield put({
          type: JOB.GET_SHEETS_SUCCESS.type,
          data: {
            [JOB.GET_SHEETS_SUCCESS.value]: sheetResponse,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.GET_SHEETS_FAILURE.type,
          data: {error: error},
        });
      }
    }
    yield put({
      type: JOB.CREATE_SHEET_SUCCESS.type,
      data: {
        [JOB.CREATE_SHEET_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.CREATE_SHEET_FAILURE.type,
      data: {error: error},
    });
  }
}

function* deleteSheet(action) {
  try {
    let response = yield call(
      DELETE,
      `sheet/delete-sheet/${action.payload}`,
      yield getToken(),
    );
    console.log('res', response);

    if (response?.message.includes('successfully')) {
      try {
        let sheetResponse = yield call(
          GET,
          `sheet/get-sheets`,
          yield getToken(),
        );
        yield put({
          type: JOB.GET_SHEETS_SUCCESS.type,
          data: {
            [JOB.GET_SHEETS_SUCCESS.value]: sheetResponse,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.GET_SHEETS_FAILURE.type,
          data: {error: error},
        });
      }
    }
    yield put({
      type: JOB.DELETE_SHEET_SUCCESS.type,
      data: {
        [JOB.DELETE_SHEET_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.DELETE_SHEET_FAILURE.type,
      data: {error: error},
    });
  }
}

function* updateSheet(action) {
  try {
    let response = yield call(POST, 'client-rgstr', action.payload, '');
    yield put({
      type: JOB.EDIT_SHEET_SUCCESS.type,
      data: {
        [JOB.EDIT_SHEET_SUCCESS.value]: response.data,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.EDIT_SHEET_FAILURE.type,
      data: {error: error},
    });
  }
}

function* createSupplier(action) {
  try {
    let response = yield call(
      POST,
      'supply/create-supply',
      action.payload,
      yield getToken(),
    );
    if (response?.message.includes('successfully')) {
      try {
        let sheetSupplierResponse = yield call(
          GET,
          `supply/get-supplies`,
          yield getToken(),
        );
        yield put({
          type: JOB.GET_SUPPLIER_LIST_SUCCESS.type,
          data: {
            [JOB.GET_SUPPLIER_LIST_SUCCESS.value]: sheetSupplierResponse,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.GET_SUPPLIER_LIST_FAILURE.type,
          data: {error: error},
        });
      }
    }
    yield put({
      type: JOB.CREATE_SUPPLIER_SUCCESS.type,
      data: {
        [JOB.CREATE_SUPPLIER_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.CREATE_SUPPLIER_FAILURE.type,
      data: {error: error},
    });
  }
}

function* deleteSupplier(action) {
  try {
    let response = yield call(
      DELETE,
      `supply/delete-supply/${action.payload}`,
      yield getToken(),
    );

    if (response?.message.includes('successfully')) {
      try {
        let sheetSupplierResponse = yield call(
          GET,
          `supply/get-supplies`,
          yield getToken(),
        );
        yield put({
          type: JOB.GET_SUPPLIER_LIST_SUCCESS.type,
          data: {
            [JOB.GET_SUPPLIER_LIST_SUCCESS.value]: sheetSupplierResponse,
          },
        });
      } catch (error) {
        yield put({
          type: JOB.GET_SUPPLIER_LIST_FAILURE.type,
          data: {error: error},
        });
      }
    }
    yield put({
      type: JOB.DELETE_SUPPLIER_SUCCESS.type,
      data: {
        [JOB.DELETE_SUPPLIER_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.DELETE_SUPPLIER_FAILURE.type,
      data: {error: error},
    });
  }
}

function* editSupplier(action) {
  try {
    let response = yield call(POST, 'client-rgstr', action.payload, '');
    yield put({
      type: JOB.EDIT_SUPPLIER_SUCCESS.type,
      data: {
        [JOB.EDIT_SUPPLIER_SUCCESS.value]: response.data,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.EDIT_SUPPLIER_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getJobList() {
  try {
    let response = yield call(GET, `job/get-jobs`, yield getToken());

    yield put({
      type: JOB.JOB_LIST_SUCCESS.type,
      data: {
        [JOB.JOB_LIST_SUCCESS.value]: response?.jobs,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.JOB_LIST_FAILURE.type,
      data: {error: error},
    });
  }
}

function* filterJobList(action) {
  try {
    let response = yield call(
      GET,
      `job/get-jobs?order=${action.payload.order}${
        action.payload.search
          ? `&keywords=${encodeURIComponent(action.payload.search)}`
          : ''
      }`,
      yield getToken(),
    );

    yield put({
      type: JOB.FILTER_JOB_SUCCESS.type,
      data: {
        [JOB.FILTER_JOB_SUCCESS.value]: response?.jobs,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.FILTER_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* searchJobs(action) {
  try {
    let response = yield call(
      GET,
      `job/get-jobs?keywords=${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.SEARCH_JOB_SUCCESS.type,
      data: {
        [JOB.SEARCH_JOB_SUCCESS.value]: response?.jobs,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.SEARCH_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getSheetType() {
  try {
    let response = yield call(GET, `sheet/get-sheet-types`, yield getToken());
    let sheetResponse = yield call(GET, `/sheet/get-sheets`, yield getToken());
    let sheetSupplierResponse = yield call(
      GET,
      `supply/get-supplies`,
      yield getToken(),
    );

    yield put({
      type: JOB.SHEET_TYPE_SUCCESS.type,
      data: {
        [JOB.SHEET_TYPE_SUCCESS.value]: response,
      },
    });

    yield put({
      type: JOB.GET_SHEETS_SUCCESS.type,
      data: {
        [JOB.GET_SHEETS_SUCCESS.value]: sheetResponse,
      },
    });

    yield put({
      type: JOB.GET_SUPPLIER_LIST_SUCCESS.type,
      data: {
        [JOB.GET_SUPPLIER_LIST_SUCCESS.value]: sheetSupplierResponse,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.SHEET_TYPE_FAILURE.type,
      data: {error: error},
    });
    yield put({
      type: JOB.GET_SHEETS_FAILURE.type,
      data: {error: error},
    });
    yield put({
      type: JOB.GET_SUPPLIER_LIST_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getSingleJobDetails(action) {
  try {
    let response = yield call(
      GET,
      `job/get-job/${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.GET_SINGLE_JOB_DETAILS_SUCCESS.type,
      data: {
        [JOB.GET_SINGLE_JOB_DETAILS_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.GET_SINGLE_JOB_DETAILS_FAILURE.type,
      data: {error: error},
    });
  }
}

function* keepJobsSettings(action) {
  try {
    let response = yield call(
      PATCH,
      `setting/set-job-lifespan`,
      action.payload,
      yield getToken(),
    );

    yield put({
      type: JOB.KEEP_JOB_SUCCESS.type,
      data: {
        [JOB.KEEP_JOB_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.KEEP_JOB_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getJobAreaList(action) {
  try {
    let response = yield call(
      GET,
      `job-area/get-job-areas?job_id=${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.GET_JOB_AREA_SUCCESS.type,
      data: {
        [JOB.GET_JOB_AREA_SUCCESS.value]: response?.jobAreas,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.GET_JOB_AREA_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getJobAreaListByJobAreaID(action) {
  try {
    let response = yield call(
      GET,
      `job-area/get-job-area/${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.GET_JOB_AREA_BY_ID_SUCCESS.type,
      data: {
        [JOB.GET_JOB_AREA_BY_ID_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.GET_JOB_AREA_BY_ID_FAILURE.type,
      data: {error: error},
    });
  }
}

function* createJobArea(action) {
  try {
    let response = yield call(
      POST,
      'job-area/create-job-area',
      action.payload,
      yield getToken(),
    );
    console.log('res', response);

    // if (response?.message.includes('successfully')) {
    //   try {
    //     let jobListResponse = yield call(GET, `job/get-jobs`, yield getToken());
    //     yield put({
    //       type: JOB.JOB_LIST_SUCCESS.type,
    //       data: {
    //         [JOB.JOB_LIST_SUCCESS.value]: jobListResponse?.jobs,
    //       },
    //     });
    //   } catch (error) {
    //     yield put({
    //       type: JOB.JOB_LIST_FAILURE.type,
    //       data: {error: error},
    //     });
    //   }
    // }
    yield put({
      type: JOB.CREATE_JOB_AREA_SUCCESS.type,
      data: {
        [JOB.CREATE_JOB_AREA_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.CREATE_JOB_AREA_FAILURE.type,
      data: {error: error},
    });
  }
}

function* updateJobArea(action) {
  try {
    let obj = {};
    obj.jobId = action.payload.jobId;

    obj.jobAreaName = action.payload.jobAreaName;
    obj.sheetThickness = action.payload.sheetThickness;
    obj.jobNotes = action.payload.jobNotes;
    obj.sheets = action.payload.sheets;
    obj.supplies = action.payload.supplies;

    let response = yield call(
      PATCH,
      `job-area/update-job-area/${action.payload.job_area_id}`,
      obj,
      yield getToken(),
    );
    yield put({
      type: JOB.UPDATE_JOB_AREA_SUCCESS.type,
      data: {
        [JOB.UPDATE_JOB_AREA_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.UPDATE_JOB_AREA_FAILURE.type,
      data: {error: error},
    });
  }
}

function* deleteJobArea(action) {
  try {
    let response = yield call(
      DELETE,
      `job-area/delete-job-area/${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.DELETE_JOB_AREA_SUCCESS.type,
      data: {
        [JOB.DELETE_JOB_AREA_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.DELETE_JOB_AREA_FAILURE.type,
      data: {error: error},
    });
  }
}

function* selectedJobArea(action) {
  try {
    yield put({
      type: JOB.SELECTED_JOB_AREA_SUCCESS.type,
      data: {
        [JOB.SELECTED_JOB_AREA_SUCCESS.value]: action.payload,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.SELECTED_JOB_AREA_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getJobSummaryByJobID(action) {
  try {
    let response = yield call(
      GET,
      `/job/get-job/${action.payload}`,
      yield getToken(),
    );

    yield put({
      type: JOB.JOB_SUMMARY_SUCCESS.type,
      data: {
        [JOB.JOB_SUMMARY_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: JOB.JOB_SUMMARY_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(JOB.CREATE_JOB_REQUEST.type, createJob);
    })(),
    (function* () {
      yield takeLatest(JOB.EDIT_JOB_REQUEST.type, updateJob);
    })(),
    (function* () {
      yield takeLatest(JOB.DELETE_JOB_REQUEST.type, deleteJob);
    })(),
    (function* () {
      yield takeLatest(JOB.JOB_LIST_REQUEST.type, getJobList);
    })(),
    (function* () {
      yield takeLatest(JOB.KEEP_JOB_REQUEST.type, keepJobsSettings);
    })(),
    (function* () {
      yield takeLatest(JOB.CREATE_SHEET_REQUEST.type, createSheet);
    })(),
    (function* () {
      yield takeLatest(JOB.EDIT_SHEET_REQUEST.type, updateSheet);
    })(),
    (function* () {
      yield takeLatest(JOB.DELETE_SHEET_REQUEST.type, deleteSheet);
    })(),
    (function* () {
      yield takeLatest(JOB.CREATE_SUPPLIER_REQUEST.type, createSupplier);
    })(),
    (function* () {
      yield takeLatest(JOB.EDIT_SUPPLIER_REQUEST.type, editSupplier);
    })(),
    (function* () {
      yield takeLatest(JOB.DELETE_SUPPLIER_REQUEST.type, deleteSupplier);
    })(),
    (function* () {
      yield takeLatest(JOB.SHEET_TYPE_REQUEST.type, getSheetType);
    })(),
    (function* () {
      yield takeLatest(
        JOB.GET_SINGLE_JOB_DETAILS_REQUEST.type,
        getSingleJobDetails,
      );
    })(),
    (function* () {
      yield takeLatest(JOB.GET_JOB_AREA_REQUEST.type, getJobAreaList);
    })(),
    (function* () {
      yield takeLatest(
        JOB.GET_JOB_AREA_BY_ID_REQUEST.type,
        getJobAreaListByJobAreaID,
      );
    })(),
    (function* () {
      yield takeLatest(JOB.CREATE_JOB_AREA_REQUEST.type, createJobArea);
    })(),
    (function* () {
      yield takeLatest(JOB.UPDATE_JOB_AREA_REQUEST.type, updateJobArea);
    })(),
    (function* () {
      yield takeLatest(JOB.DELETE_JOB_AREA_REQUEST.type, deleteJobArea);
    })(),
    (function* () {
      yield takeLatest(JOB.SELECTED_JOB_AREA_REQUEST.type, selectedJobArea);
    })(),
    (function* () {
      yield takeLatest(JOB.FILTER_JOB_REQUEST.type, filterJobList);
    })(),
    (function* () {
      yield takeLatest(JOB.SEARCH_JOB_REQUEST.type, searchJobs);
    })(),
    (function* () {
      yield takeLatest(JOB.JOB_SUMMARY_REQUEST.type, getJobSummaryByJobID);
    })(),
  ],
};
