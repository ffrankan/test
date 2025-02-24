import {
    ExperimentOutlined,
    CustomerServiceOutlined,
    HeartOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons';
import {LabItem} from '@/components/LabCard';

export const labs: LabItem[] = [
    {
        title: '通用AI实验室',
        description: '探索AI的基础应用和实验',
        path: '/ai_general_lab/courses',
        icon: <ExperimentOutlined/>,
        courses: 3,
        status: '最受欢迎',
        statusColor: '#f5222d',
        type: 'general'
    },
    {
        title: '算法音乐实验室',
        description: '体验AI音乐创作与算法作曲',
        path: '/algorithm_music_lab/courses',
        icon: <CustomerServiceOutlined/>,
        courses: 2,
        status: '新课程',
        statusColor: '#52c41a',
        type: 'music'
    },
    {
        title: 'AI心理实验室',
        description: '探索AI在心理学领域的应用',
        path: '/ai_psychology_lab/courses',
        icon: <HeartOutlined/>,
        courses: 2,
        status: '热门',
        statusColor: '#faad14',
        type: 'psychology'
    },
    {
        title: 'AI+N实验室',
        description: 'AI与其他领域的创新融合',
        path: '/ai_mix_lab/courses',
        icon: <AppstoreAddOutlined/>,
        courses: 3,
        status: '推荐',
        statusColor: '#1890ff',
        type: 'innovation'
    }
];
