import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommentForm } from '../Forms/CommentForm';
import { Preloader } from '../common/Preloader';
import classes from './CommentsPage.module.css';
import classNames from 'classnames';

export const CommentsPage = (props) => {
  const onSubmit = (values) => {
    const date = new Date().toISOString();
    let data = JSON.stringify({
      id: props.totalCommentsCount + 1,
      name: values.name,
      text: values.comment,
      visible: 0,
      product_id: 30,
      created_at: date,
      updated_at: date,
    });
    props.sendCommentThunk(data);
  };
  const setCurrentPage = (page) => {
    props.setCurrentPageThunk(page);
  };
  const showMore = (page) => {
    props.showMoreThunk(page);
  };
  let pages = [];
  for (let i = 1; i <= props.lastPage; i++) {
    pages.push(i);
  }
  let rightPage = props.currentPage + props.sectionSize;
  let leftPage = props.currentPage;
  return (
    <div>
      <CommentForm onSubmit={onSubmit} />
      <div className="text-center m-4">
        {props.isFetching ? (
          <Preloader />
        ) : (
          <Pagination
            {...props}
            setCurrentPage={setCurrentPage}
            leftPage={leftPage}
            rightPage={rightPage}
            pages={pages}
          />
        )}
      </div>
      <div>
        {props.comments.map((comment) => {
          let date = new Date(comment.created_at);
          return (
            <div key={comment.id} className={classes.comment}>
              <div className={classes.name}>{comment.name}</div>
              <div>{comment.text}</div>
              <div className={classes.comment__time}>
                {date.toUTCString().substr(5, 20)}
              </div>
            </div>
          );
        })}
        <div className="text-center m-4">
          {props.isFetching ? (
            <Preloader />
          ) : (
            <>
              <Pagination
                {...props}
                setCurrentPage={setCurrentPage}
                leftPage={leftPage}
                rightPage={rightPage}
                pages={pages}
              />
              {!(props.currentPage === props.lastPage) ? (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    showMore(props.currentPage + 1);
                  }}
                >
                  Show more
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Pagination = (props) => {
  return (
    <div className={classes.pagination}>
      {props.currentPage === props.lastPage && (
        <button onClick={() => props.setCurrentPage(1)}>
          <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
        </button>
      )}
      {props.currentPage > 1 && (
        <button onClick={() => props.setCurrentPage(props.currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </button>
      )}

      {props.pages
        .filter((page) => page >= props.leftPage && page <= props.rightPage)
        .map((page, index) => {
          return (
            <li
              className={classNames(classes.pagination__item, {
                [classes.active]: props.currentPage === page,
              })}
              key={index}
              onClick={() => {
                props.setCurrentPage(page);
              }}
            >
              {page}
            </li>
          );
        })}
      {props.currentPage < props.lastPage && (
        <button onClick={() => props.setCurrentPage(props.currentPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </button>
      )}
    </div>
  );
};
// .sort((a, b) => {
//   return (
//     new Date(b.created_at).getTime() -
//     new Date(a.created_at).getTime()
//   );
// })
