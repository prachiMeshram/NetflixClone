import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/widgetSm";
import WidgetLg from "../../components/widgetLg/widgetLg";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/user/userStats", {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODQwYWM1ZGE5ZGYyNzFjOGRjZjQ4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODIwMjkwMywiZXhwIjoxNjg4NjM0OTAzfQ.XdFWULUTKSB8CVJe1a_hkotgNS5uWbJk4bwUpmcBmtQ",
        },
      });

      // for (const item in res.data) {
      //   if (res.data.hasOwnProperty(item)) {
      //     // console.log(`${key}: ${population[key]}`);
      //     setUserData((prev) => [
      //       ...prev,
      //       { name: monthsArray[item - 1], "Active User": res.data[item] },
      //     ]);
      //   }
      // }

      setUserData(res.data.data)
      // console.log(res);
    };
    fetchData();
    // console.log(userData);
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
