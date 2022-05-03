import React, { useEffect,useState } from "react";
import NewsItem2 from "./NewsItem2";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News= (props)=> {
    const [article, setArticle] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalresults, setTotalResults] = useState(0)
    const capitaliseStr= (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `News -${capitaliseStr(props.category)}`;

    useEffect(() => {
      updateNews();
  }, [])

  const updateNews= async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
      setArticle(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
      setArticle(article.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
  };
 
  News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 12,
  };
  News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
    return (
      <>
        <div>
          <center>
            <h1 style={{marginTop:'70px'}}>
              News Headlines | {capitaliseStr(props.category)}{" "}
              Category
            </h1>
          </center>
        </div>
        {loading && <Spinner />}
        <div className="album py-3 bg-light">
        <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalresults}
                loader={<Spinner />}
              >
          <div className="container">
          
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {article.map((element) => {
                  return (
                    <div className="col" key={element.url}>
                      <NewsItem2
                        title={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        newUrl={element.url}
                        publisher={element.source.name}
                      />
                    </div>
                )})};
              </div>
            </div>
              </InfiniteScroll>
          </div>
      </>
    );
  }

export default News;
