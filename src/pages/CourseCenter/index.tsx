import React from 'react';
import {useParams} from 'react-router-dom';
import {Col, Empty, Row} from 'antd';
import CourseCard from '@/components/CourseCard';
import {courses} from '@/constants/course';
import type {CourseOverview} from '@/types/course';
import styles from './index.module.less';

const CourseCenter: React.FC = () => {
    const {labName = ''} = useParams<{ labName: string }>();

    const filteredCourses = React.useMemo(() => {
        return courses.filter((course: CourseOverview) => course.lab.name === labName);
    }, [labName]);

    return (
        <div className={styles.container}>
            {filteredCourses.length > 0 ?
                (<Row gutter={[24, 24]}>
                    {filteredCourses.map((course: CourseOverview) => (
                        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                            <CourseCard course={course}/>
                        </Col>
                    ))}
                </Row>) :
                (
                    <div className={styles.emptyState}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={<span>该实验室暂无课程<br/>敬请期待更多精彩内容</span>}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default CourseCenter;
