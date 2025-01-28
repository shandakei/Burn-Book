const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

const authRouter = require('./routes/auth_router');
const errorHandler = require('./middlewares/error_handler');
const userRouter = require('./routes/user_router');
const expressListRoutes = require('express-list-routes');

app.use(express.json());

app.use(authRouter);
app.use(errorHandler);
app.use(userRouter);

expressListRoutes(app);

app.listen(port, () => {
  console.log('server listening on port', port);
});
