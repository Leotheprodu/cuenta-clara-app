import Link from "next/link";
import { MotionAddButtonLink } from "./MotionAddButtonLink";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
export const AddButtonLinkItem = ({ link }: AddButtonLinkItemProps) => {
  const { href, icon, title, description, delay } = link;
  const [click, setClick] = useState(false);
  if (click) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" color="primary" className="my-0 mx-auto" />
      </div>
    );
  }

  return (
    <Link onClick={() => setClick(true)} className="" href={href}>
      <MotionAddButtonLink delay={delay}>
        {icon}
        <div>
          <h2 className="text-small font-bold uppercase">{title}</h2>
          <p className="text-tiny">{description}</p>
        </div>
      </MotionAddButtonLink>
    </Link>
  );
};
