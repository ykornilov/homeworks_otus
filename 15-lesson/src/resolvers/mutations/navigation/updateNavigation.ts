import { IContext } from '../../../@types/context';
import { Navigation } from '../../../models/navigation';

type Args = {
    id: number
    navigation: string;
};

export const updateNavigation = (parent: undefined, {id, navigation}: Args, context: IContext): Promise<Navigation> => {
    return context.services.navigationService.updateNavigation(id, navigation);
};
