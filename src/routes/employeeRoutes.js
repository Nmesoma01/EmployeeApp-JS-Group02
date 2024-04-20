import express from 'express';
import EmployeeController from '../controllers/EmployeeController';

const router = express.Router();

router.get('/', EmployeeController.getEmployees);
router.get('/:id', EmployeeController.getEmployeeById);
router.post('/', EmployeeController.createEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);
router.get('/:id/report', EmployeeController.getReport);
router.post('/:id/report', EmployeeController.createReport);

export default router;
