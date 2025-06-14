import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
`;

const ErrorImage = styled.svg`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Message = styled.h2`
  color: #2c3e50;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #155cbd;
  }
`;

const ErrorScreen = ({ onRetry }) => {
  return (
    <Container>
      <ErrorImage
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="50" width="44" height="4" fill="#2C3E50" />
        <polygon points="32,10 22,50 42,50" fill="#2980B9" />
        <rect x="28" y="30" width="8" height="4" fill="#ecf0f1" />
        <rect x="28" y="38" width="8" height="4" fill="#ecf0f1" />
      </ErrorImage>

      <Message>Something went wrong. Please try again</Message>
      <RetryButton onClick={onRetry}>Try Again</RetryButton>
    </Container>
  );
};

export default ErrorScreen;
