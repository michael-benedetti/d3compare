import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const StyledMenuItem = withStyles(theme => ({
  root: {
    height: "50px",
    fontFamily: "exocet-blizzard-light",
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default StyledMenuItem