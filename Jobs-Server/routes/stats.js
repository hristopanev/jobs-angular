const express = require('express')
const Job = require('../models/Job');
const User = require('../models/User');

const router = new express.Router()

router.get('/', (req, res) => {
  Job.find({}).then((job) => {
    User.find({}).then((users) => {
      return res.status(200).json({
        job: job.length,
        users: users.length
      })
    })
  })
})

module.exports = router
