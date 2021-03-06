import React, {PropTypes} from 'react';
import styles from './CourseItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const CourseItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  onClick(path) {
    this.context.router.push(path);
  },
  render() {
    const course = this.props.course;
    const isExternal = course.hasOwnProperty('externalLink');
    return (
      <div>
        {isExternal ?
          <a className={styles.courseItem} href={course.externalLink} target='_blank'>
            <img className={styles.courseLogo} src={course.iconPath}/>
            <span className={styles.courseName}>{course.name} <Glyphicon glyph='new-window'/></span>
          </a>
          :
          <div className={styles.courseItem} onClick={this.onClick.bind(null, course.path)}>
            <img className={styles.courseLogo} src={course.iconPath}/>
            <span className={styles.courseName}>{course.name}</span>
            <span className={styles.lessonCount}>Oppgaver: {course.lessonCount}</span>
          </div>
        }
      </div>
    );
  }
});

CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    externalLink: PropTypes.string,
    iconPath: PropTypes.string,
    lessonCount: PropTypes.int
  })
};

export default withStyles(styles)(CourseItem);
