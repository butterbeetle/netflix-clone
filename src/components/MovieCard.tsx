import Image from "next/image";
import PlayIcon from "./ui/icons/PlayIcon";
import { nowplayingMovie } from "@/model/movie";
import { tmdbImageURL } from "@/service/tmdb";

interface Props {
  movie: nowplayingMovie;
}
export default function MovieCard({ movie }: Props) {
  return (
    <div className=" group bg-zinc-900 top-0 left-0 h-full">
      <Image
        className="object-cover cursor-pointer transition duration shadow-md rounded-md h-full"
        src={`${tmdbImageURL}/${movie.backdrop_path}`}
        alt="thumbnail"
        width={300}
        height={300}
      />
      {/* <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible
      delay-300 w-full scale-0 
      group-hover:scale-110 group-hover:-translate-y-[6vw]
      group-hover:translate-x-[2vw] group-hover:opacity-100
      "
      >
        <Image
          className="
          cursor-pointer
          object-cover
          transition duration shadow-xl rounded-t-md 
          w-full h-[12vw]
        "
          src={`${tmdbImageURL}/${movie.backdrop_path}`}
          alt="thumbnail"
          width={200}
          height={200}
        />
        <div
          className="
          z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md
        "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex
            justify-center items-center transition hover:bg-neutral-300
            "
            >
              <PlayIcon size={20} />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{movie.genre}</p>
          </div>
        </div>
  </div>*/}
    </div>
  );
}
