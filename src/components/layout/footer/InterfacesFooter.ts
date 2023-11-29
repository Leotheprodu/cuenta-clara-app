interface LinkItemFooter {
  href: string;
  icon: JSX.Element;
  text: string;
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
