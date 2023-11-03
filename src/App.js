import Header from "./components/Header/Header";
import Albums from "./components/Albums/Albums";
import { useEffect, useState } from "react";
import AlbumContent from "./components/AlbumContent/AlbumContent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [content, setContent] = useState();
 
useEffect(()=>{
  setContent(<Albums setContent={setContent} bool={false}/>)
},[])



  return (
   <>
      <Header />
      <div className="container">
        <ToastContainer />
          {content}
      </div>
   </>
  );
}
export default App;
