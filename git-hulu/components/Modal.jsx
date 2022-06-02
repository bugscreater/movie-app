import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import YouTube from "react-youtube";
import Carousel from "./Carousel/CarouselComponent";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:"50%",
  bgcolor: "black",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  
  '@media (max-width: 700px)': {
    width:"100%",
   
  },
 
};

export default function BasicModal({ movie_img, movie_name, movie_overview,is_open,trailer_id,playTrailer,media_type,movie_id,modal_close}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
 
  const handleClose = () => {
    setOpen(false);
   
    modal_close();
  }
  
 
 
  
  React.useEffect(()=>{
     setOpen(is_open);
    
  },[is_open,playTrailer])

  const render_trailer = () => {
    
    return (
      <YouTube
      videoId={trailer_id}
      opts={{
      width: '100%',
      height: '500',
      playerVars: {
        autoplay: 1,
      },
    }}
    className = "flex flex-row justify-center items-center "
    
   />
    )
  }

  
   
  return (
    <div>
      
      
     
      <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
           
             {trailer_id && playTrailer ? render_trailer() : <Carousel media_type = {media_type}  movie_id = {movie_id}/>}
            

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
