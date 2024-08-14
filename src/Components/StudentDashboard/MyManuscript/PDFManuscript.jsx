import React from 'react'
import Manuscripts from './Manuscript'
import PdfViewers from './PdfViewer'
import ProgressCircle from './Progress'

function PDFManuscript() {
  return (
    <div className="h-[1270px]">
 <Manuscripts/>
 <PdfViewers/>

 <div className=" absolute mt-[-1440px] ml-[1420px]">
 <ProgressCircle/>
 </div>

    </div>
  
  )
}

export default PDFManuscript