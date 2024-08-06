import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Article.css';

const articles = [
  {
    title: 'Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive Analysis of Adoption, Challenges, and Future Directions',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
    highlight: true,
  },

  {
    title: 'Understanding the Role of Blockchain Technology in Supply Chain Management: Opportunities, Challenges, and Implementation Strategies',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'Examining the Effects of Social Media Usage on Mental Health: A Longitudinal Study among Adolescents and Young Adults',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'Exploring the Impact of Artificial Intelligence on Healthcare: A Comprehensive Analysis of Adoption, Challenges, and Future Directions',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
    highlight: true,
  },

  {
    title: 'Investigating Sustainable Energy Solutions for Urban Environments: Integration of Renewable Resources and Smart Grid Technologies',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'The Influence of Cultural Factors on Consumer Behavior: A Cross-Cultural Analysis of Purchase Decisions in Global Markets',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'Enhancing Cybersecurity in the Internet of Things (IoT) Era: Challenges, Solutions, and Future Trends',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'Understanding the Role of Blockchain Technology in Supply Chain Management: Opportunities, Challenges, and Implementation Strategies',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'The Influence of Cultural Factors on Consumer Behavior: A Cross-Cultural Analysis of Purchase Decisions in Global Markets',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },

  {
    title: 'Understanding the Role of Blockchain Technology in Supply Chain Management: Opportunities, Challenges, and Implementation Strategies',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },
  
  {
    title: 'The Influence of Cultural Factors on Consumer Behavior: A Cross-Cultural Analysis of Purchase Decisions in Global Markets',
    authors: 'Franklin Mayad, Daniel De Torres, Lada Milera',
    dateUploaded: 'October 23 2023',
    datePublished: 'October 23 2023',
  },
  
];

const ArticleList = () => {
  return (
   <div>


    <div className="min-h-screen text-white p-6 ml-[300px]">
     
<div className="topcomponent fixed">
<img className="inline-block mr-2 mb-0" src="./src/assets/notification.png" alt="Notification" />
          <img className="inline-block mr-2 mb-0" src="./src/assets/docxtemplate.png" alt="Doc Template" />
</div>
  
      <header className="header justify-between items-center fixed">
        <h1 className="text-3xl font-bold mt-[20px] ml-2 ">Manuscript</h1>
        <div className="items-center space-x-2 mr-[20px] mt-[25px] ">
        
          <input
            type="text"
            className="w-[1012px] h-[59px] bg-[#222222] text-white p-7  rounded-[65px] focus:outline-none"
            placeholder="Search"
          />

            
        </div>
      </header>
      <div className="flex justify-between items-center mb-[100px]">
        <div className="relative flex items-center w-3/4">
         
         
        </div>
      </div>
      <div className="articlesScroll flex">
        <div className="w-3/4">
          {articles.map((article, index) => (
            <div
              key={index}
              className={`p-4 mb-4 cursor-pointer rounded-lg hover:bg-gradient-to-r from-[#00D160] to-[#079774]  transition duration-300 ease-in-out`}
            >
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-sm mb-2">{article.authors}</p>
              <p className="text-sm">
                <span className="font-bold">Date Uploaded:</span> {article.dateUploaded} &nbsp;&nbsp;
                <span className="font-bold">Published:</span> {article.datePublished}
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/4 fixed text-right p-4 ml-[800px] mb-[50px]">
          <p className="text-red-500 mr-[12.3px] mb-2 cursor-pointer">Any time</p>
          <p className="text-green-500 mb-2 cursor-pointer">Since 2024</p>
          <p className="text-green-500 mb-2 cursor-pointer">Since 2023</p>
          <p className="text-green-500 cursor-pointer">Since 2022</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ArticleList;
