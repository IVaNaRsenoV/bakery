export interface ILinkItem {
    id: number;
    path: string;
    content: string;
}

export interface ILinksItems {
    linkItems: ILinkItem[]
}

export const linkItems = [
    {
        id: 1,
        path: '/about-us',
        content: 'About us'
    },
    {
        id: 2,
        path: '/about-shop',
        content: 'About shop'
    },
    {
        id: 3,
        path: '/Catalog',
        content: 'Catalog'
    },
    {
        id: 4,
        path: '/login',
        content: 'Login'
    },
    {
        id: 5,
        path: '/register',
        content: 'Register'
    },
    {
        id: 6,
        path: '/logout',
        content: 'Logout'
    }
]