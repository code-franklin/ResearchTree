import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/sidebar";
import Chart from "./Components/Charts/Chart";
import Header from "./Components/Header/Header";

import ExploreManuscript from './Components/SearchingManuscript/ArticleList'

function App() {
  const [selectedItem, setSelectedItem] = useState('Home');

  const renderContent = () => {
    switch (selectedItem) {
      case 'ViewAnalytics':
        return (
          <div className="hero">
             <Header/>
           <Chart/>
          
          </div>
        );
      case 'MyManuscript':
        return <div>
        
        </div>;

      case 'ExploreManuscript':
        return <div>
        <ExploreManuscript />
        </div>;

      case 'ProfileSettings':
        return <div>

        </div>;

      case 'Logout':
        return <div>

        </div>;

      default:
        return <div><h1 className="text-2xl font-bold">Home</h1><p>Welcome to the Home page!</p></div>;
    }
  };

  

  return (
    
    <div className="flex">
      
      <Sidebar onSelect={setSelectedItem} />
      
      <div className="flex-1 p-8">
        
        {renderContent()}
      </div>
    </div>
  );

}


export default App;
