import { Menu as MuiMenu } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export const styled = makeStyles({
  menu__header: {
    backgroundColor: "#F6F8FA",
    padding: 8,
    paddingLeft: 16,
    fontWeight: 700,
    color: "#24292E"
  },
  menu__item: {
    display: "grid",
    gridTemplateColumns: "30px 1fr",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderTop: "1px solid #E3E5E8",
    fontSize: "inherit",
    "&:hover": {
      backgroundColor: "#F6F8FA"
    }
  },
  item__text: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "-apple-system, Helvetica Neue, sans-serif",
    fontWeight: props => (props.choose ? 600 : "inherit")
  },
  "item__color-box": {
    display: "inline-block",
    height: 16,
    width: 16,
    marginRight: 8,
    borderRadius: 2,
    backgroundColor: props => props.color
  }
});

const Menu = withStyles(() => ({
  paper: {
    margin: 0,
    padding: 0,
    minWidth: 300,
    maxHeight: 500,
    fontSize: 12
  },
  list: {
    padding: 0,
    border: "1px solid #D1D5DA"
  }
}))(MuiMenu);

export default Menu;
