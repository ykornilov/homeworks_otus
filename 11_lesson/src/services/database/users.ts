import bcrypt from 'bcryptjs';
import UserModel, {IUser} from './models/users';

class UsersService {
    addUser(login: IUser['login'], hash: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            const newUser = new UserModel({login, password: hash});

            newUser.save((error, user) => {
                if (error) return reject(error);

                resolve(user);
            });
        });
    };

    getUser(login: IUser['login'], password: IUser['password']): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({login})
                .then(user => {
                    if (!user) {
                        bcrypt.hash(password, 8, (error, hash) => {
                            if (error) return reject(error);

                            this.addUser(login, hash)
                                .then(resolve)
                                .catch(reject);
                        });
                    } else {
                        bcrypt.compare(password, user.password, (error, isEquals) => {
                            if (error) return reject(error);

                            if (!isEquals) return resolve(null);

                            resolve(user);
                        });
                    }
                })
                .catch(reject);
        });
    };
};

export default new UsersService();

