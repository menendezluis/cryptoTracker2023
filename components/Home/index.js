import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
  Button,
} from "react-native";
import CoinItem from "../CoinItem";
import { fetchCoinList } from "../../store/slices/coins";
import { fetchCoinGeckoList } from "../../store/slices/coinsGecko";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ navigation, route }) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("Luis");
  const [isName, setIsName] = useState(false);

  const { list: coinsList } = useSelector((state) => state.coins);
  const { list: coinsGeckoList } = useSelector((state) => state.coinsGecko);
  {
    /* const loadData = async () => {
    console.log("loged");
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  }; */
  }

  {
    /* useEffect(() => {
    loadData();
  }, []); */
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinList());
    dispatch(fetchCoinGeckoList());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a Coin"
            placeholderTextColor="#000"
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <FlatList
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            dispatch(fetchCoinGeckoList());
            setRefreshing(false);
          }}
          style={styles.list}
          data={coinsGeckoList.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => {
            return <CoinItem coin={item} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfeff",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#ef3340",
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginVertical: 10
  },
  searchInput: {
    color: "#ef3340",
    borderBottomColor: "#ef3340",
    borderBottomWidth: 2,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
  },
});

export default Home;
