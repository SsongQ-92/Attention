const TextIcon = ({ ...props }) => {
  return (
    <svg width='32' height='32' viewBox='0 0 256 256' {...props}>
      <path d='M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z' />
    </svg>
  );
};

export default TextIcon;
