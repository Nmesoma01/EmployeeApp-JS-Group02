import express from 'express';
import DepartmentController from '../controllers/DepartmentController';

const router = express.Router();

router.get('/', DepartmentController.getDepartments);
router.get('/:id', DepartmentController.getDepartmentById);
router.post('/', DepartmentController.createDepartment);

export default router;
