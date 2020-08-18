import { IContext } from '../../../@types/context';
import { Navigation } from '../../../models/navigation';

type Args = {
    id: number
};

export const deleteNavigation = (parent: undefined, {id}: Args, context: IContext): Promise<Navigation> => {
    return context.services.navigationService.deleteNavigation(id);
};
