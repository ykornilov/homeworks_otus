import { IContext } from '../../../@types/context';
import { Navigation } from '../../../models/navigation';

type Args = {
    navigation: string;
};

export const addNavigation = (parent: undefined, {navigation}: Args, context: IContext): Promise<Navigation> => {
    return context.services.navigationService.addNavigation(navigation);
};
