const express = require('express')
const authCheck = require('../middleware/auth-check');
const Job = require('../models/Job');

const router = new express.Router()

function validateJobForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.salary = parseInt(payload.salary);
  payload.telephone = parseInt(payload.telephone);

  if (!payload || typeof payload.company !== 'string' || payload.company.length < 3) {
    isFormValid = false
    errors.company = 'Company must be more than 3 symbols.'
  }

  if (!payload || typeof payload.position !== 'string' || payload.position.length < 2) {
    isFormValid = false
    errors.position = 'Position must be more than 2 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10) {
    isFormValid = false
    errors.description = 'Description must be more than 10 symbols.'
  }

  if (!payload || !payload.salary || payload.salary < 0) {
    isFormValid = false
    errors.salary = 'Salary must be a positive number.'
  }
  
  if (!payload || !payload.telephone || payload.telephone.telephone < 6) {
    isFormValid = false
    errors.telephone = 'Telephone must be more than 6 symbolen.'
  }

  if (!payload || typeof payload.image !== 'string' || payload.image.length === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const job = req.body
  job.creator = req.user._id
  const validationResult = validateJobForm(job)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Job.create(job)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Job added successfully.',
        job
      })
    })
})

router.get('/all', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const search = req.query.search

  Job.find({})
    .then((job) => {
      return res.status(200).json(job)
    })
})

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  Job.findById(id)
    .then((job) => {
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        company: job.company,
        position: job.position,
        description: job.description,
        salary: job.salary,
        image: job.image,
        telephone: job.telephone,
        email: job.email,
        category: job.category,
      }

      if (job.material) {
        response.material = job.material
      }

      res.status(200).json(response)
    })
})


router.get('/user', authCheck, (req, res) => {
  const user = req.user._id

  Job.find({creator: user})
    .then((job) => {
      return res.status(200).json(job)
    })
})

router.get('/category/:category', (req, res) => {
  const category = req.Job.category

  Job.find({category: category})
    .then((job) => {
      return res.status(200).json(job)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  const user = req.user._id

  Job.findById(id)
    .then((job) => {
      if (!job) {
        return res.status(200).json({
          success: false,
          message: 'job does not exists!'
        })
      }

      if ((job.creator.toString() != user && !req.user.roles.includes("Admin"))) {
         return res.status(401).json({
           success: false,
           message: 'Unauthorized!'
         })
      }

      Job.findByIdAndDelete(id)
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Job deleted successfully!'
          })
        })
    })
})

router.put('/edit/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const job = req.body;

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job does not exists!'
    })
  }

  if (!req.user.roles.includes('Admin')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized!'
    })
  }

  const validationResult = validateJobForm(job)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  Job.findByIdAndUpdate(id, job)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Job edited successfully!'
      })
  })
})

router.get('/:id', authCheck, (req, res) => {
  const id = req.params.id

  Job.findById(id)
    .then(job => {
      if (!job) {
        return res.status(404).json({
          success: false,
          message: 'Entry does not exists!'
        })
      }

      let response = {
        id,
        company: job.company,
        position: job.position,
        salary: job.salary,
        description: job.description,
        image: job.image,
        telephone: job.telephone,
        email: job.email,
        category: job.category
      }

      if (job.material) {
        response.material = job.material
      }

      res.status(200).json(response)
    })
})

module.exports = router
