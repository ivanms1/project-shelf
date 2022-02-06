import { styled } from "stitches/stitches.config";

import ImageIcon from "@/assets/icons/image.svg";

export const Container = styled("div", {});

export const ButtonsContainer = styled("div", {
  display: "flex",
  paddingHorizontal: 30,
  paddingTop: 25,
  paddingBottom: 25,
  justifyContent: "space-between",
  top: 0,
  width: "100%",
  position: "sticky",

  "@desktop": {
    paddingBottom: 0,
  },
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@desktop": {
    paddingHorizontal: 410,
  },

  "& > h1": {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 16,
    textAlign: "center",
  },
  "& > p": {
    marginBottom: 40,
    textAlign: "center",
    color: "#6e6d7a",
  },
});

export const TitleInput = styled("input", {
  fontSize: 24,
  paddingHorizontal: 70,
  paddingVertical: 40,
  width: "100%",
  fontWeight: 600,

  "&:focus": {
    outline: "none",
  },
});

export const DescriptionInput = styled("textarea", {
  fontSize: 20,
  paddingHorizontal: 35,
  paddingVertical: 40,
  height: "100%",
  width: "calc(100% - 70px)",
  "&:focus": {
    outline: "none",
  },
});

export const StyledImageIcon = styled(ImageIcon, {
  width: 80,
});

export const UploadContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "@desktop": {
    padding: 60,
    height: "100%",
  },
});
