import { css, styled } from "@/stitches/stitches.config";

export const StyledHome = styled("div", {});

export const StyledSignInBox = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column-reverse",
  backgroundColor: "#F9F8FD",
  justifyContent: "space-between",
  padding: 26,

  "@desktop": {
    flexDirection: "row",
    padding: "50px 100px",
  },
});

export const StyledContentBox = styled("div", {
  "@desktop": {
    width: "40%",
  },
  "& > h1": {
    fontSize: 45,
    marginBottom: 30,
  },

  "& > p": {
    marginBottom: 30,
  },
});

export const GridContainer = styled("div", {
  "@desktop": {
    padding: "40px 100px",
  },
});

export const searchButtonStyles = css({
  marginRight: 15,
});
