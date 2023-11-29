interface LinkItemFooter {
  href: string;
  icon: JSX.Element;
  text: string;
}

interface LinkItemFooterProps {
  link: LinkItemFooter;
  path: string;
  textColor?: string;
  flexType?: string;
  size?: "xs" | "sm" | "md" | "lg";
  component?: string;
}

interface AddButtonLinkItemProps {
  link: {
    href: string;
    icon: JSX.Element;
    title: string;
    description: string;
    delay: number;
  };
}

interface AddButtonPopoverTriggerProps {
  handle: {
    handlePopoverTriggerClick: () => void;
  };
}
