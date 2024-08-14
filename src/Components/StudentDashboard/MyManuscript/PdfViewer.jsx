import { Fullscreen } from "@mui/icons-material";
import { PageMode } from "@react-pdf-viewer/core";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";


// Create styles
const styles = StyleSheet.create({
  
  
  document: {
    backgroundColor: "red",
    
  },

  page: {
    backgroundColor: "black",
    color: "white",
    
  },

 
  section: {
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
  viewer: {
    width: window.innerWidth / 1.50, //the pdf viewer will take up all of the width and height
    height: "100%",
    marginLeft: "455px",
    paddingTop: "430px",
    
  },
});

// Create Document Component
function PdfViewer() {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document file="">
      <Page size="A4">
    <Text
      style={styles.text}
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
      fixed
    />
  </Page>
  <Page>
    <Text> The rapid advancement of technology has fundamentally altered the way we live, work, and interact with the world around us. From the early days of the internet to the current era of artificial intelligence and automation, the pace of change has been relentless. The integration of technology into everyday life has brought about significant improvements in efficiency and convenience. However, it has also raised important questions about privacy, security, and the potential impact on employment. As we continue to innovate and push the boundaries of what is possible, it is crucial to consider the ethical implications and ensure that these advancements benefit society as a whole.

One of the most notable changes in recent years has been the rise of social media platforms. These platforms have revolutionized the way we communicate, allowing people to connect with others around the globe instantly. Social media has provided a voice to individuals who may have otherwise been unheard and has facilitated the spread of information at an unprecedented rate. However, it has also contributed to the spread of misinformation and has raised concerns about the impact on mental health. The challenge lies in finding a balance between the positive aspects of social media and mitigating its negative effects.

The proliferation of smartphones has alsant strides. Telemedicine and digital health records have improved access to</Text>
  </Page>
  <Page>
    <Text> Hello, second page!</Text>
  </Page>
      </Document>
    </PDFViewer>
  );
}

export default PdfViewer;