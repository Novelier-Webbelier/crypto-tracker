import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const CoinsList = styled.ul`
  margin-top: 30px;
`;

const CoinDetails = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

const CoinDetailItem = styled.span`
  font-size: 10px;
  color: ${(props) => props.theme.darkColor};
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.bgColor};
  transition: all 0.2s ease-in-out;

  a {
    transition: all 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  &:hover {
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};

    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const CoinId = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>List of Coins!</title>
      </Helmet>
      <Header>
        <Title>List of Coins</Title>
        <button onClick={toggleDarkAtom}>Toogle Mode</button>
      </Header>
      <Line />
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{
                  name: coin.id,
                }}
              >
                <CoinInfo>
                  <CoinImage
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <CoinId>{coin.name} &rarr;</CoinId>
                </CoinInfo>
                <CoinDetails>
                  <CoinDetailItem>
                    <span>Id : </span>
                    <span>{coin.id}</span>
                  </CoinDetailItem>
                  <CoinDetailItem>
                    <span>Symbol : </span>
                    <span>{coin.id}</span>
                  </CoinDetailItem>
                </CoinDetails>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
