import { FC, useState} from 'react';
import { Space, Switch } from 'antd';

const toolBar: FC = () => {
    const [preview, setPreview] = useState(false);

    const onModeChange = (checked: boolean, e: Event) => {
        console.log(checked, '---', e)
        setPreview(checked)
    }

    return (
        <div>
            <Switch checkedChildren="预览模式" unCheckedChildren="创作模式" defaultChecked onClick={onModeChange} />
        </div>
    )
}

export default toolBar;
