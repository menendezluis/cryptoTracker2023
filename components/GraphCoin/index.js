import React, { useEffect, useState } from "react";
//

// import all the components we are going to use
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  ActivityIndicator,
  Text,
} from "react-native";

//import function to convert epoch time to readable time
import { timeConverter } from "../../utils";

//import React Native chart Kit for different kind of Chart
import { LineChart } from "react-native-chart-kit";
import { fetchPriceByTime } from "../../store/slices/history";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";

const GraphCoin = ({ route }) => {
  const { coin } = route.params;
  const [historyTime, setHistoryTime] = useState({});
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState("");
  const [timer, setTimer] = useState(null);
  const { list: historyList } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPriceByTime(coin.id, "h1"));
  }, []);
  useEffect(() => {
    if (historyList.length > 0) {
      let labels = [];
      let data = [];
      if (historyList.length > 0) {
        historyList.forEach((element) => {
          labels.push(new Date(element.time * 1000).toLocaleString());
          data.push(parseFloat(element.price));
        });
        /*  console.log("my new object",{labels,data})   */
      }
      setHistoryTime({ labels, datasets: data });
    }
    setDate(moment().add(150000, "milliseconds"));
    setInterval(() => {
      setUpdate(!update);
    }, 150000);
  }, [update]);

  const saveHistory = (labels, data) => {
    setHistoryTime({
      labels,
      datasets: [
        {
          data,
        },
      ],
    });
  };
  //date have the next update time calculated from the current time and the time interval every second
  const getDiff = (date) => {
    let now = new Date().getTime();
    let distance = date - now;
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const timerCountDown = (date) => {
    let countDownDate = new Date(date).getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if (date) {
      let timer = setInterval(() => {
        setTimer(getDiff(date));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [date]);

  //let seconds = Math.abs(date.getTime() - new Date().getTime()) / 1000;
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View></View>
          <Image style={styles.image} source={{ uri: coin.image }} />
          <Text>{`Update in: ${timer ?? timer}`}</Text>
        </View>
      </View>
      {historyList.length > 0 && historyList !== undefined ? (
        <LineChart
          data={{
            labels: historyList?.map((item) =>
              new Date(item.time * 1000).toLocaleString()
            ),
            datasets: [
              {
                data: historyList?.map((item) => parseFloat(item.price)),
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={400}
          yAxisLabel={"$"}
          withInnerLines={false}
          withOuterLines={false}
          hideLegend={true}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",

            stroke: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 255) => `rgba(255, 0, 50, ${opacity})`,
            style: {
              borderRadius: 30,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <ActivityIndicator size={"large"} color={"#ef3340"} />
      )}
    </View>
  );
};
export default GraphCoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
  },
});
