import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function GoBackButton(): JSX.Element {
  const history = useHistory();

  return (
    <Button
      className="go-back-btn"
      onClick={() => history.push('/')}
      icon={<ArrowLeftOutlined />}
    >
      Back to home page
    </Button>
  );
}

export default GoBackButton;
