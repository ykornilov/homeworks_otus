import { IContext } from '../../../@types/context';
import { Navigation } from '../../../models/navigation';

type Args = {
    id: number;
};

export const getNavigation = (_parent: undefined, { id }: Args, context: IContext): Promise<Navigation> => {
    return context.services.navigationService.getNavigation(id);
};
