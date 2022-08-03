import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function GoBackButton(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Button className="go-back-btn" onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />}>
      Back to home page
    </Button>
  );
}

export default GoBackButton;
