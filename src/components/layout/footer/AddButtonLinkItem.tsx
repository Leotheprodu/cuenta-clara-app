import Link from "next/link";
import { MotionAddButtonLink } from "./MotionAddButtonLink";
export const AddButtonLinkItem = ({ link }: AddButtonLinkItemProps) => {
  const {
    href,
    icon,
    title,
    description,
    delay,
    needClient_id,
    pagesIncluded,
  } = link;
  return (
    <Link className="hover:" href={href}>
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
