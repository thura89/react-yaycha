import { ChatBubbleOutline as CommentIcon } from "@mui/icons-material";
import { Button, ButtonGroup, IconButton } from "@mui/material";

const CommentButton = ({ item, comment }) => {
  return (
    <>
      {!comment && (
        <ButtonGroup sx={{ ml: 3 }}>
          <IconButton size="small">
            <CommentIcon size="small" color="info" />
          </IconButton>
          <Button sx={{ color: "text.fade" }} size="small" variant="text">
            {item.comments.length}
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default CommentButton;
