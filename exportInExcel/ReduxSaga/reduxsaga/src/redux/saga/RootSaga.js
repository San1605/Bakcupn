import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { IMAGES } from "../constants";
import { fetchImages } from "../../api";
import { setError, setImages } from "../action";
// function* workerSaga(){
//     console.log("hey from worker")
//     yield put({type:"action_from_workers"})
// }

const getpage = (state) => state.nextPage;
function* loadImagesWorker() {
  try {
    const page = yield select(getpage);
    const images = yield call(fetchImages, page);
    yield put(setImages(images));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

function* rootSaga() {
  // console.log("hey world")
  // yield takeEvery("Hello",workerSaga)
  // i want only one request for multiple action example login button only one action fore multipleclickign
  // yield take("Bye")  // always after hello not before hello
  // yield call(workerSaga)

  // take is blocking takeevery is non-blocking

  yield takeEvery(IMAGES.LOAD, loadImagesWorker);
}

// watcher saga -> action -> worker saga

export default rootSaga;
