import { Button, ButtonGroup, IconButton } from "@mui/material";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import {
  deleteCommentLike,
  deletePostLike,
  postCommentLike,
  postPostLike,
} from "../libs/fetcher";
import {
  Favorite as LikedIcon,
  FavoriteBorder as LikeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ item, comment }) => {
  const auth = useApp();
  const navigate = useNavigate();
  const isLiked = () => {
    if (!auth) return false;
    if (!item.likes) return false;
    return item.likes.find((like) => like.userId == auth.id);
  };

  const likePost = useMutation((id) => postPostLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("posts");
      queryClient.refetchQueries("comments");
    },
  });

  const unLikePost = useMutation((id) => deletePostLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("posts");
      queryClient.refetchQueries("comments");
    },
  });

  const likeComment = useMutation((id) => postCommentLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

  const unLikeComment = useMutation((id) => deleteCommentLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });
  return (
    <ButtonGroup>
      {isLiked() ? (
        <IconButton
          size="small"
          onClick={(e) => {
            comment
              ? unLikeComment.mutate(item.id)
              : unLikePost.mutate(item.id);
            e.stopPropagation();
          }}
        >
          <LikedIcon fontSize="small" color="error" />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          onClick={(e) => {
            comment ? likeComment.mutate(item.id) : likePost.mutate(item.id);
            e.stopPropagation();
          }}
        >
          <LikeIcon fontSize="small" color="error" />
        </IconButton>
      )}
      <Button
        onClick={(e) => {
          if (comment) {
            navigate(`/likes/${item.id}/comment`);
          } else {
            navigate(`/likes/${item.id}/post`);
          }
          e.stopPropagation();
        }}
        sx={{ color: "text.fade" }}
        variant="text"
        size="small"
      >
        {item.likes ? item.likes.length : 0}
      </Button>
    </ButtonGroup>
  );
};

export default LikeButton;
