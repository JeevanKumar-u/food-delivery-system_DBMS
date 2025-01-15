import { Router } from 'express';
const router = Router();
import sequelize from '../config/database.js'; // Adjust path as per your setup

// Generic route to execute stored procedures
router.post('/:procedureName', async (req, res) => {
  console.log(`Request received for procedure: ${req.params.procedureName}`);
  const { procedureName } = req.params;

  try {
    const [results] = await sequelize.query(`CALL ${procedureName}();`);
    res.status(200).json({
      message: `${procedureName} executed successfully.`,
      data: results,
    });
  } catch (error) {
    console.error(`Error executing ${procedureName}:`, error);
    res.status(500).json({ message: `Failed to execute ${procedureName}.`, error: error.message });
  }
});

export default router;
