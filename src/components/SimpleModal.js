import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { handleOutsideElementClick } from "../functions/handleOutsideElementClick.func";
import styled from "styled-components";
import { transparentize } from "polished";
import Themed from "../functions/themed";

const SimpleModal = ({
  isOpen,
  closeAction,
  children: childRenderer,
  transitionDuration,
  onTransitionEnd,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    window.setTimeout(() => {
      onTransitionEnd();
    }, transitionDuration);
  }, [onTransitionEnd, transitionDuration]);

  useEffect(() => {
    const handleOutsideClick = (e) =>
      handleOutsideElementClick(modalRef, e, closeAction);
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, closeAction]);

  return (
    <S.Modal
      className="simple-modal"
      isOpen={isOpen}
      transitionDuration={transitionDuration}
    >
      <S.ModalOverlay className="simple-modal__overlay">
        <S.ModalContent ref={modalRef} className="simple-modal__overlay__content">
          {typeof childRenderer === "function"
            ? childRenderer(closeAction)
            : childRenderer}
        </S.ModalContent>
      </S.ModalOverlay>
    </S.Modal>
  );
};

SimpleModal.propTypes = {
  isOpen: PropTypes.bool,
  closeAction: PropTypes.func.isRequired,
  children: PropTypes.any,
  transitionDuration: PropTypes.number,
  onTransitionEnd: PropTypes.func,
};
SimpleModal.defaultProps = {
  isOpen: false,
  children: null,
  transitionDuration: 250,
  onTransitionEnd: () => false,
};

export default Themed(SimpleModal);

const S = {};

S.Modal = styled.div`
  top: ${({ isOpen }) => (isOpen ? 0 : "100%")};
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 999;
  transition: top ${(props) => props.transitionDuration}ms ease-in-out,
    opacity ${(props) => props.transitionDuration}ms ease-in-out;
`;

S.ModalOverlay = styled.div`
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.baseColor)};
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

S.ModalContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  max-width: ${(props) => props.theme.breakpoints.md};
  overflow: hidden;
  width: 500px;
  height: 500px;
  max-height: 500px;
  margin: auto;
  overflow-y: auto;
  position: relative;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: 100vh;
    max-height: 100vh;
  }
`;
