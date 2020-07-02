type Navigation = {
    id: number,
    name: string,
    url: string,
    icon?: string,
};

type CreateNavigationDto = {
    name: string,
    url: string,
    icon?: string,
};

type UpdateNavigationDto = {
    name?: string,
    url?: string,
    icon?: string,
};
