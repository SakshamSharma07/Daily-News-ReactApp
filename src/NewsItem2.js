import React from "react";
const NewsItem2 = (props)=> {
    let { title,description,imageUrl,newUrl,publisher} =props;
    return (
      <div className="card shadow-sm">
         <img src={!imageUrl?'./news.jpg':imageUrl} className="card-img-top" height="250" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title?title.slice(0,50):''}...</h5>
          <p className="card-text">
            {description ? description.slice(0,100) : ''}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <a href={newUrl} target='_blank' className="btn btn-primary">View</a>
            <small className="text-muted">By {publisher}</small>
          </div>
        </div>
      </div>
    );
}

export default NewsItem2;
