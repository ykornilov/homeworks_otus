import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {BaseController} from './base';

class MainController extends BaseController {
    public initRouter() {
        this.router.get('/', this.redirectAuthUser, this.getIndexPage);
        this.router.post('/login', this.resolveLogin);
        this.router.post('/logout', this.resolveLogout);
    };

    private redirectAuthUser(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', {session: false}, (error, isAuth) => {
            if (error) return next(error);
    
            if (isAuth) return res.redirect('/course');
    
            next();
        })(req, res, next);
    };

    private getIndexPage(req: Request, res: Response) {
        res.render('index', {title: 'My Courses'});
    };

    private resolveLogin(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', {session: false}, (error, user) => {
            if (error) return next(error);
    
            if (!user) {
                return res.status(403).render('index', {title: 'Express', message: 'Неправильный пароль'});
            }
            req.login(user, {session: false}, (error) => {
                if (error) return next(error);
                if (!process.env.SK) return next(new Error('Не указан secret key'));
    
                jwt.sign({id: user.id, login: user.login}, process.env.SK, {expiresIn: '30m'}, (error, token) => {
                    if (error) return next(error);
    
                    res.cookie('token', token, {
                        secure: true,
                        maxAge: Date.now() + 60 * 60 * 1000,
                        domain: process.env.DOMAIN,
                        httpOnly: true});
                    return res.redirect('/course');
                });
            });
        })(req, res, next);
    };

    private resolveLogout(req: Request, res: Response) {
        res.clearCookie('token');
        req.logout();
        res.redirect('/');
    };
};

export default new MainController().router;
