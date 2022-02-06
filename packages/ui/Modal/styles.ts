import Modal from "react-modal";

import { css, styled } from "../stitches.config";

Modal.setAppElement("#__next");

export const StyledModal = styled(Modal, {});

export const overlay = css({
  backgroundColor: "$modalOverlayBg",
  bottom: 0,
  left: 0,
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: "$modalOverlayIndex",

  "& :global(.ReactModal__Overlay)": {
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },

  "& :global(.ReactModal__Overlay--after-open)": {
    opacity: 1,
  },

  "& :global(.ReactModal__Overlay--before-close)": {
    opacity: 0,
  },
});

export const modal = css({
  backgroundColor: "#fff",
  border: "none",
  borderRadius: 15,
  left: "50%",
  maxHeight: "calc(100vh - 100px)",
  outline: 0,

  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  transition: "all 0.5s ease-in-out",
  padding: "1rem",

  "&:focus": {
    outline: 0,
  },
});
