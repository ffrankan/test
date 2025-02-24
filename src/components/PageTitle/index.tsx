import { useMatches } from 'react-router-dom';

interface RouteHandle {
  title: string;
}

const DEFAULT_TITLE = '藤养学园AI交互式教学实验平台';

const PageTitle: React.FC = () => {
  const matches = useMatches();
  
  const getPageTitle = () => {
    const handle = matches.at(-1)?.handle as RouteHandle;
    return handle?.title ?? DEFAULT_TITLE;
  };

  return <span>{getPageTitle()}</span>;
};

export default PageTitle;
