import React from 'react';
import { connect } from 'react-redux';

import {
  getCommentsThunk,
  sendCommentThunk,
  setCurrentPageThunk,
  showMoreThunk,
} from '../../redux/commentsPage-reducer';
import { CommentsPage } from './CommentsPage';

class CommentsPageContainer extends React.Component {
  componentDidMount() {
    this.props.getCommentsThunk();
  }
  render() {
    return <CommentsPage {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentsPage.comments,
    currentPage: state.commentsPage.currentPage,
    lastPage: state.commentsPage.lastPage,
    sectionSize: state.commentsPage.sectionSize,
    isFetching: state.commentsPage.isFetching,
    totalCommentsCount: state.commentsPage.totalCommentsCount,
  };
};
export const CommentsPageComponent = connect(mapStateToProps, {
  getCommentsThunk,
  sendCommentThunk,
  setCurrentPageThunk,
  showMoreThunk,
})(CommentsPageContainer);
