type Props = {
  ref: React.MutableRefObject<any>;
};
export default function SlideButton({ ref }: Props) {
  return (
    <button
      onClick={() => ref.current.swiper.slidePrev()}
      className="w-[4%]  z-[2] m-0
group/chevron
group-hover/visible:bg-black/50
"
    >
      <div
        className="flex justify-center items-center text-white transition 
opacity-0
text-3xl md:text-4xl lg:text-5xl xl:text-7xl
group-hover/chevron:scale-125
group-hover/visible:opacity-100"
      >
        &#8249;
      </div>
    </button>
  );
}
