import express from 'express';
import cors from 'cors';
import db from './persistance/Database';
import employeeRoutes from './routes/employeeRoutes';
import departmentRoutes from './routes/departmentRoutes';
import managerRoutes from './routes/managerRoutes';

const app = express();
const port = 8080;

db.connect();
app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/manager', managerRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
