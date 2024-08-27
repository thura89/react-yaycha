import { Button } from "@mui/material";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import { deleteFollow, postFollow } from "../libs/fetcher";

const FollowButton = ({ user }) => {
  const { auth } = useApp();

  const follow = useMutation(
    (id) => {
      return postFollow(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("users");
        await queryClient.refetchQueries("user");
        await queryClient.refetchQueries("search");
      },
    }
  );
  const unfollow = useMutation((id) => deleteFollow(id), {
    onSuccess: async () => {
      await queryClient.refetchQueries("users");
      await queryClient.refetchQueries("user");
      await queryClient.refetchQueries("search");
    },
  });

  const isfollowing = () => {
    if (!auth) return false;
    return user.following.find((item) => item.followerId == auth.id);
  };

  return auth.id == user.id ? (
    <></>
  ) : (
    <Button
      size="small"
      edge="end"
      variant={isfollowing() ? "outlined" : "contained"}
      sx={{ borderRadius: 5 }}
      onClick={(e) => {
        if (isfollowing()) {
          unfollow.mutate(user.id);
        } else {
          follow.mutate(user.id);
        }
        e.stopPropagation();
      }}
    >
      {isfollowing() ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
