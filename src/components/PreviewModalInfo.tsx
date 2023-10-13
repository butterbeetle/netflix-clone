import { ModalContent } from "@/model/Content";
import { genreConversionToString } from "@/util/converter";

export default function PreviewModalInfo({
  title,
  overview,
  genre_ids,
}: ModalContent & any) {
  return (
    <div className="flex gap-8 mb-10">
      <div className="text-white text-sm flex flex-col gap-2">
        <p className="text-2xl">{title}</p>
        <div className="cursor-pointer">
          <p className="text-[#777777] inline mr-1 cursor-default">장르:</p>
          {genreConversionToString(genre_ids).map((genre, index) => (
            <p key={index} className="text-white inline hover:underline">
              {`${index === genre_ids.length - 1 ? genre : genre + ","}`}
            </p>
          ))}
        </div>
        <span className="line-clamp-4">{overview}</span>
      </div>
    </div>
  );
}
