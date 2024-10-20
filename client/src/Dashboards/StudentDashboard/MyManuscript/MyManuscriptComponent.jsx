import React from 'react'
import Description from './Descriptions'
import PdfViewers from './PdfViewer'
import Progress from './Progress'
import Grading from './Grading'
function MyManuscriptComponent() {
  
  return (
    <div className="h-[1400px]">

      <div>
      
      </div>
      <div className=" absolute">
      <Grading  />
      </div>


    <div className=" absolute mt-[-1440px] ml-[1420px]">
          <Progress/>
        
    </div>
    <Description  />


    </div>
  
  )
}

export default MyManuscriptComponent