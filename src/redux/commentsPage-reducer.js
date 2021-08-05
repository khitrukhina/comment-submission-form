import { requests } from '../api/api';

let initialState = {
  comments: [],
  currentPage: 1,
  lastPage: null,
  sectionSize: null,
  totalCommentsCount: null,
  isFetching: false,
};

const SEND_COMMENT = 'SEND_COMMENT';
const SET_SECTION_SIZE = 'SET_SECTION_SIZE';
const SET_TOTAL_COMMENTS_COUNT = 'SET_TOTAL_COMMENTS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING;';
const SET_LAST_PAGE = 'SET_LAST_PAGE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_COMMENTS = 'SET_COMMENTS';
const SHOW_MORE = 'SHOW_MORE';

export const commentsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case SET_SECTION_SIZE:
      return {
        ...state,
        sectionSize: action.sectionSize,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_LAST_PAGE:
      return {
        ...state,
        lastPage: action.lastPage,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SHOW_MORE: {
      return {
        ...state,
        comments: [...state.comments, ...action.comments],
      };
    }
    case SET_COMMENTS:
      return {
        ...state,
        comments: [...action.comments],
      };
    case SET_TOTAL_COMMENTS_COUNT:
      return {
        ...state,
        totalCommentsCount: action.totalCommentsCount,
      };

    default:
      return state;
  }
};

const sendCommentAC = (comment) => ({
  type: SEND_COMMENT,
  comment,
});

const toggleIsFetchingAC = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

const setSectionSizeAC = (sectionSize) => ({
  type: SET_SECTION_SIZE,
  sectionSize,
});

const setLastPageAC = (lastPage) => ({
  type: SET_LAST_PAGE,
  lastPage,
});

export const setCurrentPageAC = (page) => ({
  type: SET_CURRENT_PAGE,
  currentPage: page,
});

export const showMoreAC = (comments) => ({
  type: SHOW_MORE,
  comments,
});

export const setCommentsAC = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

export const setTotalCommentsAC = (count) => ({
  type: SET_TOTAL_COMMENTS_COUNT,
  totalCommentsCount: count,
});

export const sendCommentThunk = (comment) => (dispatch) => {
  requests.sendComment(comment).then((comment) => {
    dispatch(sendCommentAC(comment));
  });
};

export const getCommentsThunk = () => (dispatch) => {
  requests.getComments().then((response) => {
    dispatch(toggleIsFetchingAC(true));
    if (response.status === 200) {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setTotalCommentsAC(response.data.total));
      dispatch(setSectionSizeAC(response.data.per_page));
      dispatch(setCurrentPageAC(response.data.current_page));
      dispatch(setLastPageAC(response.data.last_page));
      dispatch(setCommentsAC(response.data.data));
    }
  });
};

export const setCurrentPageThunk = (page) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    requests.setCurrentPage(page).then((response) => {
      dispatch(toggleIsFetchingAC(false));
      if (response.status === 200) {
        dispatch(setCurrentPageAC(response.data.current_page));
        dispatch(setCommentsAC(response.data.data));
      }
    });
  };
};

export const showMoreThunk = (page) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    requests.setCurrentPage(page).then((response) => {
      dispatch(toggleIsFetchingAC(false));
      if (response.status === 200) {
        dispatch(showMoreAC(response.data.data));
        dispatch(setCurrentPageAC(response.data.current_page));
      }
    });
  };
};
