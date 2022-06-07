import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

const Search = () => {
  const [results, setResults] = useState([]);
  const [inp, setInp] = useState("");
  const [screenValue, setScreenValue] = useState(null);
  const service = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
  });

  const getYoutube = (search) => {
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      part: "snippet",
      q: search,
      type: "video",
    };

    return service
      .get("search", { params: params })
      .then((res) => setResults(res.data.items));
  };
  const functionData = () => {
    if (inp) {
      getYoutube(inp);
      setScreenValue(inp);
    }
  };
  return (
    <div>
      <input type="text" value={inp} onChange={(e) => setInp(e.target.value)} />
      <button
        onClick={() => {
          functionData();
        }}
      >
        Search
      </button>
      <div>
        <div>
          {screenValue && <h1>Results for {screenValue}</h1>}
          {screenValue && <h2>Videos</h2>}
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              columnGap: 4,
              rowGap: 5,
            }}
          >
            {results.map((item, index) => {
              return (
                <Grid item sx={{ maxWidth: 480 }} key={index}>
                  <h3>{item.snippet.title}</h3>
                  <iframe
                    width="480"
                    height="270"
                    src={`https://www.youtube.com/embed/${item.id.videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Search;
