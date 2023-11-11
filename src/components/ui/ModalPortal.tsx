import React, { useEffect, useState } from "react";
import reactDom from "react-dom";
type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("portal"));
  }, [element]);

  if (element) return reactDom.createPortal(children, element);

  return null;
}
