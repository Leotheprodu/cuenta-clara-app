interface LinkItemFooter {
  href: string;
  icon: JSX.Element;
  text: string;
  exclude: string[];
  isLoggedInRequired: boolean;
  page: string;
}

interface AddButtonLinkItemProps {
  link: {
    href: string;
    icon: JSX.Element;
    title: string;
    description: string;
    needClient_id: boolean;
    pagesIncluded: string[];
    delay: number;
  };
}

interface AddButtonPopoverTriggerProps {
  handle: {
    handlePopoverTriggerClick: () => void;
    isOpen: boolean;
  };
}
