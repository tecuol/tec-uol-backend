// import { NextFunction, Request, Response } from "express";

// import { User } from "../models/user.model";

// class AuthMiddleware {
//   public static selfInstance: AuthMiddleware = null;

//   public static getInstance() {
//     if (AuthMiddleware.selfInstance) {
//       return AuthMiddleware.selfInstance;
//     }
//     this.selfInstance = new AuthMiddleware();
//     return AuthMiddleware.selfInstance;
//   }

//   public VerifyUser(req: Request, res: Response, next: NextFunction) {
//     let token = req.headers["authorization"].toString().split(" ")[1];
//     if (!token) {
//       return res.status(403).send({
//         message: "No token provided!"
//       });
//     }

  //   firebaseAdmin.auth().verifyIdToken(token).then(async (decodedToken) => {
  //     let user = await User.findOne({
  //       where: {
  //         firebaseUID: decodedToken.uid
  //       }
  //     });
  //     if(user.authToken !== token) {
  //       return res.status(401).send({
  //         message: "Unauthorized!"
  //       });
  //     }
  //     req.user = JSON.parse(JSON.stringify(user))
  //     next();
  //   }).catch((err) => {
  //     console.log(err)
  //     return res.status(401).send({
  //       message: "Unauthorized!"
  //     });
  //   })
  // }

  // public VerifyAdmin(req: Request, res: Response, next: NextFunction) {
  //   if (req.isAuthenticated())
  //       return next();

  //   // if they aren't redirect them to the home page
  //   res.redirect('/signin');
  // }

  // public isLoggedIn(req: Request, res: Response, next: NextFunction) {
  //   if (!req.isAuthenticated())
  //       return next();

  //   // if they aren't redirect them to the home page
  //   res.redirect('/');
  // }
// }
// export default AuthMiddleware.getInstance();
