import { BsChevronLeft } from "react-icons/bs";

interface Props {
  size?: number;
}

export default function ChevronLeftIcon({ size }: Props) {
  return <BsChevronLeft size={size} />;
}
