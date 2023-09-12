import { BsChevronDown } from "react-icons/bs";
interface Props {
  className?: string;
}
export default function ChevronDownIcon({ className }: Props) {
  return <BsChevronDown className={className} />;
}
