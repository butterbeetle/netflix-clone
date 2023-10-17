import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";

type Props = {
  isPlaying: boolean;
};
export default function PlayPause({ isPlaying }: Props) {
  if (isPlaying) return <PauseIcon />;
  else return <PlayIcon />;
}
