import { IContext } from '../../../@types/context';
import { Navigation } from '../../../models/navigation';

export const getAllNavigations = (_parent: undefined, _args: undefined, context: IContext): Promise<Navigation[]> => {
    return context.services.navigationService.getAllNavigations();
};
