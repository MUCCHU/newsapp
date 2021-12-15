import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props)=> {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (val)=>{
        return(val.charAt(0).toUpperCase() + val.slice(1));
    }
    const updateNews = async(pageNo)=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`
        setLoading(true)
        let res = await fetch(url)
        props.setProgress(30);
        let data = await res.json()
        props.setProgress(50);
        setLoading(false)
        setArticles(data.articles)
        setTotalResults(data.totalResults)
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews(page);
        document.title = "News | "+ capitalizeFirstLetter(props.category);
    }, [])

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        let res = await fetch(url)
        let data = await res.json()
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setPage(page+1)
    };
        return (
            <>
                <h1 className="text-center" style={{margin: '40px 0px', marginTop: '80px'}}>News Monkey - Top Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {articles.map((element)=>{
                                return(
                                    <div key={element.url}  className="col-md-4">
                                        <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                    </div>
                                )
                            })}                    
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }

    News.defaultProps = {
    country: 'in',
    pageSize: 8
    }
    News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    }

export default News
