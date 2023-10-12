import { BiSolidChevronDown } from "react-icons/bi";
interface Props {
  className?: string;
}
export default function ChevronDownIcon({ className }: Props) {
  return <BiSolidChevronDown className={className} />;
}
