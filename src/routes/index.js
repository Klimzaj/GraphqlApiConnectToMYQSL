import express from 'express'
import notFoundController from '../controllers/notFoundController'
import playerController from '../controllers/playerController'
import shopController from '../controllers/shopController'

const router = express.Router()

router.get('/players',playerController.all)
router.get('/wincount/:id',playerController.winCount)
router.get('/allcount/:id',playerController.allCount)
router.get('/playersinfo',playerController.allInfo)
router.get('/idinfo/:id',playerController.idInfo)
router.post('/deleteplayer',playerController.deleteplayer)
router.get('/player/:id',playerController.get)
router.get('/islogin/:log',playerController.isLogin)
router.post('/players', playerController.create);
router.post('/play', playerController.play);

router.get('/swords', shopController.allSwords);
router.get('/shields', shopController.allShields);
router.post('/shop', shopController.create);

router.get('*',notFoundController.show)

module.exports = router;