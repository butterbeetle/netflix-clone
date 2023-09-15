import { BsChevronRight } from "react-icons/bs";

interface Props {
  size?: number;
}

export default function ChevronLeftIcon({ size }: Props) {
  return <BsChevronRight size={size} />;
}
