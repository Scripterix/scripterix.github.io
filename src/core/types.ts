
export interface NavItem {
    label: string;
    href: string;
    page: string;
    icon: string;
    children?: NavItem[];
}

export interface PageItem {
    title: string;
    href: string;
    page: string;
    icon: string;
    tone: string;
    description: string;
}

export interface SiteMap {
    nav: NavItem[];
    pages: PageItem[];
}
