import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.accentColor};
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.bgColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span: first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<TabProps>`
  text-align: center;
  text_transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.accentColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  transition: color 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out;

  a {
    display: block;
  }
`;

const HomeButton = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    width: 100%;
  }
`;

interface TabProps {
  isActive: boolean;
}

type RouteParams = {
  coinId: string;
};

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams() as RouteParams;
  const state = useLocation().state as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      <Line />
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank : </span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol : </span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price : </span>
              <span>{tickersData?.quotes.USD.price.toFixed(10)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply : </span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply : </span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={"chart"}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route path="price" element={<Price coinId={coinId} />} />
          </Routes>

          <HomeButton>
            <Link to="/">
              <span>Go to Home</span>
            </Link>
          </HomeButton>
        </>
      )}
    </Container>
  );
}

export default Coin;
