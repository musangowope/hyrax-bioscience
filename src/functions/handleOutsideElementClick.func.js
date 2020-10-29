export const handleOutsideElementClick = (
  targetRef = null,
  e = null,
  cb = () => false,
) => {
  if (
    targetRef &&
    targetRef.current &&
    !targetRef.current.contains(e.target)
  ) {
    return cb();
  }

  return false;
};
