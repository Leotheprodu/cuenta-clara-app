import Link from "next/link";
import { MotionAddButtonLink } from "./MotionAddButtonLink";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
export const AddButtonLinkItem = ({ link }: AddButtonLinkItemProps) => {
  const { href, icon, title, description, delay } = link;
  const [click, setClick] = useState(false);
  if (click) {
    return (
      <div className="flex items-center justify-center mx-1 my-2">
        <Spinner
          size="lg"
          color="primary"
          className="my-0 mx-auto text-center text-xs"
          label={`...${title}`}
          labelColor="primary"
        />
      </div>
    );
  }

  return (
    <Link onClick={() => setClick(true)} className="" href={href}>
      <MotionAddButtonLink delay={delay}>
        <div className="flex items-center mx-1 my-2 gap-2 hover:bg-secundario/5 duration-300 ease-in">
          <div className="text-terciario">{icon}</div>
          <div>
            <h2 className="text-small font-bold uppercase text-primario">
              {title}
            </h2>
            <p className="text-tiny text-secundario">{description}</p>
          </div>
        </div>
      </MotionAddButtonLink>
    </Link>
  );
};
