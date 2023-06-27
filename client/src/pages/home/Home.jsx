import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./home.scss";

const Home = ({type, genre}) => {
  const [lists, setLists] = useState([]);
  const {token} = useLocation();

  useEffect(() => {
    const getLists = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/list/getlists", {
          headers: {
            authorization: token,
          },
        });
        // console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type = {type} />
      {!!lists &&
        lists.map((list, id) => (
          <List list={list} key={id}/>
        ))}
    </div>
  );
};

export default Home;
