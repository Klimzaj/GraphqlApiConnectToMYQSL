import express from 'express'
import notFoundController from '../controllers/notFoundController'
import playerController from '../controllers/playerController'
import shopController from '../controllers/shopController'

const router = express.Router()

router.get('/players',playerController.all)
router.get('/player/:id',playerController.get)
router.get('/islogin/:log',playerController.isLogin)
router.post('/players', playerController.create);

router.get('/swords', shopController.allSwords);
router.get('/shields', shopController.allShields);

router.get('*',notFoundController.show)

module.exports = router;