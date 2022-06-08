import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  margin-top: 20px;
`;

const Line = styled.hr`
  height: 2px;
  background-color: ${(props) => props.theme.darkColor};
  border: none;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  return (
    <Container>
      <Header>
        <Title>List of Coins</Title>
      </Header>
      <Line />
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
