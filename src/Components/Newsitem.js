import React from 'react'

const Newsitem = (props)=> {
        let {title, description, imageUrl, newsUrl, author, date, source} = props;
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right: '0px'}}>
                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl ? imageUrl :"https://images.hindustantimes.com/tech/img/2021/09/08/1600x900/sun-11030_1631065589823_1631065597152.jpg"} className="card-img-top" alt="..." />
                    <div className ="card-body">
                    <h5 className ="card-title">{title}</h5>
                    <p className ="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author? author: "Anonymous"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className ="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

export default Newsitem
