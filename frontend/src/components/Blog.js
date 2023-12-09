// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   Avatar,
//   CardContent,
//   CardHeader,
//   Typography,
//   CardMedia,
//   Box,
//   IconButton,
// } from "@mui/material";
// import {
//   DeleteForeverOutlined,
//   ModeEditOutlineOutlined,
// } from "@mui/icons-material";
// import axios from "axios";

// const Blog = ({ title, content, image, userName, isUser, id }) => {
//   const navigate = useNavigate();
//   const handleEdit = (event) => {
//     navigate(`/myBlogs/${id}`);
//   };

//   const deleteRequest = async () => {
//     const res = await axios
//       .delete(`http://localhost:8000/api/blog/${id}`)
//       .catch((err) => console.log(err));

//     const data = res.data;
//     return data;
//   };

//   const handleDelete = () => {
//     deleteRequest().then(() => navigate("/"));
//   };

//   return (
//     <div>
//       <Card
//         sx={{
//           width: "100%",
//           margin: "auto",
//           marginTop: 2,
//           padding: 2,
//           boxShadow: "5px 5px 10px #ccc",
//           ":hover": { boxShadow: "10px 10px 20px #ccc" },
//         }}
//       >
//         {isUser && (
//           <Box display={"flex"}>
//             <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
//               <ModeEditOutlineOutlined color="info" />
//             </IconButton>
//             <IconButton onClick={handleDelete}>
//               <DeleteForeverOutlined color="error" />
//             </IconButton>
//           </Box>
//         )}
//         <CardHeader
//           avatar={
//             <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
//               {userName && userName.charAt(0)}
//             </Avatar>
//           }
//           title={title}
//           subheader=""
//         />
//         <CardMedia
//           component="img"
//           height="100%"
//           width = "100%"
//           image={image}
//           alt="Paella dish"
//         />
//         <CardContent>
//           <hr />
//           <br />
//           <Typography variant="body2" color="text.secondary">
//             <b>{userName}</b> {": "}
//             {content}
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Blog;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   Avatar,
//   CardContent,
//   CardHeader,
//   Typography,
//   CardMedia,
//   Box,
//   IconButton,
// } from "@mui/material";
// import {
//   DeleteForeverOutlined,
//   ModeEditOutlineOutlined,
// } from "@mui/icons-material";
// import axios from "axios";

// const Blog = ({ title, content, image, userName, isUser, id }) => {
//   const navigate = useNavigate();
//   const handleEdit = () => {
//     navigate(`/myBlogs/${id}`);
//   };

//   const deleteRequest = async () => {
//     const res = await axios.delete(`http://localhost:8000/api/blog/${id}`).catch((err) => console.log(err));
//     const data = res.data;
//     return data;
//   };

//   const handleDelete = () => {
//     deleteRequest().then(() => navigate("/"));
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//       {/* Add a container with styling */}
//       <div style={{ maxWidth: "600px", width: "100%" }}>
//         <Card
//           sx={{
//             width: "100%",
//             padding: 2,
//             boxShadow: "5px 5px 10px #ccc",
//             ":hover": { boxShadow: "10px 10px 20px #ccc" },
//           }}
//         >
//           {isUser && (
//             <Box display={"flex"}>
//               <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
//                 <ModeEditOutlineOutlined color="info" />
//               </IconButton>
//               <IconButton onClick={handleDelete}>
//                 <DeleteForeverOutlined color="error" />
//               </IconButton>
//             </Box>
//           )}
//           <CardHeader
//             avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe">{userName && userName.charAt(0)}</Avatar>}
//             title={title}
//             subheader=""
//           />
//           <CardMedia component="img" height="100%" width="100%" image={image} alt="Blog" />
//           <CardContent>
//             <hr />
//             <br />
//             <Typography variant="body2" color="text.secondary">
//               <b>{userName}</b> {": "}
//               {content}
//             </Typography>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:8000/api/blog/${id}`).catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  const handleLike = () => {
    // Toggle the like status
    setLiked((prevLiked) => !prevLiked);

    // Update like count
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <Card
          sx={{
            width: "100%",
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
          }}
        >
          {isUser && (
            <Box display={"flex"}>
              <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                <ModeEditOutlineOutlined color="info" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteForeverOutlined color="error" />
              </IconButton>
            </Box>
          )}
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe">{userName && userName.charAt(0)}</Avatar>}
            title={title}
            subheader=""
            action={
              <IconButton onClick={handleLike}>
                {liked ? (
                  <FavoriteOutlined color="error" />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            }
          />
          <CardMedia component="img" height="100%" width="100%" image={image} alt="Blog" />
          <CardContent>
            <hr />
            <br />
            <Typography variant="body2" color="text.secondary">
              <b>{userName}</b> {": "}
              {content}
            </Typography>
          </CardContent>
        </Card>
        <Box textAlign="center" mt={2}>
          <Typography variant="caption" color="text.secondary">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Blog;
