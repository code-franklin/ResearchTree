import React from 'react';
import './Cards.css';


const Cards = () => {
    return (
        
        <div className="view-analytics">
       
            <div className="cards-container">

<div className="year-container">ViewAnalytics

    
        
</div>
    
                <div className="card">
                    <div className="card-icon-1">
                    <img className="" src="./src/assets/star.png"/>
                    </div>
                    <div className="card-content">
                        <p className="card-title">Trending Manuscript</p>
                        <p className="card-value-1">Machine Learning</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon-2">
                    <img className="" src="./src/assets/Check.png"/> 
                    </div>
                    <div className="card-content">
                        <p className="card-title">Total Manuscript</p>
                        <p className="card-value-2">2,504</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-icon-3">
                    <img className="" src="./src/assets/Trophy.png"/> 
                    </div>
                    <div className="card-content">
                        <p className="card-title">Best Thesis</p>
                        <p className="card-value-3">300</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
