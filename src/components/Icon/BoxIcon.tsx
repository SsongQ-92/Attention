const BoxIcon = ({ ...props }) => {
  return (
    <svg width='32' height='32' viewBox='0 0 256 256' {...props}>
      <path d='M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z' />
    </svg>
  );
};

export default BoxIcon;
