import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "#2196F3",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none" }}
        >
          My Blog
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(event, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign In
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

// import React, { useState } from "react";
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
//   FavoriteBorderOutlined,
//   FavoriteOutlined,
// } from "@mui/icons-material";
// import axios from "axios";

// const Blog = ({ title, content, image, userName, isUser, id }) => {
//   const navigate = useNavigate();
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);

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

//   const handleLike = () => {
//     // Toggle the like status
//     setLiked((prevLiked) => !prevLiked);

//     // Update like count
//     setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
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
//             action={
//               <IconButton onClick={handleLike}>
//                 {liked ? (
//                   <FavoriteOutlined color="error" />
//                 ) : (
//                   <FavoriteBorderOutlined />
//                 )}
//               </IconButton>
//             }
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
//         <Box textAlign="center" mt={2}>
//           <Typography variant="caption" color="text.secondary">
//             {likeCount} {likeCount === 1 ? "like" : "likes"}
//           </Typography>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Blog;