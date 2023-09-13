import { AiOutlineInfoCircle } from "react-icons/ai";
interface Props {
  className: string;
}
export default function InfoCircleIcon({ className }: Props) {
  return <AiOutlineInfoCircle className={className} />;
}
