"use client";

import PreviewModal from "@/components/PreviewModal";
import { useParams } from "next/navigation";
import {
  ActorContent,
  Content,
  DetailContent,
  ModalContentVideo,
} from "@/model/Content";
import { FadeLoader } from "react-spinners";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Modal() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: videoData, isLoading: isVideoDataLoading } = useSWR<
    ModalContentVideo[]
  >(`/api/tmdb/movie/${id}/videos`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const { data: detailData, isLoading: isDetailDataLoading } =
    useSWR<DetailContent>(`/api/tmdb/movie/${id}/detail`, fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    });

  const { data: actorData, isLoading: isActorDataLoading } = useSWR<
    ActorContent[]
  >(`/api/tmdb/movie/${id}/credits`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  const { data: recommendationsData, isLoading: isRecommendationsLoading } =
    useSWR<Content[]>(`/api/tmdb/movie/${id}/recommendations`, fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    });

  const { data: similarData, isLoading: isSimilarLoading } = useSWR<Content[]>(
    `/api/tmdb/movie/${id}/similar`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const loading =
    isVideoDataLoading ||
    isDetailDataLoading ||
    isActorDataLoading ||
    isRecommendationsLoading ||
    isSimilarLoading;

  // console.log(
  //   loading,
  //   videoData,
  //   detailData,
  //   actorData,
  //   recommendationsData,
  //   similarData
  // );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.width = document.body.clientWidth - 17 + "px";
  }, []);

  const closeHandler = () => {
    router.back();
    document.body.style.width = "unset";
    document.body.style.overflow = "unset";
  };

  console.log("ID:", id, pathname, pathname.includes("movie"));

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-50  flex justify-center  overflow-y-scroll"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeHandler();
        }
      }}
    >
      {loading && (
        <div className="flex justify-center top-1/3 relative">
          <FadeLoader color="white" />
        </div>
      )}
      {!loading && (
        <PreviewModal
          onClose={() => closeHandler()}
          videoData={videoData!}
          detailData={detailData!}
          actorData={actorData!}
          recommendationsData={recommendationsData!}
          similarData={similarData!}
        />
      )}
    </div>
  );
}
