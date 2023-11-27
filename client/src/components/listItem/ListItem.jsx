import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListItem({ index, item, token }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    try {
      const getMovie = async () => {
        const res = await axios.get(
          `http://localhost:8000/api/movie/find/${item}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        setMovie(res.data);
      };
      getMovie();
    } catch (err) {
      console.log(err);
    }
  }, [item]);

  return (
    !!movie && (
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span> {movie.duration} </span>
                <span className="limit"> + {movie.limit}</span>
                <span> {movie.year} </span>
              </div>
              <div className="title">{movie.title}</div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    )
  );
}
