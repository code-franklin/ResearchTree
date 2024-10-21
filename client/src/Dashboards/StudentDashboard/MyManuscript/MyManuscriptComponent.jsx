import React from 'react'
import Description from './Descriptions'
import PdfViewers from './PdfViewer'
import Progresss from './Progress'
import Grading from './Grading'
function MyManuscriptComponent() {
  
  return (
    <div className="h-[1400px]">

      <div>
      </div>

    <div className=" absolute">
      <Grading  />
    </div>

<<<<<<< Updated upstream
   
    <Description  />


=======
    <div className=" absolute mt-[-1440px] ml-[1420px]">
          <Progress/>
    </div>
      <Description  />
>>>>>>> Stashed changes
    </div>
  
  )
}

export default MyManuscriptComponent