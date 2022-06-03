import { Router } from 'express'
import { ClientController } from '../controllers'

const router = Router()

router.get('/', async (_, res) => {
  const clients = await ClientController.getAllClients()

  res.render('clients', {
    title: 'Clients',
    clients: clients
  })
})

router.get('/nuevo', (_, res) => {
  res.render('create_client', {
    title: 'Create Client'
  })
})

router.post('/new', async (req, res) => {
  const response = await ClientController.createNewUser({name: req.body.name, email: req.body.email, direction: req.body.direction, phone: req.body.phone})

  if (response) {
    res.redirect('/clientes')
  } else {
    res.redirect('/clientes/nuevo')
  }
})

router.get('/editar', async (req, res) => {
  const {id} = req.query
  const response = await ClientController.getClientById(String(id))

  res.render('edit_client', {
    title: 'Edit Client',
    client: response
  })
})

router.post('/change', async (req, res) => {
  const {id, name, email, direction, phone} = req.body

  const response = await ClientController.updateClient(String(id), {name, email, direction, phone})

  if (response) {
    res.redirect('/clientes')
  } else {
    res.redirect('/clientes/editar?id=' + id)
  }
})

router.get('/eliminar', async (req, res) => {
  const { id } = req.query

  await ClientController.deleteClient(String(id))

  res.redirect('/clientes')
})

export default router;
