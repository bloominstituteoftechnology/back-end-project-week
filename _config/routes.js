const noteRoutes = require('../note/noteRouter')
 const userRoutes = require('../user/userRouter');
 const jwt = require('jsonwebtoken');
 const wala = require('../wala');

 const secret = wala.secret;

 function restricted(req, res, next) {
        const token = req.headers.authorization;
    
        if (token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                
                if (err) {
                    return res
                        .status(401)
                        .json({ message: 'Haha! Unauthorized!' });
                }
                console.log("Restricted");
                next();
            });
        } else {
            res.status(401).json({ message: 'You need some token, my Friend!' });
        }
    }


module.exports = function(server) {
  server.get('/', (req, res) => {
    res.send({ api: 'running' })
  })

  server.use('/api/notes', restricted);
  server.use('/api/notes', noteRoutes);
  server.use('/api/users', userRoutes);

}


// const noteRoutes = require('../note/noteRouter')
//  const userRoutes = require('../user/userRouter');
//  const jwt = require('jsonwebtoken');
//  const wala = require('../wala');

//  const secret = wala.secret;

//  function restricted(req, res, next) {
//         const token = req.headers.authorization;
//         console.log("Token", token );
    
//         if (token) {
//             // jwt.verify(token, secret, (err, clearedToken) => {
                
//             //     if (err) {
//             //         return res
//             //             .status(401)
//             //             .json({ message: 'Haha! Unauthorized!' });
//             //     }
//             //     console.log("Restricted");
//             //     // next();
//             // });
//             const result = jwt.verify(token, secret, function(err, decodedToken) {
//                 if (err) {
//                   console.log("@verifyToken - Error:",err);
//                   return false;
//                 }
//                 return decodedToken;
//               });
//               if(result) {
//                 req.plainToken = result;
//                 next();
                
//               } else {
//                 return res.status(401).json({ message: 'Haha! Unauthorized!' });
//               }
//         } else {
//             res.status(401).json({ message: 'You need some token, my Friend!' });
//         }
//     }


//     // const verifyToken = token => {
//     //     return jwt.verify(token, SECRET, function(err, decodedToken) {
//     //       if (err) {
//     //         console.log("@verifyToken - Error:",err);
//     //         return false;
//     //       }
//     //       return decodedToken;
//     //     });
//     //   };
      
//     //   const checkAuth = (req, res, next) => {
//     //     const token = req.headers.authorization;
//     //     // console.log('checkAuth token:',token);
//     //     const isTokenValid = verifyToken(token);
//     //     // ***
//     //     if (token && isTokenValid) {
//     //       req.plainToken = isTokenValid;
//     //       next();
//     //     } else {
//     //       res.status(401).json({ "error": "401 Unauthorized\nAuthentication token is missing or invalid." });
//     //     }
//     //   };



// module.exports = function(server) {
//   server.get('/', (req, res) => {
//     res.send({ api: 'running' })
//   })

//   server.use('/api/notes', restricted);
//   server.use('/api/notes', noteRoutes);
//   server.use('/api/users', userRoutes);

// }