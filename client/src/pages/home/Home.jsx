import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./home.scss";

// jbgrj
const Home = ({ type, genre }) => {
  const [lists, setLists] = useState([]);
  const {state} = useLocation();
  const { token } = state;

  useEffect(() => {
    const getLists = async () => {
      console.log(token, "here");

      try {
        const res = await axios.get("http://localhost:8000/api/list/getlists", {
          headers: {
            authorization: token,
          },
        });
        setLists(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    getLists();
  }, []);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {!!lists &&
        lists.map((list, id) => <List list={list} key={id} token={token} />)}
    </div>
  );
};

export default Home;
