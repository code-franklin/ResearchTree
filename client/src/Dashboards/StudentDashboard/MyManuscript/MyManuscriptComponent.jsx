import React from 'react'
import Description from './Descriptions'
import PdfViewers from './PdfViewer'
import Progress from './Progress'

function MyManuscriptComponent() {
  
  return (
    <div className="h-[1270px]">
          <Description  />
{/*           <PdfViewers /> */}

    <div className=" absolute mt-[-1440px] ml-[1420px]">
          <Progress/>
    </div>

    </div>
  
  )
}

export default MyManuscriptComponent